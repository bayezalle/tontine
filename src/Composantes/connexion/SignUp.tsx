import React, { FC } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import './conect.css'
import 'react-toastify/dist/ReactToastify.css';

type SomeComponentProps = RouteComponentProps;
const SignUp: FC<SomeComponentProps> = ({ history }) => {
  const {
    register,
    handleSubmit,
    // watch,
    reset,
    formState: { errors },
  } = useForm();

  const submitData = (data: any) => {
    let params = {
      firstName:data.firstName,
      lastName:data.lastName,
      // username: data.username,
      phoneNumber: data.phoneNumber,
      email: data.email,
      password: data.password,
    };
    console.log(data);
    axios
      .post('https://fewnu-tontin.onrender.com/auth/register', params)
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

        localStorage.setItem("auth", response.data.token);
        reset();
        setTimeout(() => {
          history.push("/");
        }, 3000);
      })

      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <>
      <div className="container-fluid register-page ">
        <div
          className="row d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <div className="card mb-3 mt-3 rounded bg-white shadow " style={{ maxWidth: "380px" }}>
            <div className="col-md-12">
              <div    className="card-body">
                <h3 className="card-title text-center text-secondary mt-3 mb-3">
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
                        <p className="text-danger" style={{ fontSize: 14 }}>
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
                        <p className="text-danger" style={{ fontSize: 14 }}>
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
                        <p className="text-danger" style={{ fontSize: 14 }}>
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
                      {...register("email", { required: "Email is required!" })}
                    />
                    {errors.email && (
                      <p className="text-danger" style={{ fontSize: 14 }}>
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
                      <p className="text-danger" style={{ fontSize: 14 }}>
                        {/* {errors.password.message} */}
                      </p>
                    )}
                  </div>
                 
                  <div className="text-center mt-4 ">
                    <button
                      className="btn btn-couleur text-center shadow-none mb-3"
                      type="submit"
                    >
                      Inscription
                    </button>
                    <p className="card-text">
                      Vous avez déja un compte? {" "}
                      <Link className="fw-bold register" style={{ textDecoration: "none" }} to={"/"}>
                        Connexion
                      </Link>
                    </p>
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

export default SignUp;