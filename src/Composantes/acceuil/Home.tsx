import React, { FC } from "react";
import { RouteComponentProps } from "react-router-dom";
import "./home.css";
import Layout from "../Layout/Layout";

type SomeComponentProps = RouteComponentProps;
const Home: FC<SomeComponentProps> = ({ history }) => {
  const logout = () => {
    localStorage.clear();
    history.push("/");
  };
  return (
    <>
      <div className="container">
        <Layout />
        <nav className="navbar fw-bold">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="#">Acceuil</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Statistique</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Top progression</a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Home;