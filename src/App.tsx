// import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import SignUp from "./Composantes/connexion/SignUp";
import Login from "./Composantes/connexion/Login";
import './App.css'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Composantes/acceuil/Home";
import Member from "./Composantes/membres/Member";
import Tontine from "./Composantes/tontines/Tontine";
// import Ajoutton from "./Composantes/tontines/Ajoutton";
import Ajoutton from "./Composantes/tontines/Ajoutton";
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/dashboard" component={Home} />
        <Route exact path="/membres" component={Member} />
        <Route exact path="/tontines" component={Tontine} />
        <Route exact path="/ton" component={Ajoutton} />
        {/* <Route exact path="/cotisations" component={} /> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
