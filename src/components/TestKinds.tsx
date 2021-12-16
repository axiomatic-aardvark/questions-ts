import Back from "./Back";
import "../styles/choose-kinds.scss";
import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export default function TestKind() {
    const [chosen, setChosen] = useState<string[]>([]);
    const [trigger, setTrigger] = useState<boolean>(false);

    const clickKind = (kind: string) => {
        if (chosen.includes(kind)) {
            let updatedChosen = chosen;
            updatedChosen.splice(updatedChosen.indexOf(kind), 1);
            setChosen(updatedChosen);
        } else {
            let updatedChosen = chosen;
            updatedChosen.push(kind);
            setChosen(updatedChosen);
        }
        setTrigger(!trigger);
    }

    return (
        <>
            <Back/>
            <div className="choose-kinds-wrapper">
                <span className={`${chosen.includes("kruv") ? "selected" : ""}`}
                      onClick={() => clickKind("kruv")}>Кръв</span>
                <span className={`${chosen.includes("muskuli") ? "selected" : ""}`}
                      onClick={() => clickKind("muskuli")}>Мускули</span>
                <span className={`${chosen.includes("surdechno-sudova") ? "selected" : ""}`}
                      onClick={() => clickKind("surdechno-sudova")}>
                    Сърдечно-съдова система
                </span>
                <span className={`${chosen.includes("dihatelna") ? "selected" : ""}`}
                      onClick={() => clickKind("dihatelna")}>Дихателна система</span>
                <span className={`${chosen.includes("hranosmilatelna") ? "selected" : ""}`}
                      onClick={() => clickKind("hranosmilatelna")}>
                    Храносмилателна система
                </span>
                <span className={`${chosen.includes("obmqna-na-veshtestvata") ? "selected" : ""}`}
                      onClick={() => clickKind("obmqna-na-veshtestvata")}>
                    Обмяна на веществата
                </span>
                <span className={`${chosen.includes("obmqna-na-energiqta") ? "selected" : ""}`}
                      onClick={() => clickKind("obmqna-na-energiqta")}>
                    Обмяна на енергията
                </span>
                <span className={`${chosen.includes("otdelitelna") ? "selected" : ""}`}
                      onClick={() => clickKind("otdelitelna")}>Отделителна система</span>
                <span className={`${chosen.includes("endokrinna") ? "selected" : ""}`}
                      onClick={() => clickKind("endokrinna")}>Ендокринна система</span>
                <span className={`${chosen.includes("muzhka-i-zhenska") ? "selected" : ""}`}
                      onClick={() => clickKind("muzhka-i-zhenska")}>
                    Мъжка и женска репродуктивна система
                </span>
                <span className={`${chosen.includes("nervna") ? "selected" : ""}`} onClick={() => clickKind("nervna")}>Нервна система</span>
                <span className={`${chosen.includes("setivni-sistemi") ? "selected" : ""}`}
                      onClick={() => clickKind("setivni-sistemi")}>Сетивни системи</span>
                <span className={`${chosen.includes("regulaciq") ? "selected" : ""}`}
                      onClick={() => clickKind("regulaciq")}>Регулация на движение</span>
                <span className={`${chosen.includes("sun") ? "selected" : ""}`} onClick={() => clickKind("sun")}>Сън и бодърстване</span>
                <span className={`${chosen.includes("vegetativna") ? "selected" : ""}`}
                      onClick={() => clickKind("vegetativna")}>
                    Вегетативна нервна система
                </span>
                <Link style={{ textDecoration: "none" }}
                      to={{ pathname: "solve-kinds", state: { groups: chosen.join('ююю') } }}>
                    <Button variant="contained">Зареди тест</Button>
                </Link>
            </div>
        </>
    );
}
