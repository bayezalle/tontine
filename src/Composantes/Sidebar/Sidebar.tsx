import React, { FC } from "react";
import "./Sidebar.css";
import { FaBars } from "react-icons/fa6";
import { BsCaretLeftSquare } from "react-icons/bs";



const Sidebar: FC = () => {
  interface Links {
    name: string;
    link: string;
  }
  
  let linkItems: Links[] = [
    {
      name: "Dashboard",
      link: "/dashboard",
    },
    {
      name: "Membres",
      link: "/membres",
    },
    {
      name: "Tontines",
      link: "/tontines",
    },
    {
      name: "Cotisations",
      link: "/Cotisations",
    },
  ];
  return (
    <div id="sidebar" >
      <button
        className="btn menu rounded-0 d-lg-none px-3"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasResponsive"
        aria-controls="offcanvasResponsive"
      >
        <FaBars className="fs-4" />
      </button>

      <div
        className="offcanvas-lg offcanvas-start"
        tabIndex={-1}
        id="offcanvasResponsive"
        aria-labelledby="offcanvasResponsiveLabel"
      >
        <div className="offcanvas-header">
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            data-bs-target="#offcanvasResponsive"
            aria-label="Close"
          >
            <BsCaretLeftSquare className="fs-2 text-white"/>
          </button>
        </div>
        <div className="offcanvas-body pt-5 ps-5 mt-5">
          <ul className="list-unstyled mt-3">
        {linkItems.map((item, index) => (
          <li className="mb-4 side-link" key={index}>
            <a href={item.link} className="fw-bold">{item.name}</a>
          </li>
        ))}
        <li className="mt-5 side-link">
              <button id="logout" className="btn btn-danger">
                Déconnexion
              </button>
            </li>
      </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
