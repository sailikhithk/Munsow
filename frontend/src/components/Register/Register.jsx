import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar } from "@mui/material";
import "./Register.css";

const Register = (props) => {
    let dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        institution_name: "",
        contact_name: "",
        email: "",
        phone_number: "",
        number_of_students: "",
        institutionPOC: "",
        designation: "",
        number_of_departments: "",
        country: "",
        city: "",
        registrationNumber: "",
        password: "",
        re_password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleSubmit = async () => {
        var data = {
            "institution_name": "INV Test-1",
            "contact_name": "harnath",
            "email": "harnath.a@gmail.com",
            "phone_number": "9701185467",
            "country_id": 1,
            "city": "Ongole",
            "desiganation": "SSE",
            "number_of_students": 150,
            "number_of_departments": 10,
            "domains": "@gmail.com",
            "preference_days": "Mon, Tue",
            "preference_time": "10 AM to 6 PM",
            "password": "1234"
        }
        // dispatch(institute_register(data));
        // navigate("/dashboard");
    }

    return (
        <div>
            <AppBar
                position="fixed"
                sx={{
                    // width: `calc(100% - 270px)`,
                    ml: "270px",
                    boxShadow: "unset",
                    backgroundColor: "#f8f9fa",
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
                <div className="registration-form-container">
                    <div className="input_main_wrapper">
                        <div className="row-wrapper mt-3">
                            <div className="labelWrapLeft">
                                <label
                                    htmlFor="institution_name"
                                    className="form-label registration-form-label"
                                >
                                    Institution Name
                                </label>
                            </div>
                            <div className="labelWrapRight">
                                <input
                                    type="text"
                                    className="form-control registration-input-control"
                                    id="institution_name"
                                    name="institution_name"
                                    placeholder="Enter your University's name as per any Govt Records"
                                    value={formData.institution_name}
                                    onChange={handleChange}
                                />
                            </div>


                        </div>
                        <div className="row-wrapper mt-4">
                            <div className="labelWrapLeft">
                                <label
                                    htmlFor="contact_name"
                                    className="form-label registration-form-label"
                                >
                                    Contact Name
                                </label>
                            </div>
                            <div className="labelWrapRight">
                                <input
                                    type="text"
                                    className="form-control registration-input-control"
                                    id="contact_name"
                                    name="contact_name"
                                    placeholder="Enterthe name of who needs to be contacted"
                                    value={formData.contact_name}
                                    onChange={handleChange}
                                />
                            </div>


                        </div>
                        <div className="input-below">
                            <div className="row-wrapper mt-4">
                                <div className="labelWrapLeft">
                                    <label
                                        htmlFor="email"
                                        className="form-label registration-form-label"
                                    >
                                        Contact Email Address
                                    </label>
                                </div>
                                <div className="labelWrapRight">
                                    <input
                                        type="text"
                                        className="form-control registration-input-control"
                                        id="email"
                                        name="email"
                                        placeholder="Enter the Email of the person who needs to be contacted"
                                        value={formData.email}
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
                                        htmlFor="phone_number"
                                        className="form-label registration-form-label"
                                    >
                                        Contact Phone Number
                                    </label>
                                </div>
                                <div className="labelWrapRight">
                                    <input
                                        type="text"
                                        className="form-control registration-input-control"
                                        id="phone_number"
                                        name="phone_number"
                                        placeholder="Enter the Phone Number"
                                        value={formData.phone_number}
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
                                        value={formData.country}
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
                                        value={formData.city}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row-wrapper mt-4">
                            <div className="labelWrapLeft">
                                <label
                                    htmlFor="institutionPOC"
                                    className="form-label registration-form-label"
                                >
                                    Institution POC (point of contract)
                                </label>
                            </div>
                            <div className="labelWrapRight">
                                <input
                                    type="text"
                                    className="form-control registration-input-control"
                                    id="institutionPOC"
                                    name="institutionPOC"
                                    placeholder="Enter the Email of person who needs to be contacted"
                                    value={formData.institutionPOC}
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
                                    value={formData.designation}
                                    onChange={handleChange}
                                />
                            </div>


                        </div>
                        <div className="input-below">
                            <div className="row-wrapper mt-4">
                                <div className="labelWrapLeft">
                                    <label
                                        htmlFor="number_of_departments"
                                        className="form-label registration-form-label"
                                    >
                                        Number Of Departments
                                    </label>
                                </div>
                                <div className="labelBelowRight2">
                                    <input
                                        type="text"
                                        className="form-control registration-input-control"
                                        id="number_of_departments"
                                        name="number_of_departments"
                                        placeholder="Number of Departments"
                                        value={formData.number_of_departments}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="labelBelowLeft2">
                                    <label
                                        htmlFor="number_of_students"
                                        className="form-label registration-form-label"
                                    >
                                        Number of Students
                                    </label>
                                </div>
                                <div className="labelBelowRight2">
                                    <input
                                        type="text"
                                        className="form-control registration-input-control"
                                        id="number_of_students"
                                        name="number_of_students"
                                        placeholder="Number of Students"
                                        value={formData.number_of_students}
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
                                    value={formData.registrationNumber}
                                    onChange={handleChange}
                                />
                            </div>


                        </div>
                        <div className="row-wrapper mt-4">
                            <div className="labelWrapLeft">
                                <label
                                    htmlFor="password"
                                    className="form-label registration-form-label"
                                >
                                    Password
                                </label>
                            </div>
                            <div className="labelWrapRight">
                                <input
                                    type="password"
                                    className="form-control registration-input-control"
                                    id="password"
                                    name="password"
                                    placeholder="Enter Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>


                        </div>
                        <div className="row-wrapper mt-4">
                            <div className="labelWrapLeft">
                                <label
                                    htmlFor="re_password"
                                    className="form-label registration-form-label"
                                >
                                    Re-Enter Password
                                </label>
                            </div>
                            <div className="labelWrapRight">
                                <input
                                    type="password"
                                    className="form-control registration-input-control"
                                    id="re_password"
                                    name="re_password"
                                    placeholder="Re-Enter Password"
                                    value={formData.re_password}
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