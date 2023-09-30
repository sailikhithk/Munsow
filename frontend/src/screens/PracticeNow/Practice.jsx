import { Divider } from "@mui/material";
import React, { useState } from "react";
import Stepper from "react-stepper-horizontal";

const StepperComponent = () => {
    const [steps] = useState([
        { title: "Skill Specific" },
        { title: "Role Specific" },
        { title: "Level" },
        { title: "Summary" },
    ]);
    const [currentStep, setCurrentStep] = useState(0);
    const [hardSkills, setHardSkills] = useState(false);
    const [softSkills, setSoftSkills] = useState(false);
    const [chosenRole, setChosenRole] = useState(false);
    const [chosenCompany, setChosenCompany] = useState(false);
    const [level, setLevel] = useState(0);
    const [experienceLevel, setExperienceLevel] = useState("Beginner");

    const handleNext = () => {
        setCurrentStep(currentStep + 1);
    };

    const handlePrev = () => {
        setCurrentStep(currentStep - 1);
    };

    return (
        <div className="p-10">
            <div className="w-full mx-auto bg-white rounded-xl">
                <p className="p-5 text-xl font-semibold">Practice</p>
                <Divider />
                <Stepper steps={steps} activeStep={currentStep} activeColor={"red"} completeColor={"#886CC0"} completeBorderColor={"#886CC0"} size={40}/>
                <div className="mt-4 p-4 border border-gray-300 rounded">
                    {currentStep === 0 && (
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Skill Specific</h2>
                            <label className="flex items-center mb-2">
                                <input
                                    type="checkbox"
                                    name="hardSkills"
                                    checked={hardSkills}
                                    onChange={() => setHardSkills(!hardSkills)}
                                />
                                Hard Skills
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="softSkills"
                                    checked={softSkills}
                                    onChange={() => setSoftSkills(!softSkills)}
                                />
                                Soft Skills
                            </label>
                        </div>
                    )}
                    {currentStep === 1 && (
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Role Specific</h2>
                            <label className="flex items-center mb-2">
                                <input
                                    type="checkbox"
                                    name="chosenRole"
                                    checked={chosenRole}
                                    onChange={() => setChosenRole(!chosenRole)}
                                />
                                Choose Role
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="chosenCompany"
                                    checked={chosenCompany}
                                    onChange={() => setChosenCompany(!chosenCompany)}
                                />
                                Choose Company
                            </label>
                        </div>
                    )}
                    {currentStep === 2 && (
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Level</h2>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={level}
                                onChange={(e) => setLevel(e.target.value)}
                                className="w-full mb-4"
                                style={{ background: "#f3f0f9" }}
                            />
                            <div className="flex justify-between items-center">
                                <div>
                                    <label className="text-sm text-gray-600">Experience Level:</label>
                                    <select
                                        className="border rounded p-1"
                                        value={experienceLevel}
                                        onChange={(e) => setExperienceLevel(e.target.value)}
                                    >
                                        <option value="Beginner">Beginner</option>
                                        <option value="Intermediate">Intermediate</option>
                                        <option value="Advanced">Advanced</option>
                                    </select>
                                </div>
                                <div>
                                    <button
                                        onClick={() => setLevel(25)}
                                        className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mr-2"
                                    >
                                        Low
                                    </button>
                                    <button
                                        onClick={() => setLevel(50)}
                                        className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mr-2"
                                    >
                                        Medium
                                    </button>
                                    <button
                                        onClick={() => setLevel(75)}
                                        className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                                    >
                                        High
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="mt-4 flex justify-between">
                    {currentStep > 0 && (
                        <button
                            onClick={handlePrev}
                            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                        >
                            Previous
                        </button>
                    )}
                    {currentStep < steps.length - 1 && (
                        <button
                            onClick={handleNext}
                            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                        >
                            Next
                        </button>
                    )}
                    {currentStep === steps.length - 1 && (
                        <button className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded">
                            Submit
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StepperComponent;
