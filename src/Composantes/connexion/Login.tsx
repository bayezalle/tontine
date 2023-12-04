import React, { FC } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { RouteComponentProps } from "react-router-dom";
import "./conect.css";

type SomeComponentProps = RouteComponentProps;
const Login: FC<SomeComponentProps> = ({ history }): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const login = (data: any) => {
    let params = {
      phoneNumber: data.phoneNumber,
      password: data.password,
    };

    axios
      .post("https://fewnu-tontin.onrender.com/auth/login", params)
      .then(function (response) {
        if (response.data.success === false) {
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
          localStorage.setItem("auth", "true"); // Exemple, ajustez selon vos besoins
          localStorage.setItem("user", JSON.stringify(response.data.user));

          // Déconnexion
          setTimeout(() => {
            history.push("/home");
          }, 3000);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
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
                  Login Form
                </h3>
                <form autoComplete="off" onSubmit={handleSubmit(login)}>
                  <div className="mb-3 mt-4">
                    <label className="form-label">Telephone</label>
                    <input
                      type="phone"
                      className="form-control shadow-none input-couleur"
                      id="exampleFormControlInput1"
                      {...register("phoneNumber", {
                        required: "Email is required!",
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
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control shadow-none input-couleur"
                      id="exampleFormControlInput2"
                      {...register("password", {
                        required: "Password is required!",
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
                    >
                      connexion
                    </button>
                    {/* <p className="card-text pb-2">
                      Pas encore de compte? {" "}
                      <Link className="fw-bold sign-up" style={{ textDecoration: "none" }} to={"/signup"}>
                        Inscription
                      </Link>
                    </p> */}
                  </div>
                </form>
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
    </>
  );
};
export default Login;
