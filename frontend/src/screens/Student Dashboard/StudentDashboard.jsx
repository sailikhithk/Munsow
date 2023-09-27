import React from "react";
import image from "../../assets/images-computer-girl.png"
import SecondRow from "./SecondRow";
import BarChartLines from "./BarChart";
import Carousel from "./Carousel";
import { useNavigate } from "react-router-dom";

export default function StudentDashboard() {

    const navigate = useNavigate();

    const navigateRoute = () => {
        navigate("/report")
      };

    return (<div>
        <div className="grid grid-cols-2 gap-7 px-14 py-4" style={{ "grid-template-columns": "60% 35%" }} >
            <div className="col-span-1 ">
                <div className="bg-[#824bef] p-10 flex justify-between rounded-lg">
                    <div className="text-white">
                        <p className="text-3xl color-">Hello</p>
                        <p className="text-3xl pt-1">Apritha!!!</p>
                        <p className="text-lg pt-2">Are you ready for your next interview?</p>
                        <div className="flex space-x-4 pt-5">
                            <button className="bg-white hover:bg-gray-100 text-[#824bef] font-semibold py-2 px-4 border border-gray-300 rounded-lg shadow">
                                Practice Now
                            </button>
                            <button className=" text-white font-semibold py-2 px-4 border rounded-lg shadow" onClick={()=>{navigateRoute()}}>
                                View My Reports
                            </button>
                        </div>
                    </div>
                    <div>
                        <img className="h-40 w-40" src={image} />
                    </div>

                </div>
            </div>
            <div className="col-span-1" >
                <div>
                    <p className="text-gray-600 text-lg font-semibold text-opacity-80 pb-2">Hard Skill vs Soft Skill Trend</p>
                    <SecondRow />
                </div>
            </div>
            <div className="col-span-1">
                <div className="bg-white p-10 rounded-lg">
                    <BarChartLines />
                </div>
            </div>
            <div className="col-span-1">
                <p className="text-gray-500 text-md pb-2">Hard Skill vs Soft Skill Trend</p>
                <div className="bg-white p-2 rounded-lg">
                <p className="text-gray-500 text-lg font-bold p-2">Emotinal Insight</p>
                    <Carousel />
                </div>
            </div>
        </div>
    </div>);
}
