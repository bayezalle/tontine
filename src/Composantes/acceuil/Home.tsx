import React, { FC } from "react";
import { RouteComponentProps } from "react-router-dom";
import "./home.css";
import Sidebar from '../Sidebar/Sidebar'
import Header from "../Header/Header";
import Dashboard from "../dashboard/Dashboard";


type SomeComponentProps = RouteComponentProps;
const Home: FC<SomeComponentProps> = ({ history }) => {
  // const logout = () => {
  //   localStorage.clear();
  //   history.push("/");
  // };
  return (
    <>
      <div className="container-fluid px-0">
        <div className="row g-0 ">
          <div className="col-lg-3 col-md-1 col-sm-1 col-xs-1">
            <Sidebar/>
          </div>
          <div className="col-lg-9 col-md-11 col-sm-11 col-xs-11">
            <div>
              <Header/>
            </div>
            <div>
              <Dashboard/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;