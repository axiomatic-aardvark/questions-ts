import { Link, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import Back from "./Back";
import "../styles/solve.scss";

export default function Summary() {
    let location: any = useLocation();
    let { id, label, answers, correct, chosen, group, cache, isHistory } = location.state;

    let c_answers = location.state ? location.state.current ? location.state.current.answers : undefined : undefined;
    let c_label = location.state ? location.state.current ? location.state.current.label : undefined : undefined;
    let c_correct = location.state ? location.state.current ? location.state.current.correct : undefined : undefined;
    let c_id = location.state ? location.state.current ? location.state.current.id : undefined : undefined;

    if (isHistory) {
        console.log("ITS HISTORY");
    }

    let updatedCache: any[] = [];

    // If ID is not provided, that means we're in History
    if (id) {
        for (let index = 0; index < cache.length; index++) {
            const q = cache[index];
            if (q.id !== id) {
                updatedCache.push(q);
            }
        }
    }


    let formatted = answers.map((a: any) => {
        if (a.endsWith(";")) {
            return a.substring(0, a.length - 1);
        }
        return a;
    });

    if (correct.endsWith(";")) {
        correct = correct.substring(0, correct.length - 1);
    }

    const addColonIfNone = (label: string) => {
        return label.endsWith(":") ? label : label.concat(":");
    }

    return (
        <>
            <Back/>
            <div className="question-container">
                <div className="label">{addColonIfNone(label)}</div>

                <div className="answers">
                    {formatted.map((a: any, i: any) => {
                        // right
                        if (a === correct) {
                            return (
                                <div key={i} className="option green">
                                    {formatted[i]}
                                </div>
                            );
                        } else if (a === chosen && a !== correct) {
                            return (
                                <div key={i} className="option red">
                                    {formatted[i]}
                                </div>
                            );
                        } else {
                            return (
                                <div key={i} className="option">
                                    {formatted[i]}
                                </div>
                            );
                        }
                    })}
                </div>
                <Link
                    style={{ textDecoration: "none" }}
                    to={
                        group === "all"
                            ? {
                                pathname: "test-all",
                                state: {
                                    cache: updatedCache.length > 0 ? updatedCache : undefined, prev: {
                                        label: addColonIfNone(label), answers: formatted, correct, chosen,
                                    }, curr: { c_answers, c_label, c_correct, c_id },
                                },
                            }
                            : {
                                pathname: "solve",
                                state: { group, cache: updatedCache.length > 0 ? updatedCache : undefined },
                            }
                    }
                >
                    <Button variant="contained">Нов въпрос</Button>
                </Link>
            </div>
        </>
    );
}
