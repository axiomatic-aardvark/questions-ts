import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input as AntdInput } from "antd";
import "../styles/add-question.scss";
import Back from "./Back";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const axios = require("axios");

const AddQuestionAnatomy = () => {
    const { control, handleSubmit, reset, setFocus } = useForm();
    const [kind, setKind] = useState("Fiziologiq");

    const changeKind = (e: any) => {
        setKind(e.target.value);
    };

    const onSubmit = (data: any) => {
        console.log(JSON.stringify(data));

        let label = data["label"];
        let correctAnswer = data["correctAnswer"];
        let optionOne = data["optionOne"];
        let optionTwo = data["optionTwo"];
        let optionThree = data["optionThree"];

        if (
            label === undefined ||
            optionOne === undefined ||
            optionTwo === undefined ||
            optionThree === undefined ||
            correctAnswer === undefined
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
                "https://mysterious-garden-19556.herokuapp.com/https://www.questions-server.xyz/questions",
                {
                    label,
                    option_one: correctAnswer,
                    option_two: optionOne,
                    option_three: optionTwo,
                    option_four: optionThree,
                    correct_answer: correctAnswer,
                    kind: kind,
                }
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

    return (
        <>
            <Back />
            <div className="add-question-wrapper">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label>Въпрос</label>
                    <Controller
                        render={({ field }) => <AntdInput {...field} />}
                        name="label"
                        control={control}
                    />
                    <label>Верен отговор</label>
                    <Controller
                        render={({ field }) => <AntdInput {...field} />}
                        name="correctAnswer"
                        control={control}
                        defaultValue=""
                    />
                    <label>Опция 1</label>
                    <Controller
                        render={({ field }) => <AntdInput {...field} />}
                        name="optionOne"
                        control={control}
                        defaultValue=""
                    />
                    <label>Опция 2</label>
                    <Controller
                        render={({ field }) => <AntdInput {...field} />}
                        name="optionTwo"
                        control={control}
                        defaultValue=""
                    />
                    <label>Опция 3</label>
                    <Controller
                        render={({ field }) => <AntdInput {...field} />}
                        name="optionThree"
                        control={control}
                        defaultValue=""
                    />
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

                    <input className="form-submit" type="submit" value="Запази" />
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
