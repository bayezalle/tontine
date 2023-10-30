// import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import SignUp from "./Composantes/connexion/SignUp";
import Login from "./Composantes/connexion/Login";
// import PrivateRoute from "./Auth/PrivateRoute";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./Composantes/acceuil/Home";
function App() {
  return (
    <BrowserRouter>
      <Switch>
      <Route exact path="/" component={Login} /> 
    <Route exact path="/signup" component={SignUp} /> 
    <Route exact path="/home" component={Home} /> 
        {/* <PrivateRoute exact path="/login" component={Login}/> */}
        {/* <Route exact path="/register" component={SignUp} /> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;