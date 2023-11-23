import React, { FC } from "react";
import { RouteComponentProps } from "react-router-dom";
import "./home.css";
import Layout from "../Layout/Layout";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";

type SomeComponentProps = RouteComponentProps;
const Home: FC<SomeComponentProps> = ({ history }) => {
  // const logout = () => {
  //   localStorage.clear();
  //   history.push("/");
  // };
  return (
    <>
      <div className="container-fluid">
        <div className="row g-0">
          <div className="col-2">
            <Sidebar/>
          </div>
          <div className="col-lg-10">
            <div>
              <Header/>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;