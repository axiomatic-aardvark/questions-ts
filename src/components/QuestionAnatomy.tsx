import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";

export default function QuestionViewAnatomy(props: any) {
    let { group } = props;

    const [hasBeenShuffled, setHasBeenShuffled] = useState(false);

    const [isOptionOneSelected, setIsOptionOneSelected] = useState(false);
    const [isOptionTwoSelected, setIsOptionTwoSelected] = useState(false);
    const [isOptionThreeSelected, setIsOptionThreeSelected] = useState(false);
    const [isOptionFourSelected, setIsOptionFourSelected] = useState(false);

    useEffect(() => {
        setHasBeenShuffled(true);
    }, [])

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

    console.log("LMAO", props);

    let {
        id,
        option_one,
        label,
        option_two,
        option_three,
        option_four,
        correct_answers,
    } = props.context;

    let { cache } = props;

    let answers = [option_one, option_two, option_three, option_four];
    let shuffled = hasBeenShuffled ? answers : shuffle(answers);
    let formatted = shuffled.map((a) => {
        if (a.endsWith(";")) {
            return a.substring(0, a.length - 1);
        }
        return a;
    });

    let chosenAnswers = "";
    if (isOptionOneSelected) {
        chosenAnswers = chosenAnswers.concat("%%%", formatted[0]);
    }
    if (isOptionTwoSelected) {
        chosenAnswers = chosenAnswers.concat("%%%", formatted[1]);
    }
    if (isOptionThreeSelected) {
        chosenAnswers = chosenAnswers.concat("%%%", formatted[2]);
    }
    if (isOptionFourSelected) {
        chosenAnswers = chosenAnswers.concat("%%%", formatted[3]);
    }

    return (
        <>
            <div className="label">{label}</div>

            <div className="answers">
                <div className={`option ${isOptionOneSelected ? "chosen" : ""}`} onClick={() => {
                    console.log("uuh")
                    setIsOptionOneSelected(!isOptionOneSelected)}}>
                    {formatted[0]}
                </div>
                <div className={`option ${isOptionTwoSelected ? "chosen" : ""}`} onClick={() => setIsOptionTwoSelected(!isOptionTwoSelected)}>
                    {formatted[1]}
                </div>
                <div className={`option ${isOptionThreeSelected ? "chosen" : ""}`} onClick={() => setIsOptionThreeSelected(!isOptionThreeSelected)}>
                    {formatted[2]}
                </div>
                <div className={`option ${isOptionFourSelected ? "chosen" : ""}`} onClick={() => setIsOptionFourSelected(!isOptionFourSelected)}>
                    {formatted[3]}
                </div>
                <Link
                    style={{ textDecoration: "none" }}
                    to={{
                        pathname: "summary-anatomy",
                        state: {
                            id,
                            label,
                            answers: [
                                formatted[0],
                                formatted[1],
                                formatted[2],
                                formatted[3],
                            ],
                            correct: correct_answers,
                            chosen: chosenAnswers,
                            group,
                            cache,
                        },
                    }}
                >
                    <Button variant="contained">Готово</Button>
                </Link>
            </div>
        </>
    );
}
