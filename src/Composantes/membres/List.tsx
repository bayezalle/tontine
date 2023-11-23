import React from "react";
import { FaSearch } from "react-icons/fa";
import "./Member.css";

const List = () => {
  type Person = {
    prenom: string;
    nom: string;
    telephone: string;
    email: string;
  };

  const Membres: Person[] = [
    {
      prenom: "John",
      nom: "Doe",
      telephone: "123-456-7890",
      email: "john.doe@example.com",
    },
    {
      prenom: "Jane",
      nom: "Doe",
      telephone: "987-654-3210",
      email: "jane.doe@example.com",
    },
  ];

  return (
    <div className="container">
      <div className="row">
        <div className="d-flex justify-content-between mt-5 gap-5">
          <div>
            <h1>Membres</h1>
          </div>
          <div className="input-group mb-3 w-50">
            <span className="input-group-text" id="basic-addon1">
              <FaSearch className="recherche" />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Nom"
              aria-label="Nom"
              aria-describedby="basic-addon1"
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="d-flex justify-content-between align-items-center">
          <p>Ajouter un(e) membre :</p>
        <button type="button" className="px-2 rounded text-light fs-5 fw-bold add-member">+</button>
        </div>
      </div>
      <div className="row">
        <table className="table border table-striped">
          <thead>
            <tr>
              <th scope="col">Prenom</th>
              <th scope="col">Nom</th>
              <th scope="col">Telephone</th>
              <th scope="col">Email</th>
            </tr>
          </thead>
          <tbody>
            {Membres.map((membre, index) => (
              <tr key={index}>
                <td>{membre.prenom}</td>
                <td>{membre.nom}</td>
                <td>{membre.telephone}</td>
                <td>{membre.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List;
