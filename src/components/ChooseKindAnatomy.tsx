import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import "../styles/choose-kind-form.scss";

export default function ChooseKindAnatomy() {
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
                        <MenuItem value={"dvigatelen"}>Двигателен апарат</MenuItem>
                        <MenuItem value={"vutreshni"}>Вътрешни органи</MenuItem>
                        <MenuItem value={"sudova"}>
                            Съдова система
                        </MenuItem>
                        <MenuItem value={"nervna"}>Нервна система</MenuItem>
                        <MenuItem value={"setivni"}>
                            Сетивни органи
                        </MenuItem>
                        <MenuItem value={"glava"}>
                            Глава
                        </MenuItem>
                        <MenuItem value={"shiq"}>
                            Шия
                        </MenuItem>
                        <MenuItem value={"grub"}>Гръб</MenuItem>
                        <MenuItem value={"gurdi"}>Гърди</MenuItem>
                        <MenuItem value={"korem"}>
                            Корем
                        </MenuItem>
                        <MenuItem value={"krainici"}>Крайници</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            {group === "" ? null : (
                <Link
                    style={{ textDecoration: "none" }}
                    to={{ pathname: "solve-anatomy", state: { group } }}
                >
                    <Button variant="contained">Зареди тест</Button>
                </Link>
            )}
        </div>
    );
}
