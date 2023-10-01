import { useState } from "react";
import { Cell, Pie, PieChart, Sector } from "recharts";
import SquareIcon from "@mui/icons-material/Square";
import { convertToCamelCase } from "../../utils/stringUtils";

const renderActiveShape = (props) => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
  } = props;
  return (
    <g>
      <text x={cx} y={cy} dy={0} textAnchor="middle" fill={fill}>
        {/* {payload?.percentage?.toFixed()}% */}
        {Math.round(payload?.percentage)}%
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius - 1}
        outerRadius={outerRadius + 5}
        fill={fill}
      />
    </g>
  );
};

const PieChartComp = (props) => {
  const { data, showLabel = false } = props;
  const [activeIndex, setActiveIndex] = useState(data?.findIndex((o) => o?.percentage > 0));

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  return (
    <div>
      <div className="flex justify-center">
        <PieChart 
        width={200} height={225}
        >
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape} // Assuming renderActiveShape is defined elsewhere
            data={data}
            cx="50%"
            cy="45%"
            innerRadius={35}
            outerRadius={75}
            fill="#8884d8"
            dataKey="percentage"
            onMouseEnter={onPieEnter}
            label={showLabel}
          >
            {data?.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </div>
      <div>
        <div className="flex gap-1 items-center justify-evenly">
          {data?.map((o, idx) => {
            return (
              <div className="flex ml-2 text-sm items-center gap-1 capitalize" key={idx}>
                <SquareIcon fontSize="smallest" sx={{ color: o.color }} />
                {convertToCamelCase(o.name)} - {o.percentage}%
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PieChartComp;
