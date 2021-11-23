import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/solve.scss";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Back from "./Back";
import QuestionView from "./Question";

export default function Solve() {
    // TODO: Move these to utils file
    const titleCase = (str: string) => {
        return str.replace(/\w\S*/g, (t) => {
            return t.charAt(0).toUpperCase() + t.substr(1).toLowerCase();
        });
    };

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
    let cache = location.state.cache;

    const [questions, setQuestions] = useState<any[] | undefined>(cache);

    useEffect(() => {
        if (cache === undefined) {
            const axios = require("axios");

            axios
                .get(
                    `https://mysterious-garden-19556.herokuapp.com/https://www.questions-server.xyz/questions/kind/${titleCase(
                        location.state.group,
                    )}`,
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
                <Back/>
                <div className="question-container">
                    <QuestionView
                        context={shuffle(questions)[0]}
                        group={location.state.group}
                        cache={questions}
                    />

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
