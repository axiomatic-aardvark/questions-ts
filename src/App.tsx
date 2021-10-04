import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import TestKind from "./components/TestKind";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/add-question"></Route>
        <Route path="/test-kind">
          <TestKind />
        </Route>
        <Route path="/test-all"></Route>
        <Route path="/solve-kind"></Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
