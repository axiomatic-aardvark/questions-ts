import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/solve.scss";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Back from "./Back";
import QuestionViewAll from "./QuestionsAll";
import { useHistory } from 'react-router-dom'

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

    console.log(location);
    const [questions, setQuestions] = useState<any[] | undefined>(cache);
    const [saved, setSaved] = useState<string | null>("");

    const addColonIfNone = (label: string) => {
        return label.endsWith(":") ? label : label.concat(":");
    }

    let question = questions ? shuffle(questions)[0] : undefined;

    let id = question ? question.id : undefined;
    let option_one = question ? question.option_one : undefined;
    let label = question ? question.label : undefined;
    let option_two = question ? question.option_two : undefined;
    let option_three = question ? question.option_three : undefined;
    let option_four = question ? question.option_four : undefined;
    let correct_answer = question ? question.correct_answer : undefined;

    let answers = [option_one, option_two, option_three, option_four];
    let shuffled = shuffle(answers);
    let formatted = questions ? shuffled.map((a) => {
        if (a.endsWith(";")) {
            return a.substring(0, a.length - 1);
        }
        return a;
    }) : [];

    useEffect(() => {
        console.log("what's inside?");
        console.log(localStorage.getItem("saved"))
        setSaved(localStorage.getItem("saved"));

        localStorage.clear()
    }, [])

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

    const history = useHistory()

    useEffect(() => {
        return history.listen(location => {
            if (history.action === 'POP') {
                console.log("Saving...");

                console.log(JSON.stringify({
                    id, option_one, label, option_two, option_three, option_four, correct_answer
                }));

                localStorage.setItem("saved", JSON.stringify({
                    id, option_one, label, option_two, option_three, option_four, correct_answer
                }));
            }
        })
    }, [])

    return questions ? (
        questions.length > 0 ? (
            <>
                <Back/>
                <div className="question-container">
                    <QuestionViewAll context={{
                        id,
                        label: addColonIfNone(label),
                        formatted,
                        correct_answer
                    }} cache={questions}/>

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
