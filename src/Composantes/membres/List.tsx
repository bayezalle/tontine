import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import "./Member.css";

const List: FC = () => {
  const [members, setMembers] = useState([]);

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
      <div className="row table-responsive">
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
          {members.map((member: any) => (
              <tr key={member.id}>
                <td>{member.firstName}</td>
                <td>{member.lastName}</td>
                <td>{member.phoneNumber}</td>
                <td>{member.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List;
