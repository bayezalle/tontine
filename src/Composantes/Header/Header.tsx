import React from "react";
import "./header.css";
import user1 from "../../assets/Ellipse 9.png";
import { useEffect, useState } from "react";
import axios from "axios";

const Header = () => {
  const [user, setUser] = useState<
  {
    firstName: string;
    lastName: string;
    phoneNumber:number;
  } | null
>(null);

  useEffect(() => {
    // Faites un appel API pour récupérer les informations de l'utilisateur connecté
    axios.get('https://fewnu-tontin.onrender.com/user/profile', {
      headers: {
        Authorization: 'Bearer YOUR_JWT_TOKEN',
      },
    })
    .then((response) => {
      setUser(response.data[0]);
    })
    .catch((error) => {
      console.error('Failed to fetch user profile:', error.message);
    });
  }, []);

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
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
