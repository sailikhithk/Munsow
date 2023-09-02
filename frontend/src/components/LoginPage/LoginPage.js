import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginImage from "../../images/login.jpg";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
const LoginPage = () => {

    const [universityId, setUniversityId] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const loginInputHandler = (e) => {
        const { name = "", value = "" } = e.target;
        if (name === "universityId") {
          setUniversityId(value);
        } else {
          setPassword(value);
        }
      };

    return (

        <div className="p-4">
            <div className="card-position-flex">
                <div className="p-4">
                    <div className="card-body">
                        <div>
                            <h2 className="login-header">Institution Login</h2>
                            <p className="login-sub-header">
                                Get access to our expert insights about your students
                                across departments, branches and cities today!
                            </p>
                            <div className="login-form-container">
                                <div className="mb-3">
                                    <label
                                        htmlFor="universityId"
                                        className="form-label login-form-label"
                                    >
                                        University ID
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control login-input-control"
                                        id="universityId"
                                        name="universityId"
                                        placeholder="UNIV01UB"
                                        value={universityId}
                                      onChange={loginInputHandler}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="password"
                                        className="form-label login-form-label"
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control login-input-control"
                                        id="password"
                                        name="password"
                                        placeholder="********"
                                        value={password}
                                      onChange={loginInputHandler}
                                    />
                                </div>
                            </div>
                            <div className="d-grid gap-2 col-6 mx-auto mt-4">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                // onClick={handleSubmit}
                                >
                                    Login
                                </button>
                            </div>
                            <div className="mt-3 text-center">
                                <span className="login-footer-container link-set">
                                    <Link
                                        className="text-decoration-none"
                                        // to={"/registration"}
                                    >
                                        Forget Password?
                                    </Link>
                                </span>
                            </div>
                            <div className="mt-4 text-center">
                                <span className="login-footer-container">
                                    Not a member with us yet?{" "}
                                </span>
                                <span className="login-footer-container login-join-us">
                                    <Link
                                        className="text-decoration-none"
                                        to={"/registration"}
                                    >
                                        Join Us Today!
                                    </Link>
                                </span>
                            </div>
                            <div className="mt-4 text-center">
                                <span className="login-footer-container">
                                    Having issues logging in?
                                </span>
                                <span className="login-footer-container fw-bolder">
                                    {" "}
                                    Contact Support
                                </span>
                            </div>
                            <div className="mt-1 text-center">
                                <span className="login-footer-container">
                                    By continuing, you agree to our
                                </span>
                                <span className="login-footer-container fw-bolder">
                                    {" "}
                                    Terms of Service
                                </span>
                                <span className="login-footer-container"> and </span>
                                <span className="login-footer-container fw-bolder">
                                    Privacy Policy
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="">
                    <img
                        src={LoginImage}
                        className="img-fluid login-image-container"
                        alt="Login"
                    />
                </div>
            </div>

        </div>
    );
};

export default LoginPage;
