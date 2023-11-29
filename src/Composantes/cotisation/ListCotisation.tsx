import React, { useEffect, useState } from "react";
import axios from "axios";
import { ICotisation } from "../../Types";
import { FaSearch } from "react-icons/fa";

const ListCotisation = () => {
  const [cotisation, setCotisation] = useState<ICotisation[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    // Récupérer la liste des utilisateurs
    axios
      .get("https://fewnu-tontin.onrender.com/cotisations/getCotisations")
      .then((response) => {
        setCotisation(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch cotisations:", error.message);
      });
  }, []);

  // Filtrer les cotisations en fonction de la recherche
  const filteredCotisations = cotisation.filter(
    (cotisation) =>
      cotisation.user.firstName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      cotisation.user.lastName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      ((typeof cotisation.user.phoneNumber === "string" ||
        typeof cotisation.user.phoneNumber === "number") &&
        cotisation.user.phoneNumber.toString().includes(searchTerm)) ||
      cotisation.tontine.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cotisation.cotisation.toString().includes(searchTerm) ||
      cotisation.createdAt.includes(searchTerm)
  );
  return (
    <div className="container">
      <div className="row mt-5">
        <div className="d-flex justify-content-between my-5 align-items-baseline">
          <div>
            <h1 className="cotisation mt-5">Cotisations</h1>
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-striped border border-2 shadow">
            <thead>
              <tr className="head">
                <th>Prenom</th>
                <th>Nom</th>
                <th>telephone</th>
                <th>Nom de la Tontine</th>
                <th>Montant</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredCotisations.map((cotisation) => (
                <tr key={cotisation.id}>
                  <td>{cotisation.user.firstName}</td>
                  <td>{cotisation.user.lastName}</td>
                  <td>{cotisation.user.phoneNumber}</td>
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

export default ListCotisation;
