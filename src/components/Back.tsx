import home from "../images/home.png";
import { Link } from "react-router-dom";
import "../styles/back.scss";

export default function Back() {
    return (
        <div className={"header"}>
            <Link style={{ textDecoration: "none" }} to="/">
                <div className="img-container home">
                    <img src={home} alt="house"/>
                </div>
            </Link>
        </div>
    );
}
