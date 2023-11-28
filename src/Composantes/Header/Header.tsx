import React from "react";
import "./header.css";
import user1 from "../../assets/Ellipse 9.png";
import { useEffect, useState } from "react";
import axios from "axios";

const Header = () => {
  const [user, setUser] = useState<{
    firstName: string;
    lastName: string;
    phoneNumber: number;
    role: string;
  } | null>(null);

  useEffect(() => {
    // Faites un appel API pour récupérer la liste des utilisateurs
    axios
      .get('https://fewnu-tontin.onrender.com/user/profile', {
        headers: {
          Authorization: 'Bearer YOUR_JWT_TOKEN',
        },
      })
      .then((response) => {
        // Supposons que vous ayez une fonction pour récupérer l'utilisateur connecté
        const connectedUser = getConnectedUser(response.data);

        // Mettez à jour l'état avec les informations de l'utilisateur connecté
        setUser(connectedUser);
      })
      .catch((error) => {
        console.error('Failed to fetch user profiles:', error.message);
      });
  }, []);

  const getConnectedUser = (users: any[]): {
    firstName: string;
    lastName: string;
    phoneNumber: number;
    role: string;
  } | null => {

    // Supposons que votre JWT contient l'ID de l'utilisateur connecté
    // const connectedUserId = '65437592c5beb95c8dd 86247';
    const connectedUserId = users[10]._id;

    // Recherchez l'utilisateur dans la liste en fonction de son ID
    const connectedUser = users.find((user) => user._id === connectedUserId);

    return connectedUser
      ? {
          firstName: connectedUser.firstName,
          lastName: connectedUser.lastName,
          phoneNumber: connectedUser.phoneNumber, 
          role: connectedUser.role,
        }
      : null;
  };

  // if (!user) {
  //   return <div>Loading...</div>;
  // }
  
  return (
    <div className="headers fixed-top">
      <div className="d-flex header justify-content-end pe-5">
        <div className="d-flex justify-content-center align-items-center p-2">
          <img src={user1} alt="user" className="img-fluid img" />
          <div className="btn-group">
            <button className="btn  btn-sm" type="button">
              {/* Small split button */}
            </button>
            <button type="button" className="btn btn-sm btn-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
              <span className="visually-hidden">Toggle Dropdown</span>
            </button>
           <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item" href="#">
                {user && user.firstName}
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                 {user && user.lastName}
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                {user && user.phoneNumber}
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                {user && user.role}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
