import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Anatomy from "./components/Anatomy";
import TestKind from "./components/TestKind";
import Solve from "./components/Solve";
import TestAll from "./components/TestAll";
import Summary from "./components/Summary";
import AddQuestion from "./components/AddQuestion";
import Initial from "./components/Initial";
import AddQuestionAnatomy from "./components/AddQuestionAnatomy";

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
                <Route path="/test-all">
                    <TestAll/>
                </Route>
                <Route path="/solve">
                    <Solve/>
                </Route>
                <Route path="/summary">
                    <Summary/>
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
