import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import Login from "./components/Authentication/Login";
import SignUp from "./components/Authentication/SignUp";
import Prettier from "./components/Prettier";
import Linter from "./components/Linter";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Login} exact />
        <Route path="/prettier" component={Prettier} exact />
        <Route path="/linter" component={Linter} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/sign-up" component={SignUp} exact />
      </Switch>
    </Router>
  );
}

export default App;
