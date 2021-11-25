import ChooseKind from "./ChooseKind";
import Back from "./Back";
import "../styles/choose-kind.scss";
import ChooseKindAnatomy from "./ChooseKindAnatomy";

export default function TestKindAnatomy() {
    return (
        <>
            <Back/>
            <div className="choose-kind-wrapper">
                <ChooseKindAnatomy/>
            </div>
        </>
    );
}
