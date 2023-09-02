import React, { useState } from "react";
import "./Register.css";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography } from "@mui/material";
const Register = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        institutionName: "",
        contactName: "",
        contactEmailAddress: "",
        contactPhoneNumber: "",
        numberOfStudents: "",
        institutionPOC: "",
        numberOfDepartments: "",
        country: "",
        city: "",
        contactDesignation: "",
        registrationNumber: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleSubmit = async () => {
        navigate("/dashboard");
    }

    return (
        <div>
            <AppBar
                position="fixed"
                sx={{
                    // width: `calc(100% - 270px)`,
                    ml: "270px",
                    boxShadow: "unset",
                    backgroundColor:"#f8f9fa",
                    color: "#071437",
                }}
            >
                <Toolbar>
                    <div className="heading-top p-2">
                        <div className="card-body">
                            <div>
                                <h2 className="registration-header">Join Us Form</h2>
                                <p className="registration-sub-header">
                                    Kick start your journey to get access to our expert
                                    insights about your students across departments, branches,
                                    and cities today!
                                </p>
                            </div>
                        </div>
                    </div>
                </Toolbar>
            </AppBar>
            <div className="register-page">

                {/* <div className="heading-top p-2">
                    <div className="card-body">
                        <div>
                            <h2 className="registration-header">Join Us Form</h2>
                            <p className="registration-sub-header">
                                Kick start your journey to get access to our expert
                                insights about your students across departments, branches,
                                and cities today!
                            </p>
                        </div>
                    </div>
                </div> */}

                <div className="registration-form-container">
                    <div className="input_main_wrapper">
                        <div className="row-wrapper mt-3">
                            <div className="labelWrapLeft">
                                <label
                                    htmlFor="institutionName"
                                    className="form-label registration-form-label"
                                >
                                    Institution Name
                                </label>
                            </div>
                            <div className="labelWrapRight">
                                <input
                                    type="text"
                                    className="form-control registration-input-control"
                                    id="institutionName"
                                    name="institutionName"
                                    placeholder="Enter your University's name as per any Govt Records"
                                    value=""
                                    onChange={handleChange}
                                />
                            </div>


                        </div>
                        <div className="row-wrapper mt-4">
                            <div className="labelWrapLeft">
                                <label
                                    htmlFor="contactName"
                                    className="form-label registration-form-label"
                                >
                                    Contact Name
                                </label>
                            </div>
                            <div className="labelWrapRight">
                                <input
                                    type="text"
                                    className="form-control registration-input-control"
                                    id="contactName"
                                    name="contactName"
                                    placeholder="Enterthe name of who needs to be contacted"
                                    value=""
                                    onChange={handleChange}
                                />
                            </div>


                        </div>
                        <div className="input-below">
                            <div className="row-wrapper mt-4">
                                <div className="labelWrapLeft">
                                    <label
                                        htmlFor="contactEmailAddress"
                                        className="form-label registration-form-label"
                                    >
                                        Contact Email Address
                                    </label>
                                </div>
                                <div className="labelWrapRight">
                                    <input
                                        type="text"
                                        className="form-control registration-input-control"
                                        id="contactEmailAddress"
                                        name="contactEmailAddress"
                                        placeholder="Enter the Email of the person who needs to be contacted"
                                        value=""
                                        onChange={handleChange}
                                    />
                                </div>
                                <ErrorOutlineIcon></ErrorOutlineIcon>
                                <p className="notification">
                                    The email address needs to match the university's domain (This is a hover on linking the "i")</p>

                            </div>
                        </div>
                        <div className="input-below">
                            <div className="row-wrapper mt-4">
                                <div className="labelWrapLeft">
                                    <label
                                        htmlFor="contactPhoneNumber"
                                        className="form-label registration-form-label"
                                    >
                                        Contact Phone Number
                                    </label>
                                </div>
                                <div className="labelWrapRight">
                                    <input
                                        type="text"
                                        className="form-control registration-input-control"
                                        id="contactPhoneNumber"
                                        name="contactPhoneNumber"
                                        placeholder="Enter the Phone Number"
                                        value=""
                                        onChange={handleChange}
                                    />
                                </div>
                                <ErrorOutlineIcon></ErrorOutlineIcon>
                                <p className="notification">
                                    Enter the country code along with the number (This is a hover on linking the "i")</p>

                            </div>
                        </div>
                        <div className="input-below">
                            <div className="row-wrapper mt-4">
                                <div className="labelWrapLeft">
                                    <label
                                        htmlFor="country"
                                        className="form-label registration-form-label"
                                    >
                                        Country
                                    </label>
                                </div>
                                <div className="labelBelowRight">
                                    <input
                                        type="text"
                                        className="form-control registration-input-control"
                                        id="country"
                                        name="country"
                                        placeholder="Enter Country"
                                        value=""
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="labelBelowLeft">
                                    <label
                                        htmlFor="city"
                                        className="form-label registration-form-label"
                                    >
                                        City
                                    </label>
                                </div>
                                <div className="labelBelowRight">
                                    <input
                                        type="text"
                                        className="form-control registration-input-control"
                                        id="city"
                                        name="city"
                                        placeholder="Enter City"
                                        value=""
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row-wrapper mt-4">
                            <div className="labelWrapLeft">
                                <label
                                    htmlFor="poc"
                                    className="form-label registration-form-label"
                                >
                                    Institution POC (point of contract)
                                </label>
                            </div>
                            <div className="labelWrapRight">
                                <input
                                    type="text"
                                    className="form-control registration-input-control"
                                    id="poc"
                                    name="poc"
                                    placeholder="Enter the Email of person who needs to be contacted"
                                    value=""
                                    onChange={handleChange}
                                />
                            </div>


                        </div>
                        <div className="row-wrapper mt-4">
                            <div className="labelWrapLeft">
                                <label
                                    htmlFor="designation"
                                    className="form-label registration-form-label"
                                >
                                    Contact's Designation
                                </label>
                            </div>
                            <div className="labelWrapRight">
                                <input
                                    type="text"
                                    className="form-control registration-input-control"
                                    id="designation"
                                    name="designation"
                                    placeholder="Enter Designation"
                                    value=""
                                    onChange={handleChange}
                                />
                            </div>


                        </div>
                        <div className="input-below">
                            <div className="row-wrapper mt-4">
                                <div className="labelWrapLeft">
                                    <label
                                        htmlFor="departments"
                                        className="form-label registration-form-label"
                                    >
                                        Number Of Departments
                                    </label>
                                </div>
                                <div className="labelBelowRight2">
                                    <input
                                        type="text"
                                        className="form-control registration-input-control"
                                        id="departments"
                                        name="departments"
                                        placeholder="Number of Departments"
                                        value=""
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="labelBelowLeft2">
                                    <label
                                        htmlFor="students"
                                        className="form-label registration-form-label"
                                    >
                                        Number of Students
                                    </label>
                                </div>
                                <div className="labelBelowRight2">
                                    <input
                                        type="text"
                                        className="form-control registration-input-control"
                                        id="students"
                                        name="students"
                                        placeholder="Number of Students"
                                        value=""
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row-wrapper mt-4">
                            <div className="labelWrapLeft">
                                <label
                                    htmlFor="registrationNumber"
                                    className="form-label registration-form-label"
                                >
                                    Registration Number
                                </label>
                            </div>
                            <div className="labelWrapRight">
                                <input
                                    type="text"
                                    className="form-control registration-input-control"
                                    id="registrationNumber"
                                    name="registrationNumber"
                                    placeholder="Enter Registration Number"
                                    value=""
                                    onChange={handleChange}
                                />
                            </div>


                        </div>
                        <div className="gap-2 col-6 mt-4 btn-below">
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleSubmit}
                            >
                                Submit
                            </button>
                        </div>
                        <div className="mt-1 text-center footer">
                            <span className="registration-footer-container">
                                Already have an account?
                            </span>
                            <span className="registration-footer-container login-redirect">
                                <Link className="text-decoration-none" to={"/"}>
                                    Login
                                </Link>
                            </span>
                        </div>
                    </div>
                    <div>

                    </div>
                </div>
            </div>
        </div>
    );
}
export default Register;