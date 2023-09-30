import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  Cell,
  ResponsiveContainer,
  Label,
  LabelList,
} from "recharts";

// import "./Dashboard.css";
import CardContainer from "./CardContainer";
// import cardLists from "./Mockcard";
// import _mockChartData from "./_mockChartData.json";

import PersonIcon from "@mui/icons-material/Person";
import GroupsIcon from '@mui/icons-material/Groups';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import { useDispatch, useSelector } from "react-redux";
import { loadInstitutionStats } from "../../../redux/action";



const AdminDashboard = () => {

  const [cardLists,setCardsList] = useState([
    {
      cardContent: "Number of students enrolled",
      cardValue: 0,
      icon: <PersonIcon style={{ color: "white",fontSize: 40  }}/>, 
    },
    {
      cardContent: "Interview Conducted",
      cardValue: 0,
      icon: <GroupsIcon style={{ color: "white",fontSize: 40 }}/>, 
    },
    {
      cardContent: "Improvement areas Identified",
      cardValue: 0,
      icon: <NorthEastIcon style={{ color: "white",fontSize: 40 }}/>, 
    },
    {
      cardContent: "Average Interview Score",
      cardValue: 0,
      icon: <NorthEastIcon style={{ color: "white",fontSize: 40 }}/>, 
    },
    {
      cardContent: "Skill Gap rate",
      cardValue: 0,
      icon: <NorthEastIcon style={{ color: "white",fontSize: 40 }}/>, 
    },
  ]);

  const [barPlot,setbarPlot] = useState([]);
  const [plot,setplot] = useState([]);
  const [pie,setPie] = useState([]);

  const dispatch = useDispatch();
  const {institutionStats} = useSelector((state)=>state?.data)



  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  useEffect(()=>{
    dispatch(loadInstitutionStats());
  },[dispatch])

  useEffect(()=>{
    console.log(institutionStats,"institutionStats")
    if(institutionStats?.cards?.length)
    {
      setCardsList(()=>institutionStats?.cards?.map(o=>({
        cardContent: o?.name,
        cardValue: o?.value,
        icon: <PersonIcon style={{ color: "white",fontSize: 40  }}/>, 
        subValues:o?.sub_values
      })))
    }
    if(institutionStats?.graphs)
    {

      institutionStats?.graphs?.map((o)=>{
        switch(o?.name)
        {
          case "Department wise Participation": {
            setbarPlot(()=>o?.data)
            break
          }
          case "DEPARTMENT WISE IMPROVEMENT RATE" : {
            setplot(()=>o?.data)
            break
          }
          case "CRITICAL IMPROVEMENT AREAS" : {
            setPie(()=>o?.data)
            break
          }

          default : break
        }

      })

    }
  },[institutionStats])



  return (
    <div className=" h-[100vh] p-4 pb-16 overflow-y-scroll ">
      <div className="container ">
          {/* Card section */}
          <div className="">
        <div className=" grid grid-cols-3 gap-2 ">
            {cardLists.length ? (
              <CardContainer cardLists={cardLists} />
            ) : null}
          </div>
        </div>
        <div className="flex flex-wrap pt-5">
          {/* Chart section */}
          <div className="lg:w-4/12 pr-4">
            {/* Department wise Participation */}
            <div className="bg-white shadow-md p-4 mb-4">
              <div className="mb-4">
                <span className="text-lg font-normal">
                  Department wise Participation
                </span>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barPlot}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Participated" fill="#82ca9d" />
                    <Bar dataKey="Not yet Participated" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          <div className="lg:w-4/12 pr-4">
            {/* Department wise Improvement Rate */}
            <div className="bg-white shadow-md p-4 mb-4">
              <div className="mb-4">
                <span className="text-lg font-normal">
                  Department wise Improvement Rate
                </span>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={plot}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="basic" dataKey="Marketing" stroke="green" />
                    <Line type="basic" dataKey="Finance" stroke="blue" />
                    <Line type="basic" dataKey="Operations" stroke="purple" />
                    <Line type="basic" dataKey="Hr" stroke="red" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          <div className="lg:w-4/12">
            {/* Critical Improvement Areas */}
            <div className="bg-white shadow-md p-4 mb-4">
              <div className="mb-4">
                <span className="text-lg font-normal">
                  Critical Improvement Areas
                </span>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Legend
                      layout="horizontal"
                      verticalAlign="bottom"
                      align="center"
                    />
                    <Pie
                      dataKey="value"
                      data={pie}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      label
                    >
                      {pie.map((entry, index) => (<>
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      </>
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
