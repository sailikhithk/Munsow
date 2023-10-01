import React, { useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import _mockChartData from "./_mockChartData.json";
import { useDispatch } from "react-redux";
import { loadEmotionStats } from "../../../../redux/action";

const EmotionSensing = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadEmotionStats());
  }, [])

  return (
    <div>
      {/* <div className=" bg-white p-10 m-10 rounded-xl">
        <div className="pb-5">
          <span className="text-2xl ">Emotion Sensing - </span><span className="text-lg">Time wise emotions</span>
        </div>
        <div >
          <ResponsiveContainer width="100%" height={520}>
            <LineChart
              data={_mockChartData}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="basic"
                dataKey="surprise"
                stroke="#AFDFEF"
                strokeWidth={2}
              />
              <Line
                type="basic"
                dataKey="disgust"
                stroke="#E1885E"
                strokeWidth={2}
              />
              <Line
                type="basic"
                dataKey="contempt"
                stroke="#6B2F6B"
                strokeWidth={2}
              />
              <Line
                type="basic"
                dataKey="happiness"
                stroke="#9F9A8F"
                strokeWidth={2}
              />
              <Line
                type="basic"
                dataKey="sadnesss"
                stroke="#669548"
                strokeWidth={2}
              />
              <Line
                type="basic"
                dataKey="anger"
                stroke="#596EF2"
                strokeWidth={2}
              />
              <Line
                type="basic"
                dataKey="fear"
                stroke="#000000"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div> */}

      <div className="bg-white p-4 rounded-lg">
        <div className="flex justify-between items-center border-b pb-2">
          <span className="font-semibold">Positive Emotions</span>
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={[]}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Marketing" stroke="green" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EmotionSensing;
