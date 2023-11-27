import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

const Dashboard: FC = () => {
  const [members, setMembers] = useState([]);
  const [tontine, setTontine] = useState([]);
  const [cotisation, setCotisation] =useState([]);

  useEffect(() => {
    // Récupérer la liste des utilisateurs
    axios
      .get('https://fewnu-tontin.onrender.com/user/profile')
      .then((response) => {
        setMembers(response.data);        
      })
      .catch((error) => {
        console.error('Failed to fetch members:', error.message);
      });
  }, []); // Le tableau vide comme deuxième argument signifie que ce code s'exécute une seule fois après le montage initial.
    //Nombre total des utilisateurs
    const totalMembers = members.length;

    useEffect(() => {
      // Récupérer la liste des utilisateurs
      axios
        .get('https://fewnu-tontin.onrender.com/tontines/getTontines')
        .then((response) => {
          setTontine(response.data);        
        })
        .catch((error) => {
          console.error('Failed to fetch tontine:', error.message);
        });
    }, []); // Le tableau vide comme deuxième argument signifie que ce code s'exécute une seule fois après le montage initial.
    //Nombre total des utilisateurs
    const totalTontine = tontine.length;

    useEffect(() => {
      // Récupérer la liste des utilisateurs
      axios
        .get('https://fewnu-tontin.onrender.com/cotisations/getCotisations')
        .then((response) => {
          setCotisation(response.data);        
        })
        .catch((error) => {
          console.error('Failed to fetch cotisations:', error.message);
        });
    }, []); 
  
  return (
    <div className="container mt-5 pt-5">
      <div className="row gap-1 mb-5 px-3">
        <div className="col-lg-5 col-md-5 col-sm-5 card border-2 shadow p-3">
          <p className="title-card">Nonbre de tontines :</p>
          <p className="h1 number">{totalTontine}</p>
        </div>
        <div className="col-lg-1 col-md-1 col-sm-1"></div>
        <div className="col-lg-5 col-md-5 col-sm-5 card border-2 shadow p-3">
          <p className="title-card">Nonbre de membres :</p>
          <p className="h1 number">{totalMembers}</p>
        </div>
      </div>
      <div className="row">
        <h1 className="cotisation mb-4">Cotisations</h1>
        <div className="table-responsive">
          <table className="table table-striped border border-2 shadow">
            <thead>
              <tr className="head">
                <th>Membre</th>
                <th>Nom de la Tontine</th>
                <th>Montant</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {cotisation.map((cotisation: any) =>(
                 <tr key={cotisation.id}>
                 <td>{cotisation.user}</td>
                 <td>{cotisation.tontine}</td>
                 <td>{cotisation.cotisation} Fcfa</td>
                 <td>{cotisation.createdAt}</td>
               </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
