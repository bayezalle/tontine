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
      {/* <div
        style={{display: "flex", justifyContent: "space-between", paddingLeft: 50,
          paddingRight: 50, }}>
        <div>
          <button type="submit" className="buttons" onClick={logout}>
            Deconnexion
          </button>
        </div>
      </div> */}
      <div className="container">
        <Layout />
      </div>
    </>
  );
};

export default Home;