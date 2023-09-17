import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const StudentRegister = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    institutionEmail: '',
    branch: '',
    department: '',
    programme: '',
    degreeType: 'ug', // Default value for radio buttons
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDegreeTypeChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      degreeType: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can do something with the user input here, such as sending it to an API or storing it in local state
    console.log(formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-3xl bg-white p-6 rounded-md shadow-lg">
        <h1 className="text-2xl font-semibold mb-6">Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
            <div className="mb-4">
              <label htmlFor="firstName" className="text-gray-600">Student First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4 pl-5">
              <label htmlFor="lastName" className="text-gray-600">Student Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phoneNumber" className="text-gray-600">Phone Number</label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4 pl-5">
              <label htmlFor="institutionEmail" className="text-gray-600">Institution Email</label>
              <input
                type="text"
                id="institutionEmail"
                name="institutionEmail"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                value={formData.institutionEmail}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="branch" className="text-gray-600">Branch</label>
              <input
                type="text"
                id="branch"
                name="branch"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                value={formData.branch}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4 pl-5">
              <label htmlFor="department" className="text-gray-600">Department</label>
              <input
                type="text"
                id="department"
                name="department"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                value={formData.department}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="programme" className="text-gray-600">Programme</label>
              <input
                type="text"
                id="programme"
                name="programme"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                value={formData.programme}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4 pl-5">
              <label className="text-gray-600">Degree Type</label>
              <div className="flex items-center">
                <label htmlFor="ug" className="mr-2">UG</label>
                <input
                  type="radio"
                  id="ug"
                  name="degreeType"
                  value="ug"
                  checked={formData.degreeType === 'ug'}
                  onChange={handleDegreeTypeChange}
                />
                <label htmlFor="pg" className="ml-4 mr-2">PG</label>
                <input
                  type="radio"
                  id="pg"
                  name="degreeType"
                  value="pg"
                  checked={formData.degreeType === 'pg'}
                  onChange={handleDegreeTypeChange}
                />
              </div>
            </div>
            <div className="mb-4 ">
              <label htmlFor="password" className="text-gray-600">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4 pl-5">
              <label htmlFor="confirmPassword" className="text-gray-600">Re-enter Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
            >
              Register
            </button>
          </div>
          <div className="mt-1 text-center footer">
              <span className="text-2xl registration-footer-container">
                Already have an account? {"  "}
              </span>
              <span className="registration-footer-container login-redirect">
                <Link className="text-decoration-none" to={"/studentLogin"}>
                  Login
                </Link>
              </span>
            </div>
        </form>
      </div>
    </div>
  );
};

export default StudentRegister;
