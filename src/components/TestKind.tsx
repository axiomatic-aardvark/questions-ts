import ChooseKind from "./ChooseKind";
import Back from "./Back";
import "../styles/choose-kind.scss";

export default function TestKind() {
    return (
        <>
            <Back/>
            <div className="choose-kind-wrapper">
                <ChooseKind/>
            </div>
        </>
    );
}
