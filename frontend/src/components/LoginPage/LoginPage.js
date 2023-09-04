import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginImage from "../../images/login.jpg";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

import "./LoginPage.css";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const LoginPage = () => {

    const [universityId, setUniversityId] = useState("");
    const [password, setPassword] = useState("");
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();

    const loginInputHandler = (e) => {
        const { name = "", value = "" } = e.target;
        if (name === "universityId") {
            setUniversityId(value);
        } else {
            setPassword(value);
        }
    };
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleSubmit = async () => {
        navigate("./dashboard");
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
                                    onClick={handleSubmit}
                                >
                                    Login
                                </button>
                            </div>
                            <div className="mt-3 text-center">
                                <span className="login-footer-container link-set">
                                    <p
                                        className="text-decoration-none forget-button"
                                        onClick={handleClickOpen}
                                    >
                                        Forget Password?
                                    </p>
                                </span>
                            </div>
                            <div>
                                <Modal
                                    open={open}
                                    onClose={handleClickOpen}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box sx={style}>
                                        <Typography id="modal-modal-title" variant="h6" component="h2">
                                            Forget Password?
                                        </Typography>
                                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                            Enter Your Email-Id
                                        </Typography>
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            id="name"
                                            label=" Email Address"
                                            type="email"
                                            fullWidth
                                            variant="standard"
                                            onChange={loginInputHandler}
                                        />
                                        <div className="mt-4 footer-buttons">
                                            <Button onClick={handleClose}>Cancel</Button>
                                            <Button onClick={handleClose}>Subscribe</Button>
                                        </div>

                                    </Box>
                                </Modal>
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
