import Back from "./Back";
import "../styles/home.scss";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

export default function Anatomy() {
    return (
        <>
            <Back/>
            <div className="anatomy-wrapper home">
                <Link style={{ textDecoration: "none" }} to="test-all-anatomy">
                    <Button variant="contained">Тест всички</Button>
                </Link>
                <Link style={{ textDecoration: "none" }} to="test-kind-anatomy">
                    <Button variant="contained">Тест група</Button>
                </Link>
                <Link style={{ textDecoration: "none" }} to="add-question-anatomy">
                    <Button variant="contained">Добави въпрос</Button>
                </Link>
            </div>
        </>
    );
}
