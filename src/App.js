import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from "react";
import "./App.css";
import Books from "./components/Books";
import LoginForm from "./pages/Login";
import RegistrationForm from "./pages/Register";
import Header from "./components/Header";
import PrivateRoute from "./utils/PrivateRoute";
import { useDispatch } from "react-redux";
import * as actions from "./redux/actions/auth";

function App() {
  // const [mounted, setMounted] = React.useState(true);
  // const dispatch = useDispatch();

  // const alreadyRun = React.useRef(false);

  // React.useEffect(() => {
  //   setMounted(true);
  //   if (mounted && !alreadyRun.current) {
  //     dispatch(actions.loadUser());
  //   }
  //   return () => {
  //     alreadyRun.current = true;
  //     setMounted(false);
  //   };
  // }, [mounted, dispatch]);

  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path='/' component={Books} />
        <Route path='/login' component={LoginForm} />
        <Route path='/register' component={RegistrationForm} />
      </Switch>
    </Router>
  );
}

export default App;
