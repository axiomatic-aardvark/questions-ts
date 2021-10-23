import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import TestKind from "./components/TestKind";
import Solve from "./components/Solve";
import Summary from "./components/Summary";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/add-question"></Route>
        <Route path="/test-kind">
          <TestKind />
        </Route>
        <Route path="/test-all">
          {/* { TODO } */}
        </Route>
        <Route path="/solve">
          <Solve />
        </Route>
        <Route path="/summary">
          <Summary />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
