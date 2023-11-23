import React from "react";
import "./Dashboard.css";

const Dashboard = () => {
  class Tontine {
    membre: string;
    nomTontine: string;
    montant: number;
    date: string;

    constructor(
      membre: string,
      nomTontine: string,
      montant: number,
      date: string
    ) {
      this.membre = membre;
      this.nomTontine = nomTontine;
      this.montant = montant;
      this.date = date;
    }
  }

  const tontineData: Tontine[] = [
    new Tontine("Baba Thiam", "Tontine Nicaragua", 500000, "2023-01-01"),
    new Tontine("Saliou Thioune", "Tontine Pirogue", 150000, "2023-02-01"),
    new Tontine("Makhan Diakho", "Tontine balle basket", 1500, "2023-02-01"),
    new Tontine("Serifou Diallo", "Tontine ordinateur", 20000, "2023-02-01"),
  ];
  return (
    <div className="container mt-5">
      <div className="row gap-1 mb-5 px-3">
        <div className="col-lg-5 col-md-5 col-sm-5 card border-2 shadow p-3">
          <p className="title-card">Nonbre de tontines :</p>
          <p className="h1 number">5</p>
        </div>
        <div className="col-lg-1 col-md-1 col-sm-1"></div>
        <div className="col-lg-5 col-md-5 col-sm-5 card border-2 shadow p-3">
          <p className="title-card">Nonbre de membres :</p>
          <p className="h1 number">25</p>
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
              {tontineData.map((tontine, index) => (
                <tr key={index}>
                  <td>{tontine.membre}</td>
                  <td>{tontine.nomTontine}</td>
                  <td>{tontine.montant} Fcfa</td>
                  <td>{tontine.date}</td>
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
