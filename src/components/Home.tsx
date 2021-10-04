import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import "../styles/home.scss";

export default function Home() {
  return (
    <div className="home">
      <Link style={{ textDecoration: "none" }} to="test-all">
        <Button variant="contained">Тест Всички</Button>
      </Link>
      <Link style={{ textDecoration: "none" }} to="test-kind">
        <Button variant="contained">Тест Група</Button>
      </Link>
      <Link style={{ textDecoration: "none" }} to="add-question">
        <Button variant="contained">Добави въпрос</Button>
      </Link>
    </div>
  );
}
