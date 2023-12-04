import React, { useEffect, useState } from "react";
import axios from "axios";
import "./header.css";
import user1 from "../../assets/Ellipse 9.png";

// Définir le type de l'utilisateur
interface User {
  firstName: string;
  lastName: string;
  phoneNumber: number;
  role: string;
}

const Header: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Récupérer les informations de l'utilisateur depuis le local storage
    const userFromLocalStorage = localStorage.getItem("user");

    if (userFromLocalStorage) {
      const connectedUser = JSON.parse(userFromLocalStorage) as User;
      setUser(connectedUser);
    }
  }, []);

  const getConnectedUser = (users: any[]): {
    firstName: string;
    lastName: string;
    phoneNumber: number;
    role: string;
  } | null => {

    // Supposons que votre JWT contient l'ID de l'utilisateur connecté
    // const connectedUserId = '65437592c5beb95c8dd 86247';
    const connectedUserId = users[0]._id;

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
          <img src={user1} alt="user" className="img-fluid img me-3" />
          <div className="btn-group">
            <button
              type="button"
              className="btn btn-sm btn-success me-3 rounded dropdown-toggle dropdown-toggle-split"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            ></button>
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
