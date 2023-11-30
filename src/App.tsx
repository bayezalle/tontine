import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import SignUp from "./Composantes/connexion/SignUp";
import Login from "./Composantes/connexion/Login";
import './App.css'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Composantes/acceuil/Home";
import Member from "./Composantes/membres/Member";
import Tontine from "./Composantes/tontines/Tontine";
import Cotisation from "./Composantes/cotisation/Cotisation";
import InfoUser from "./Composantes/tontines/InfoUser";
// import AjoutTon from "./Composantes/tontines/AjoutTon";

interface Tontine {
  id: number;
  tontine: string;
  somme: number;
  cotisationDay: string;
  // Autres propriétés si nécessaire
}
const App: React.FC = () => {
  const [selectedTontine, setSelectedTontine] = useState< Tontine | null>(null);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/dashboard" component={Home} />
        <Route exact path="/membres" component={Member} />
        <Route exact path="/tontines" component={Tontine} />
        <Route exact path="/cotisations" component={Cotisation} />
        <Route path="/info-user"
          render={() => <InfoUser selectedTontine={selectedTontine} />}
/>

        {/* <Route exact path="/" component={AjoutTon} /> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
