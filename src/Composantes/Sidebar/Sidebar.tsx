import React, { useState } from "react";
import "./Sidebar.css";

interface Links {
    name: string;
    link?: string;
  }

let linkItems: Links[] = [
    {
        name: "Dashboard",
        link: "/"
    },
    {
        name: "Membres",
        link: "/membres"
    },
    {
        name: "Tontines",
        link: "/"
    },
    {
        name: "Cotisations",
        link: "/"
    },
]

const Sidebar: React.FC = () => {
  return (
    <div className="container-fluid pt-5 border-2 vh-100">
      <ul>
        <li className="mb-3 side-link">
          <a href="">Dashboard</a>
        </li>
        <li className="mb-3 side-link">
          <a href="">Membres</a>
        </li>
        <li className="mb-3 side-link">
          <a href="">Tontine</a>
        </li>
        <li className="mb-3 side-link">
          <a href="">Cotisations</a>
        </li>
        <li className="mb-3 side-link">
          <a href="">Paramétres</a>
        </li>
        <li id="logout" className="mb-3 side-link">
          <a href="">Déconnexion</a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
