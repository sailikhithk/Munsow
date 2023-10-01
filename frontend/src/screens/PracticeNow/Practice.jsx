import { Autocomplete, Divider, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import Stepper from "react-stepper-horizontal";
import ComputerRoundedIcon from '@mui/icons-material/ComputerRounded';
import CheckboxesTags from "../../Components/MatSelect";
import { useDispatch, useSelector } from "react-redux";
import { loadCompaniesList, loadHardSkillsList, loadInterviewRolesList, loadSoftSkillsList } from "../../redux/action";

const StepperComponent = () => {
    const dispatch = useDispatch();
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

    const { hardSkillsList, softSkillsList, interviewRolesList, companiesList } = useSelector(state => state?.data)

    useEffect(() => {
        dispatch(loadHardSkillsList());
        dispatch(loadSoftSkillsList());
        dispatch(loadInterviewRolesList());
        dispatch(loadCompaniesList());
    }, [dispatch])

    return (
        <div className="p-10">
            <div className="w-full mx-auto bg-white rounded-xl">
                <p className="p-5 text-xl font-semibold">Practice</p>
                <Divider />
                <Stepper steps={steps} activeStep={currentStep} activeColor={"red"} completeColor={"#886CC0"} completeBorderColor={"#886CC0"} size={40}/>
                <Divider style={{marginTop: "1rem"}}/>
                <div className="flex mt-4 p-4 items-center justify-center">
                    {currentStep === 0 && (
                        <div className="">
                            <h2 className="text-xl font-semibold mb-2 text-purple-500">Skill Specific</h2>
                            <div className="text-sm font-semibold text-gray-500 mb-4">Choose your mock interview</div>
                            <div className="">
                                <label className="flex items-center space-x-2 my-3">
                                    <input
                                        type="checkbox"
                                        name="hardSkills"
                                        checked={hardSkills}
                                        className="h-5 w-5 rounded border-gray-300 text-purple-500 focus:ring-purple-500"
                                        onChange={() => setHardSkills(!hardSkills)}
                                    />
                                    <span className="font-bold pr-2">Hard Skills</span>
                                </label>
                                <CheckboxesTags 
                                options={hardSkillsList?.map((o) => {
                                    return {
                                        label: o.name,
                                        id: o.id,
                                    }
                                })} 
                                label="Hard Skills"/>
                            </div>
                            <div>
                                <label className="flex items-center space-x-2 my-3">
                                    <input
                                        type="checkbox"
                                        name="softSkills"
                                        checked={softSkills}
                                        className="h-5 w-5 rounded border-gray-300 text-purple-500 focus:ring-purple-500"
                                        onChange={() => setSoftSkills(!softSkills)}
                                    />
                                    <span className="font-bold pr-2">Soft Skills</span>
                                </label>
                                <CheckboxesTags 
                                options={softSkillsList?.map((o) => {
                                    return {
                                        label: o.name,
                                        id: o.id,
                                    }
                                })} 
                                label="Soft Skills"/>
                            </div>
                        </div>
                    )}
                    {currentStep === 1 && (
                        <div>
                            <h2 className="text-xl font-semibold mb-2 text-purple-500">Role Specific</h2>
                            <div className="text-sm font-semibold text-gray-500 mb-4">Choose your mock interview</div>
                            <div>
                                <label className="flex items-center space-x-2 my-3">
                                    <input
                                        type="checkbox"
                                        name="chosenRole"
                                        checked={chosenRole}
                                        className="h-5 w-5 rounded border-gray-300 text-purple-500 focus:ring-purple-500"
                                        onChange={() => setChosenRole(!chosenRole)}
                                    />
                                    
                                    <span className="font-bold pr-2">Choose Role</span>
                                </label>
                                <CheckboxesTags 
                                options={interviewRolesList?.map((o) => {
                                    return {
                                        label: o.name,
                                        id: o.id,
                                    }
                                })} 
                                label="Interview Roles"/>
                            </div>
                            <div>
                                <label className="flex items-center space-x-2 my-3">
                                    <input
                                        type="checkbox"
                                        name="chosenCompany"
                                        checked={chosenCompany}
                                        className="h-5 w-5 rounded border-gray-300 text-purple-500 focus:ring-purple-500"
                                        onChange={() => setChosenCompany(!chosenCompany)}
                                    />
                                    
                                    <span className="font-bold pr-2">Choose Company</span>
                                </label>
                                <CheckboxesTags 
                                options={companiesList?.map((o) => {
                                    return {
                                        label: o.name,
                                        id: o.id,
                                    }
                                })} 
                                label="Companies"/>
                            </div>
                        </div>
                    )}
                    {currentStep === 2 && (
                        <div>
                            <h2 className="text-center text-xl font-semibold mb-2 text-purple-600">Level</h2>
                            <div className="m-3 w-96 border-4 rounded-2xl py-6 px-7 border-purple-300">
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={level}
                                    onChange={(e) => setLevel(e.target.value)}
                                    className="w-full mb-4 appearance-none h-2 rounded-lg"
                                    style={{ background: "#f3f0f9" }}
                                />

                                <div className="flex justify-evenly text-sm">
                                    <button
                                        onClick={() => setLevel(25)}
                                        className="bg-green-500 hover:bg-green-700 text-white  py-1 px-3 rounded-md"
                                    >
                                        Low
                                    </button>
                                    <button
                                        onClick={() => setLevel(50)}
                                        className="bg-yellow-500 hover:bg-yellow-700 text-white py-1 px-3 rounded-md"
                                    >
                                        Medium
                                    </button>
                                    <button
                                        onClick={() => setLevel(100)}
                                        className="bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded-md"
                                    >
                                        High
                                    </button>
                                </div>
                            </div>
                            <div className="text-center font-semibold">Or</div>
                            <h2 className="text-center text-sm font-semibold mb-2 text-purple-600">Choose your Experience level</h2>
                            <div className="flex justify-between items-center">
                                {/* <div>
                                    <select
                                        className="border rounded p-1"
                                        value={experienceLevel}
                                        onChange={(e) => setExperienceLevel(e.target.value)}
                                    >
                                        <option value="Beginner">Beginner</option>
                                        <option value="Intermediate">Intermediate</option>
                                        <option value="Advanced">Advanced</option>
                                    </select>
                                </div> */}

                                <Autocomplete
                                size="small"
                                fullWidth
                                disablePortal
                                value={experienceLevel}
                                defaultValue={experienceLevel}
                                id="combo-box-demo"
                                options={[
                                    { label: "Beginner", value: "Beginner" },
                                    { label: "Intermediate", value: "Intermediate" },
                                    { label: "Advanced",   value: "Advanced" },
                                  ]}
                                renderInput={(params) => (
                                    <TextField
                                    {...params} 
                                    // label={o?.label} 
                                    InputProps={{
                                    ...params.InputProps,
                                    style: {
                                        borderRadius: "0.4rem",
                                    },
                                    }}
                                    />
                                )}
                                onChange={(e, value) => { setExperienceLevel(value) }}
                                />
                            </div>
                        </div>
                    )}
                    {currentStep == 3 && (
                        <div>
                            <div className="text-center font-semibold text-gray-500 mb-4">
                                <ComputerRoundedIcon sx={{fontSize: "5rem"}}/>
                            </div>
                            <h2 className="text-center text-2xl font-semibold mb-3 text-purple-600">System Checks</h2>
                            <div className="text-sm max-w-xs text-center font-semibold text-gray-500 mb-4">Please complete this 3 minutes walk through to confirm your device/system is ready for a Validity test.</div>
                            <label className="max-w-xs flex space-x-3 my-3">
                                <input
                                    type="checkbox"
                                    name="chosenCompany"
                                    checked={chosenCompany}
                                    className="mt-0.5 h-5 w-5 rounded border-gray-300 text-purple-500 focus:ring-purple-500"
                                    onChange={() => setChosenCompany(!chosenCompany)}
                                />
                                
                                <span className="ml-3 text-sm">I&apos;m completing this check on this device and Wi-Fi network where I will participate</span>
                            </label>
                        </div>
                    )}
                </div>
                <div className="mt-4 p-6 flex justify-end">
                    {currentStep > 0 && (
                        <button
                            onClick={handlePrev}
                            className="bg-blue-500 mx-2 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
                        >
                            Previous
                        </button>
                    )}
                    {currentStep < steps.length - 1 && (
                        <button
                            onClick={handleNext}
                            className="bg-blue-500 mx-2 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
                        >
                            Next
                        </button>
                    )}
                    {currentStep === steps.length - 1 && (
                        <button className="bg-green-500 mx-2 hover:bg-green-700 text-white py-2 px-4 rounded-md">
                            Submit
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StepperComponent;
