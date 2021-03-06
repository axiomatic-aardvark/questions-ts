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
    const [question, setQuestion] = useState();

    const history = useHistory()

    useEffect(() => {
        return history.listen(location => {
            if (history.action === 'POP') {
                localStorage.setItem("popped", "true");
                localStorage.setItem("contents", JSON.stringify({
                    question
                }));
            }
        })
    }, [question])

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
                    let shuffled = shuffle(response.data);
                    setQuestion(shuffled[0]);
                })
                .catch(function (error: any) {
                    console.log(error);

                    toast.error("???????????????? ????????????", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        progress: undefined,
                        closeButton: false,
                    });
                });
        } else {
            // @ts-ignore
            let isPaused = localStorage.getItem("popped");
            if(isPaused === "true") {
                console.log("Skipping update")
                let q = localStorage.getItem("contents");
                // @ts-ignore
                console.log(q.question);
                // @ts-ignore
                setQuestion(JSON.parse(q).question);
            } else {
                // @ts-ignore
                let shuffled = shuffle(questions);
                setQuestion(shuffled[0]);
            }
        }

        localStorage.clear();
    }, []);

    return questions ? (
        questions.length > 0 && question ? (
            <>
                <Back/>
                <div className="question-container">
                    <QuestionViewAll context={question} cache={questions}/>

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
                    <span>???????? ?????????????? ?? ???????? ??????????.</span>
                    <Link style={{ textDecoration: "none" }} to="test-kind">
                        <Button variant="contained">??????????</Button>
                    </Link>
                </div>
            </>
        )
    ) : (
        <CircularProgress className="spinner" size={100} color={"info"}/>
    );
}
