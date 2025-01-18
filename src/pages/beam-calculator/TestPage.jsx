import React from "react";
import {
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Merged data for the entire chart
const data = [
  { distanceFromLeft: 0, areaMoment1: 25, lineMoment2: 0 },
  { distanceFromLeft: 2, areaMoment1: null, lineMoment2: 60 },
  { distanceFromLeft: 5, areaMoment1: 37, lineMoment2: 0 },
  { distanceFromLeft: 10, areaMoment1: 56.5, lineMoment2: null },
];

const MixedChart = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <ComposedChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="distanceFromLeft"
          label={{
            value: "Distance from Left (m)",
            position: "insideBottom",
            offset: -10,
          }}
        />
        <YAxis />
        <Tooltip />
        <Legend />

        {/* Triangular Area */}
        <Line
          type="linear"
          dataKey="areaMoment1"
          stroke="#8884d8"
          fill="#8884d8"
          name="Area Moment"
        />

        {/* Parabolic Line */}
        <Line
          type="monotone"
          dataKey="lineMoment2"
          stroke="#82ca9d"
          strokeWidth={2}
          name="Line Moment"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default MixedChart;
