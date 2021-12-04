import { Link } from "react-router-dom";

export default function QuestionView(props: any) {
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

    let {
        id,
        option_one,
        label,
        option_two,
        option_three,
        option_four,
        correct_answer,
    } = props.context;

    let { cache } = props;

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

    return (
        <>
            <div className="label">{addColonIfNone(label)}</div>

            <div className="answers">
                {formatted.map((a, i) => {
                    return (
                        <Link
                            key={i}
                            style={{ textDecoration: "none" }}
                            to={{
                                pathname: "summary",
                                state: {
                                    id,
                                    label,
                                    answers: [
                                        formatted[0],
                                        formatted[1],
                                        formatted[2],
                                        formatted[3],
                                    ],
                                    correct: correct_answer,
                                    chosen: a,
                                    group: "all",
                                    cache,
                                },
                            }}
                        >
                            <div key={i} className="option">
                                {formatted[i]}
                            </div>
                        </Link>
                    );
                })}
            </div>
        </>
    );
}
