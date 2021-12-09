import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Back from "./Back";
import "../styles/home.scss";

export default function Home() {
    return (
        <>
            <Back/>
            <div className="home">
                <Link style={{ textDecoration: "none" }} to="test-all">
                    <Button variant="contained">Тест Всички</Button>
                </Link>
                <Link style={{ textDecoration: "none" }} to="test-kinds">
                    <Button variant="contained">Тест Групи</Button>
                </Link>
                <Link style={{ textDecoration: "none" }} to="test-kind">
                    <Button variant="contained">Тест Група</Button>
                </Link>
                <Link style={{ textDecoration: "none" }} to="add-question">
                    <Button variant="contained">Добави въпрос</Button>
                </Link>
            </div>
        </>
    );
}
