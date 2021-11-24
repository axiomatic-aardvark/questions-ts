import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Input as AntdInput } from "antd";
import "../styles/add-question-anatomy.scss";
import Back from "./Back";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const axios = require("axios");

const AddQuestionAnatomy = () => {
    const { control, handleSubmit, reset, setFocus } = useForm();
    const [kind, setKind] = useState("dvigatelen");
    const [isOptionOneTrue, setIsOptionOneTrue] = useState(false);
    const [isOptionTwoTrue, setIsOptionTwoTrue] = useState(false);
    const [isOptionThreeTrue, setIsOptionThreeTrue] = useState(false);
    const [isOptionFourTrue, setIsOptionFourTrue] = useState(false);

    function toggleTrue(optionNum: number) {
        switch (optionNum) {
            case 1:
                setIsOptionOneTrue(!isOptionOneTrue);
                break;
            case 2:
                setIsOptionTwoTrue(!isOptionTwoTrue);
                break;
            case 3:
                setIsOptionThreeTrue(!isOptionThreeTrue);
                break;
            case 4:
                setIsOptionFourTrue(!isOptionFourTrue);
                break;
        }
    }


    const changeKind = (e: any) => {
        setKind(e.target.value);
    };

    const onSubmit = (data: any) => {
        console.log(JSON.stringify(data));

        let label = data["label"];
        let optionOne = data["optionOne"];
        let optionTwo = data["optionTwo"];
        let optionThree = data["optionThree"];
        let optionFour = data["optionFour"];

        console.log(isOptionOneTrue, isOptionTwoTrue, isOptionThreeTrue, isOptionFourTrue);

        let correctAnswers = "";
        if (isOptionOneTrue) {
            correctAnswers = correctAnswers.concat("%%%", optionOne);
        }
        if (isOptionTwoTrue) {
            correctAnswers = correctAnswers.concat("%%%", optionTwo);
        }
        if (isOptionThreeTrue) {
            correctAnswers = correctAnswers.concat("%%%", optionThree);
        }
        if (isOptionFourTrue) {
            correctAnswers = correctAnswers.concat("%%%", optionFour);
        }

        console.log(correctAnswers);

        if (
            label === undefined ||
            optionOne === undefined ||
            optionTwo === undefined ||
            optionThree === undefined ||
            optionFour === undefined
        ) {
            toast.error("Моля попълнете всички полета", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                progress: undefined,
                closeButton: false,
            });

            return;
        }

        axios
            .post(
                "https://mysterious-garden-19556.herokuapp.com/https://www.questions-server.xyz/anatomy",
                {
                    label,
                    kind: kind,
                    option_one: optionOne,
                    option_two: optionTwo,
                    option_three: optionThree,
                    option_four: optionFour,
                    correct_answers: correctAnswers,
                },
            )
            .then(function (response: any) {
                console.log(response);
                reset({});
                setFocus("label");

                toast.success("Готово", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                    closeButton: false,
                });
            })
            .catch(function (error: any) {
                console.log(error);

                toast.error("Възникна грешка", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    progress: undefined,
                    closeButton: false,
                });
            });
    };

    // @ts-ignore
    return (
        <>
            <Back/>
            <div className="add-question-wrapper">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label>Въпрос</label>
                    <Controller
                        render={({ field }) => <AntdInput {...field} />}
                        name="label"
                        control={control}
                    />
                    <div className={"option-one"}>
                        <label>Опция 1</label>
                        <Controller
                            render={({ field }) => <AntdInput {...field} />}
                            name="optionOne"
                            control={control}
                            defaultValue=""
                        />
                        <label className={"checkbox-container"}>
                            <span>Верен:</span>
                            <input
                                name="isGoing"
                                className={"checkbox"}
                                type="checkbox"
                                checked={isOptionOneTrue}
                                onChange={() => toggleTrue(1)}/>
                        </label>
                    </div>
                    <div className={"option-two"}>
                        <label>Опция 2</label>
                        <Controller
                            render={({ field }) => <AntdInput {...field} />}
                            name="optionTwo"
                            control={control}
                            defaultValue=""
                        />
                        <label className={"checkbox-container"}>
                            <span>Верен:</span>
                            <input
                                name="isGoing"
                                type="checkbox"
                                className={"checkbox"}
                                checked={isOptionTwoTrue}
                                onChange={() => toggleTrue(2)}/>
                        </label>
                    </div>
                    <div className={"option-three"}>
                        <label>Опция 3</label>
                        <Controller
                            render={({ field }) => <AntdInput {...field} />}
                            name="optionThree"
                            control={control}
                            defaultValue=""
                        />
                        <label className={"checkbox-container"}>
                            <span>Верен:</span>
                            <input
                                name="isGoing"
                                type="checkbox"
                                className={"checkbox"}
                                checked={isOptionThreeTrue}
                                onChange={() => toggleTrue(3)}/>
                        </label>
                    </div>
                    <div className={"option-four"}>
                        <label>Опция 4</label>
                        <Controller
                            render={({ field }) => <AntdInput {...field} />}
                            name="optionFour"
                            control={control}
                            defaultValue=""
                        />
                        <label className={"checkbox-container"}>
                            <span>Верен:</span>
                            <input
                                name="isGoing"
                                className={"checkbox"}
                                type="checkbox"
                                checked={isOptionFourTrue}
                                onChange={() => toggleTrue(4)}/>
                        </label>
                    </div>

                    <label>Група</label>
                    <select className="select-css" onChange={changeKind} value={kind}>
                        <option value="dvigatelen">Двигателен апарат</option>
                        <option value="vutreshni">Вътрешни органи</option>
                        <option value="sudova">Съдова система</option>
                        <option value="nervna">Нервна система</option>
                        <option value="setivni">Сетивни органи</option>
                        <option value="glava">Глава</option>
                        <option value="shiq">Шия</option>
                        <option value="grub">Гръб</option>
                        <option value="gurdi">Гърди</option>
                        <option value="korem">Корем</option>
                        <option value="goren">
                            Горен крайник
                        </option>
                        <option value="dolen">Долен крайник</option>
                    </select>

                    <input className="form-submit" type="submit" value="Запази"/>
                </form>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </div>
        </>
    );
};

export default AddQuestionAnatomy;
