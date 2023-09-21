import React from "react";
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
} from "recharts";

// import "./Dashboard.css";
import CardContainer from "./CardContainer";
// import cardLists from "./Mockcard";
// import _mockChartData from "./_mockChartData.json";

import PersonIcon from "@mui/icons-material/Person";
import GroupsIcon from '@mui/icons-material/Groups';
import NorthEastIcon from '@mui/icons-material/NorthEast';

const cardLists = [
  {
    cardContent: "# of students enrolled",
    cardValue: 600,
    icon: <PersonIcon style={{ color: "white",fontSize: 40  }}/>, 
  },
  {
    cardContent: "Interview Conducted",
    cardValue: 2230,
    icon: <GroupsIcon style={{ color: "white",fontSize: 40 }}/>, 
  },
  {
    cardContent: "Improvement areas Identified",
    cardValue: 5,
    icon: <NorthEastIcon style={{ color: "white",fontSize: 40 }}/>, 
  },
];

const _mockChartData=[
  {
    "name": "Page A",
    "uv": 4000,
    "pv": 2400,
    "amt": 2400
  },
  {
    "name": "Page B",
    "uv": 3000,
    "pv": 1398,
    "amt": 2210
  },
  {
    "name": "Page C",
    "uv": 2000,
    "pv": 9800,
    "amt": 2290
  },
  {
    "name": "Page D",
    "uv": 2780,
    "pv": 3908,
    "amt": 2000
  },
  {
    "name": "Page E",
    "uv": 1890,
    "pv": 4800,
    "amt": 2181
  },
  {
    "name": "Page F",
    "uv": 2390,
    "pv": 3800,
    "amt": 2500
  },
  {
    "name": "Page G",
    "uv": 3490,
    "pv": 4300,
    "amt": 2100
  }
]


const AdminDashboard = () => {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  const averageInterviewScore = "74/100";
  const skillGapRate = "23%";

  return (
    <div className="bg-[#FDFAF5] min-h-screen p-4">
      <div className="container mx-auto">
        <div className="flex flex-wrap">
          {/* Card section */}
          <div className="lg:w-9/12 lg:flex">
            {cardLists.length ? (
              <CardContainer cardLists={cardLists} />
            ) : null}
          </div>
          {/* Average Interview Score and Skill Gap Rate Card */}
          <div className="lg:w-3/12 pl-4 ">
            <div className="bg-white shadow-md p-4 mb-4 rounded-lg">
              <div className="mb-2">
                <span className="text-lg font-normal">
                  Average Interview Score :{" "}
                </span>
                <span className="text-lg font-semibold">
                  {averageInterviewScore}
                </span>
              </div>
              <div>
                <span className="text-lg font-normal">Skill Gap Rate : </span>
                <span className="text-lg font-semibold">{skillGapRate}</span>
              </div>
            </div>
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
                  <BarChart data={_mockChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="pv" fill="#8884d8" />
                    <Bar dataKey="uv" fill="#82ca9d" />
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
                  <LineChart data={_mockChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="basic" dataKey="pv" stroke="#8884d8" />
                    <Line type="basic" dataKey="uv" stroke="red" />
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
                      data={[
                        { name: "Group A", value: 400 },
                        { name: "Group B", value: 300 },
                        { name: "Group C", value: 300 },
                        { name: "Group D", value: 200 },
                      ]}
                      cx="50%"
                      cy="40%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                    >
                      {_mockChartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
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
