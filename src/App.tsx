import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Anatomy from "./components/Anatomy";
import TestKind from "./components/TestKind";
import TestKinds from "./components/TestKinds";
import Solve from "./components/Solve";
import TestAll from "./components/TestAll";
import TestAllAnatomy from "./components/TestAllAnatomy";
import Summary from "./components/Summary";
import SummaryKinds from "./components/SummaryKinds";
import AddQuestion from "./components/AddQuestion";
import Initial from "./components/Initial";
import AddQuestionAnatomy from "./components/AddQuestionAnatomy";
import SummaryAnatomy from "./components/SummaryAnatomy";
import TestKindAnatomy from "./components/TestKindAnatomy";
import SolveAnatomy from "./components/SolveAnatomy";
import SolveKinds from "./components/SolveKinds";

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/add-question">
                    <AddQuestion/>
                </Route>
                <Route path="/add-question-anatomy">
                    <AddQuestionAnatomy/>
                </Route>
                <Route path="/test-kind">
                    <TestKind/>
                </Route>
                <Route path="/test-kinds">
                    <TestKinds/>
                </Route>
                <Route path="/test-kind-anatomy">
                    <TestKindAnatomy/>
                </Route>
                <Route path="/test-all">
                    <TestAll/>
                </Route>
                <Route path="/test-all-anatomy">
                    <TestAllAnatomy/>
                </Route>
                <Route path="/solve">
                    <Solve/>
                </Route>
                <Route path="/solve-kinds">
                    <SolveKinds/>
                </Route>
                <Route path="/prev">
                    <div>hello</div>
                </Route>
                <Route path="/solve-anatomy">
                    <SolveAnatomy/>
                </Route>
                <Route path="/summary">
                    <Summary/>
                </Route>
                <Route path="/summary-kinds">
                    <SummaryKinds/>
                </Route>
                <Route path="/summary-anatomy">
                    <SummaryAnatomy/>
                </Route>
                <Route path="/physiology">
                    <Home/>
                </Route>
                <Route path="/anatomy">
                    <Anatomy/>
                </Route>
                <Route path="/">
                    <Initial/>
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
