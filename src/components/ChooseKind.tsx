import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import "../styles/choose-kind-form.scss";

export default function ChooseKind() {
    const [group, setGroup] = React.useState("");

    const handleChange = (event: any) => {
        setGroup(event.target.value);
    };

    return (
        <div className="choose-kind-form">
            <Box sx={{ minWidth: 300, maxWidth: 500 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Група</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={group}
                        label="Група"
                        onChange={handleChange}
                    >
                        <MenuItem value={"kruv"}>Кръв</MenuItem>
                        <MenuItem value={"muskuli"}>Мускули</MenuItem>
                        <MenuItem value={"surdechno-sudova"}>
                            Сърдечно-съдова система
                        </MenuItem>
                        <MenuItem value={"dihatelna"}>Дихателна система</MenuItem>
                        <MenuItem value={"hranosmilatelna"}>
                            Храносмилателна система
                        </MenuItem>
                        <MenuItem value={"obmqna-na-veshtestvata"}>
                            Обмяна на веществата
                        </MenuItem>
                        <MenuItem value={"obmqna-na-energiqta"}>
                            Обмяна на енергията
                        </MenuItem>
                        <MenuItem value={"otdelitelna"}>Отделителна система</MenuItem>
                        <MenuItem value={"endokrinna"}>Ендокринна система</MenuItem>
                        <MenuItem value={"muzhka-i-zhenska"}>
                            Мъжка и женска репродуктивна система
                        </MenuItem>
                        <MenuItem value={"nervna"}>Нервна система</MenuItem>
                        <MenuItem value={"setivni-sistemi"}>Сетивни системи</MenuItem>
                        <MenuItem value={"regulaciq"}>Регулация на движение</MenuItem>
                        <MenuItem value={"sun"}>Сън и бодърстване</MenuItem>
                        <MenuItem value={"vegetativna"}>
                            Вегетативна нервна система
                        </MenuItem>
                    </Select>
                </FormControl>
            </Box>
            {group === "" ? null : (
                <Link
                    style={{ textDecoration: "none" }}
                    to={{ pathname: "solve", state: { group } }}
                >
                    <Button variant="contained">Зареди тест</Button>
                </Link>
            )}
        </div>
    );
}
