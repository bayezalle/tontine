import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { RouteComponentProps } from "react-router-dom";
import "./conect.css";

type SomeComponentProps = RouteComponentProps;

const Login: FC<SomeComponentProps> = ({ history }): JSX.Element => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const login = async (data: any) => {
    try {
      setLoading(true);

      let params = {
        phoneNumber: data.phoneNumber,
        password: data.password,
      };

      const response = await axios.post(
        "https://fewnu-tontin.onrender.com/auth/login",
        params
      );

      setLoading(false);

      if (response.data.success === false) {
        // Affichage d'une notification d'erreur avec react-toastify
        toast.error(response.data.error, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: 0,
          toastId: "my_toast",
        });
      } else {
        // Affichage d'une notification de succès avec react-toastify
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

        // Stocker les données de l'utilisateur dans le local storage
        localStorage.setItem("auth", "true");
        localStorage.setItem("user", JSON.stringify(response.data.user));

        // Redirection après 3 secondes
        setTimeout(() => {
          history.push("/home");
        });
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container-fluid login-page">
        <div
          className="row d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <div
            className="card  bg-white shadow mb-3"
            style={{ maxWidth: "380px" }}
          >
            <div className="col-md-12">
              <div className="card-body">
                <h3 className="card-title text-center text-secondary mt-3">
                  Formulaire de Connexion
                </h3>
                <form autoComplete="off" onSubmit={handleSubmit(login)}>
                  <div className="mb-3 mt-4">
                    <label className="form-label">Téléphone</label>
                    <input
                      type="tel"
                      className="form-control shadow-none input-couleur"
                      id="exampleFormControlInput1"
                      {...register("phoneNumber", {
                        required: "Le numéro de téléphone est requis !",
                      })}
                    />
                    {errors.phoneNumber &&
                      typeof errors.phoneNumber === "object" && (
                        <p className="text-danger" style={{ fontSize: 14 }}>
                          {(errors.phoneNumber as { message?: string }).message}
                        </p>
                      )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Mot de passe</label>
                    <input
                      type="password"
                      className="form-control shadow-none input-couleur"
                      id="exampleFormControlInput2"
                      {...register("password", {
                        required: "Le mot de passe est requis !",
                      })}
                    />

                    {errors.password && typeof errors.password === "object" && (
                      <p className="text-danger" style={{ fontSize: 14 }}>
                        {(errors.password as { message?: string }).message}
                      </p>
                    )}
                  </div>
                  <div className="text-center mt-4 ">
                    <button
                      className="btn btn-couleur text-center shadow-none mb-3"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? "Connexion en cours..." : "Connexion"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Affichez le loader ici */}
      {loading && <div className="loader">Chargement...</div>}

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
    </>
  );
};

export default Login;
