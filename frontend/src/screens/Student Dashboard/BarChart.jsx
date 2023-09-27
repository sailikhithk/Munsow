import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const interviewData = [
  { score: 90 },
  { score: 80 },
  { score: 70 },
  { score: 95 },
  { score: 85 },
  { score: 75 },
  // Add more interview data as needed
];

const LineChartComponent = () => {
  // Add serial numbers to the data
  const dataWithSerialNumbers = interviewData.map((item, index) => ({
    score: item.score,
    serialNumber: index + 1,
  }));

  const [data, setData] = useState(dataWithSerialNumbers);
  const [sortBy, setSortBy] = useState('serialNumber'); // Initial sort by serialNumber
  const [filterBy, setFilterBy] = useState('');
  const [showLast, setShowLast] = useState(10); // Default to show last 10 data points

  const handleSortChange = (e) => {
    const newSortBy = e.target.value;
    setSortBy(newSortBy);
    const sortedData = [...data].sort((a, b) => {
      return newSortBy === 'score' ? b.score - a.score : a.serialNumber - b.serialNumber;
    });
    setData(sortedData);
  };

  const handleFilterChange = (e) => {
    const newFilterBy = e.target.value;
    setFilterBy(newFilterBy);
    const filteredData = dataWithSerialNumbers.filter((item) =>
      item.score.toString().includes(newFilterBy)
    );
    setData(filteredData);
  };

  const handleShowLastChange = (e) => {
    const newShowLast = parseInt(e.target.value, 10);
    setShowLast(newShowLast);
    const slicedData = dataWithSerialNumbers.slice(-newShowLast);
    setData(slicedData);
  };

  return (
    <div>
      <div className="flex justify-center filter-sort pb-4">

        <div className='pr-5'>
          <label className='text-gray-600 text-lg font-semibold text-opacity-80'>Sort by: </label>
          <select value={sortBy} onChange={handleSortChange}>
            <option value="serialNumber">S.No</option>
            <option value="score">Score</option>
          </select>
        </div>

        <div className='pr-5'>
          <label className='text-gray-600 text-lg font-semibold text-opacity-80'>Filter by Score: </label>
          <input
            type="text"
            placeholder="Enter score"
            value={filterBy}
            onChange={handleFilterChange}
            style={{ width: '85px' }}
          />
        </div>

        <div>
          <label className='text-gray-600 text-lg font-semibold text-opacity-80'>Show last: </label>
          <input
            type="number"
            min="1"
            max={dataWithSerialNumbers.length}
            placeholder="Number of data points"
            value={showLast}
            onChange={handleShowLastChange}
            style={{ width: '40px' }}
          />
        </div>

      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="serialNumber" />
          <YAxis dataKey="score" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="score" name="Score" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartComponent;
