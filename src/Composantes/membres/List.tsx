import React, { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import "./Member.css";

const List: FC = () => {
  const [members, setMembers] = useState<
    {
      id: string;
      firstName: string;
      lastName: string;
      phoneNumber: number;
      email: string;
    }[]
  >([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    // Récupérer la liste des utilisateurs
    axios
      .get("https://fewnu-tontin.onrender.com/user/profile")
      .then((response) => {
        setMembers(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch members:", error.message);
      });
  }, []); // Le tableau vide comme deuxième argument signifie que ce code s'exécute une seule fois après le montage initial.

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Filtrer les membres en fonction du terme de recherche
  const filteredMembers = members.filter(
    (member) =>
      member.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.phoneNumber.toString().includes(searchTerm) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //Ajout des membres
  const history = useHistory();
  const {
    register,
    handleSubmit,
    // watch,
    reset,
    formState: { errors },
  } = useForm();

  const submitData = (data: any) => {
    let params = {
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: data.phoneNumber,
      email: data.email,
      password: data.password,
    };
  
    axios
      .post("https://fewnu-tontin.onrender.com/auth/register", params)
      .then(function (response) {
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: 0,
          toastId: "my_toast",
        });
  
        // Créer un nouveau tableau avec le nouveau membre au début
        const newMember = {
          id: response.data.id,
          firstName: data.firstName,
          lastName: data.lastName,
          phoneNumber: data.phoneNumber,
          email: data.email,
        };
  
        setMembers([newMember, ...members]);
  
        localStorage.setItem("auth", response.data.token);
        reset();
        setTimeout(() => {
          history.push("/membres");
        }, 3000);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  

  return (
    <div className="container">
      <div className="row">
        <div className="d-flex justify-content-between mt-5 gap-5">
          <div>
            <h1>Membres</h1>
          </div>
          <div className="input-group mb-3 w-50">
            <span className="input-group-text" id="basic-addon1">
              <FaSearch className="recherche" />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Nom"
              aria-label="Nom"
              aria-describedby="basic-addon1"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
      </div>
      <div className="row p-3">
        <div className="d-flex justify-content-between align-items-center">
          <p>Ajouter un(e) membre :</p>
          <button
            type="button"
            className="px-2 rounded text-light fs-5 fw-bold add-member"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            +
          </button>
        </div>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Ajout membre
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="row d-flex justify-content-center align-items-center">
                  <div className="" style={{ maxWidth: "380px" }}>
                    <div className="col-md-12">
                      <div className="card-body">
                        <h3 className="card-title text-center text-secondary mb-3">
                          Sign Up Form
                        </h3>
                        <form
                          className="row"
                          autoComplete="off"
                          onSubmit={handleSubmit(submitData)}
                        >
                          <div className="col-md-6">
                            <div className="">
                              <label className="form-label">Fist Name</label>
                              <input
                                type="text"
                                className="form-control form-control-sm input-couleur"
                                id="exampleFormControlInput1"
                                {...register("firstName", {
                                  required: "firstName is required!",
                                })}
                              />
                              {errors.firstName && (
                                <p
                                  className="text-danger"
                                  style={{ fontSize: 14 }}
                                >
                                  {/* {errors.username.message} */}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="">
                              <label className="form-label">last Name</label>
                              <input
                                type="text"
                                className="form-control form-control-sm input-couleur"
                                id="exampleFormControlInput1"
                                {...register("lastName", {
                                  required: "lastName is required!",
                                })}
                              />
                              {errors.lastName && (
                                <p
                                  className="text-danger"
                                  style={{ fontSize: 14 }}
                                >
                                  {/* {errors.username.message} */}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="col-md">
                            <div className="">
                              <label className="form-label">Telephone</label>
                              <input
                                type="text"
                                className="form-control form-control-sm input-couleur"
                                id="exampleFormControlInput2"
                                {...register("phoneNumber", {
                                  required: "phoneNumber is required!",
                                })}
                              />
                              {errors.phoneNumber && (
                                <p
                                  className="text-danger"
                                  style={{ fontSize: 14 }}
                                >
                                  {/* {errors.phoneNumber.message} */}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="">
                            <label className="form-label">Email</label>
                            <input
                              type="email"
                              className="form-control form-control-sm input-couleur"
                              id="exampleFormControlInput3"
                              {...register("email", {
                                required: "Email is required!",
                              })}
                            />
                            {errors.email && (
                              <p
                                className="text-danger"
                                style={{ fontSize: 14 }}
                              >
                                {/* {errors.email.message} */}
                              </p>
                            )}
                          </div>
                          <div className="">
                            <label className="form-label">Password</label>
                            <input
                              type="password"
                              className="form-control form-control-sm input-couleur"
                              id="exampleFormControlInput5"
                              {...register("password", {
                                required: "Password is required!",
                              })}
                            />
                            {errors.password && (
                              <p
                                className="text-danger"
                                style={{ fontSize: 14 }}
                              >
                                {/* {errors.password.message} */}
                              </p>
                            )}
                          </div>

                          <div className="text-center mt-4 ">
                            <button
                              className="btn btn-couleur text-center shadow-none mb-3"
                              type="submit"
                            >
                              Ajouter
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover
          limit={1}
          transition={Flip}
        />
      </div>
      <div className="row table-responsive">
        <table className="table border table-striped">
          <thead>
            <tr>
              <th scope="col">Prenom</th>
              <th scope="col">Nom</th>
              <th scope="col">Telephone</th>
              <th scope="col">Email</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map((member) => (
              <tr key={member.id}>
                <td>{member.firstName}</td>
                <td>{member.lastName}</td>
                <td>{member.phoneNumber}</td>
                <td>{member.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List;
