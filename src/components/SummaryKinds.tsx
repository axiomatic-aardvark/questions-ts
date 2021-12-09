import { Link, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import Back from "./Back";
import "../styles/solve.scss";

export default function SummaryKinds() {
    let location: any = useLocation();
    let { id, label, answers, correct, chosen, groups, cache } = location.state;

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
                    to={{
                        pathname: "solve-kinds",
                        state: { groups, cache: updatedCache.length > 0 ? updatedCache : undefined },
                    }
                    }
                >
                    <Button variant="contained">Нов въпрос</Button>
                </Link>
            </div>
        </>
    );
}
