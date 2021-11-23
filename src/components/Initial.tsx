import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Back from "./Back";
import "../styles/home.scss";

export default function Initial() {
    return (
        <>
            <Back />
            <div className="home">
                <Link style={{ textDecoration: "none" }} to="physiology">
                    <Button variant="contained">Физиология</Button>
                </Link>
                <Link style={{ textDecoration: "none" }} to="anatomy">
                    <Button variant="contained">Анатомия</Button>
                </Link>
            </div>
        </>
    );
}
