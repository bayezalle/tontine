import React from "react";
import { FaSearch } from "react-icons/fa";

const ListTontine = () => {
  interface Tontine {
    nomTontine: string;
    montant: number;
    nombreParticipant: number;
  }

  const tableauTontines: Tontine[] = [
    { nomTontine: "Tontine 1", montant: 1000, nombreParticipant: 5 },
    { nomTontine: "Tontine 2", montant: 1500, nombreParticipant: 8 },
    { nomTontine: "Tontine 3", montant: 1200, nombreParticipant: 6 },
  ];
  return (
    <div className="container pt-5 mt-3">
      <div className="row">
        <div className="d-flex justify-content-between mt-5 gap-5">
          <div>
            <h1>Tontines</h1>
          </div>
          <div className="input-group mb-3 w-50">
            <span className="input-group-text" id="basic-addon1">
              <FaSearch className="recherche" />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Recherche"
              aria-label="Recherche"
              aria-describedby="basic-addon1"
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="d-flex justify-content-end gap-5 align-items-baseline">
          <p>Ajouter une tontine :</p>
          <button
            type="button"
            className="px-2 rounded text-light fs-5 fw-bold add-member"
          >
            +
          </button>
        </div>
      </div>
      <div className="row">
        {tableauTontines.map((tontine) => (
          <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
            <div className="card p-3 border-2 shadow">
              <h3>{tontine.nomTontine}</h3>
              <div className="d-flex gap-5">
                <p>Montant des cotisations : </p>
                <p>{tontine.montant} fcfa</p>
              </div>
              <div className="d-flex gap-5">
                <p>Nombres de participants : </p>
                <p>{tontine.nombreParticipant}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListTontine;
