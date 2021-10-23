import { useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import "../styles/solve.scss";

export default function Summary() {
  let location: any = useLocation();
  console.log(location.state);
  let { label, answers, correct, chosen, group } = location.state;

  let formatted = answers.map((a: any) => {
    if (a.endsWith(";")) {
      return a.substring(0, a.length - 1);
    }
    return a;
  });

  if (correct.endsWith(";")) {
    correct = correct.substring(0, correct.length - 1);
  }

  return (
    <div className="question-container">
      <div className="label">{label}</div>

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
      <Link style={{ textDecoration: "none" }} to={{ pathname: "solve", state: { group } }}>
        <Button variant="contained">Нов въпрос</Button>
      </Link>
    </div>
  );
}