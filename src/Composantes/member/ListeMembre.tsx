import React, { FC, useEffect, useState } from "react";
import axios from "axios";

const ListeMembere: FC = () => {
  const [members, setMembers] = useState<
  {
    firstName:string,
    lastName:string,
    phoneNumber:number,
    email:string
  }[]>
  ([]);

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

  return (
    <div>
    <p>Nombre total de membres sur la carte : {totalMembers} membre</p>
      <h2>Liste des Membres</h2>
     <div className="container">
     {members.map((member) => (
     <table className="table">
        <thead>
        <tr>
            <th>Prenom</th>
            <th>Nom</th>
            <th>Telephone</th>
            <th>Email</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td>{member.firstName}</td>
            <td>{member.lastName}</td>
            <td>{member.phoneNumber}</td>
            <td>{member.email}</td>
        </tr>
        </tbody>
      </table>
       ))}
     </div>
    </div>
  );
};

export default ListeMembere;
