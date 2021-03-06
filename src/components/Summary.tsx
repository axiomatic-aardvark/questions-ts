import { Link, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import Back from "./Back";
import "../styles/solve.scss";

export default function Summary() {
    let location: any = useLocation();
    let { id, label, answers, correct, chosen, group, cache } = location.state;

    let updatedCache: any[] = [];

    for (let index = 0; index < cache.length; index++) {
        const q = cache[index];
        if (q.id !== id) {
            updatedCache.push(q);
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
                                state: { cache: updatedCache.length > 0 ? updatedCache : undefined },
                            }
                            : {
                                pathname: "solve",
                                state: { group, cache: updatedCache.length > 0 ? updatedCache : undefined },
                            }
                    }
                >
                    <Button variant="contained">?????? ????????????</Button>
                </Link>
            </div>
        </>
    );
}
