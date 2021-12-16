import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/solve.scss";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Back from "./Back";
import QuestionViewAll from "./QuestionsAll";
import history from "../images/history.png";

export default function TestAll() {
    const shuffle = (array: any[]) => {
        let currentIndex = array.length,
            randomIndex;

        // While there remain elements to shuffle...
        while (currentIndex !== 0) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex],
                array[currentIndex],
            ];
        }

        return array;
    };

    let location: any = useLocation();
    let cache = location.state ? location.state.cache : undefined;
    let prev = location.state ? location.state.prev || undefined : undefined;
    let p_answers = prev ? prev.answers : undefined;
    let p_label = prev ? prev.label : undefined;
    let p_chosen = prev ? prev.chosen : undefined;
    let p_correct = prev ? prev.correct : undefined;

    let c_answers = location.state ? location.state.curr ? location.state.curr.c_answers : undefined : undefined;
    let c_label = location.state ? location.state.curr ? location.state.curr.c_label : undefined : undefined;
    let c_correct = location.state ? location.state.curr ? location.state.curr.c_correct : undefined : undefined;
    let c_id = location.state ? location.state.curr ? location.state.curr.c_id : undefined : undefined;

    console.log("CURR ");
    //console.log(location.state.curr);


    console.log("prev is");
    console.log(prev);

    console.log(location);

    const [questions, setQuestions] = useState<any[] | undefined>(cache);

    // @ts-ignore
    let {
        id,
        option_one,
        label,
        option_two,
        option_three,
        option_four,
        correct_answer,
    } = questions ? shuffle(questions)[0] : {
        id: 1,
        option_one: "",
        label: "",
        option_two: "",
        option_three: "",
        option_four: "",
        correct_answer: "",
    }

    let answers = [option_one, option_two, option_three, option_four];
    let shuffled = shuffle(answers);
    let formatted = shuffled.map((a) => {
        if (a.endsWith(";")) {
            return a.substring(0, a.length - 1);
        }
        return a;
    });


    const addColonIfNone = (label: string) => {
        return label.endsWith(":") ? label : label.concat(":");
    }

    useEffect(() => {
        if (cache === undefined) {
            const axios = require("axios");

            axios
                .get(
                    "https://mysterious-garden-19556.herokuapp.com/https://www.questions-server.xyz/questions",
                )
                .then(function (response: any) {
                    console.log(response);
                    console.log("THIS ", response.data);

                    setQuestions(response.data);
                })
                .catch(function (error: any) {
                    console.log(error);

                    toast.error("Възникна грешка", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        progress: undefined,
                        closeButton: false,
                    });
                });
        }
    }, []);

    return questions ? (
        questions.length > 0 ? (
            <>
                <div className={"header"}>
                    <Back/>
                    {prev && <Link style={{ textDecoration: "none" }} to={{
                        pathname: "summary",
                        state: {
                            isHistory: true,
                            id: undefined,
                            label: p_label,
                            answers: [
                                p_answers[0],
                                p_answers[1],
                                p_answers[2],
                                p_answers[3],
                            ],
                            correct: p_correct,
                            chosen: p_chosen,
                            group: "all",
                            cache,
                            current: {
                                answers: [option_one, option_two, option_four, option_three],
                                label: addColonIfNone(label),
                                correct: correct_answer,
                                id
                            },
                        },
                    }}>
                        <div className="img-container history" onClick={() => {
                            console.log("History clicked!")
                        }
                        }>
                            <img src={history} alt="house"/>
                        </div>
                    </Link>}
                </div>
                <div className="question-container">
                    {location.state && location.state.curr && location.state.curr.c_label ?  <QuestionViewAll context={{
                        id: c_id,
                        formatted: c_answers,
                        label: c_label,
                        correct: c_correct,
                    }} cache={questions}/> : <QuestionViewAll context={{
                        id,
                        formatted,
                        label: addColonIfNone(label),
                        correct_answer,
                    }} cache={questions}/> }

                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />
                </div>
            </>
        ) : (
            <>
                <Back/>
                <div className="no-items">
                    <span>Няма въпроси в тази група.</span>
                    <Link style={{ textDecoration: "none" }} to="test-kind">
                        <Button variant="contained">Назад</Button>
                    </Link>
                </div>
            </>
        )
    ) : (
        <CircularProgress className="spinner" size={100} color={"info"}/>
    );
}
