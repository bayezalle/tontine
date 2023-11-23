import React from "react";
import "./header.css";
import user from "../../assets/Ellipse 9.png";
import { useEffect, useState } from "react";

const Header = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Récupérez le nom de l'utilisateur depuis le localStorage
    const storedUsername = localStorage.getItem("userData");

    // Assurez-vous que les données existent et sont valides
    if (storedUsername) {
      const userData = JSON.parse(storedUsername);
      setUsername(userData.user.username); // Assurez-vous que la propriété "username" existe dans vos données utilisateur
    }
  }, []);
  return (
    <div className="headers ">
      <div className="d-flex header justify-content-end pe-5">
        <div className="d-flex justify-content-center align-items-center p-2">
          <img src={user} alt="user" className="img-fluid img" />
          <div className="btn-group">
            <button
              type="button"
              className="btn text-white dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Ndiaga Sall
            </button>
            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item" href="#">
                  Action
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Another action
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Something else here
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Separated link
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center gap-2">
          <div className="btn-group">
            <button
              type="button"
              className="btn border border-1 text-white dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Créer
            </button>
            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item" href="#">
                  Nouvelle Tontine
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                Nouveau Membre
                </a>
              </li>
            </ul>
          </div>
          <div className="text-white border border-pill p-1">
            <span className="text-center">juin 2023</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
