import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import SignUp from "./Composantes/SignUp";
import Login from "./Composantes/Login";
import PrivateRoute from "./Auth/PrivateRoute";
import Home from "./Composantes/Home";
import {BrowserRouter, Route, Switch} from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Switch>
    <Route exact path="/" component={Home} /> 
        <PrivateRoute exact path="/login" component={Login}/>
        <Route exact path="/register" component={SignUp} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;