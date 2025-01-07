import React from "react";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  Area,
  ResponsiveContainer,
} from "recharts";

const shearForceData = [
  { position: 0, shearForce: 0 },
  { position: 2, shearForce: 5 },
  { position: 5, shearForce: -10 },
  { position: 7, shearForce: -10 },
  { position: 10, shearForce: 0 },
];

const calculateBendingMoment = (shearForceData) => {
  let bendingMoment = 0;
  const bendingMomentData = [];

  for (let i = 0; i < shearForceData.length - 1; i++) {
    const x1 = shearForceData[i].position;
    const x2 = shearForceData[i + 1].position;
    const sf1 = shearForceData[i].shearForce;
    const sf2 = shearForceData[i + 1].shearForce;

    // Average shear force over the segment
    const avgShearForce = (sf1 + sf2) / 2;

    // Increment bending moment
    bendingMoment += avgShearForce * (x2 - x1);

    // Add to BMD data
    bendingMomentData.push({ position: x2, bendingMoment });
  }

  // Add the initial moment at position 0
  bendingMomentData.unshift({ position: 0, bendingMoment: 0 });

  return bendingMomentData;
};

const bendingMomentData = calculateBendingMoment(shearForceData);

const BendingMomentDiagram = () => {
  console.log(bendingMomentData);
  return (
    <LineChart
      width={600}
      height={300}
      data={bendingMomentData}
      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="position"
        type="number"
        label={{ value: "Position (m)", position: "insideBottom", offset: -10 }}
      />
      <YAxis
        domain={["auto", "auto"]}
        label={{
          value: "Bending Moment (kNm)",
          angle: -90,
          position: "insideLeft",
        }}
      />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="bendingMoment"
        stroke="#82ca9d"
        strokeWidth={2}
      />
      <Area
        type="monotone"
        dataKey="bendingMoment"
        stroke="#82ca9d"
        fill="lightgreen"
        fillOpacity={0.3}
      />
    </LineChart>
  );
};

export default function TestPage() {
  return (
    <>
      <LineChart
        width={730}
        height={550}
        margin={{ top: 100, right: 30, left: 20, bottom: 5 }}
        data={shearForceData}
        className=""
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="position"
          // type="number"
          label={{
            value: "Position (m)",
            position: "insideBottom",
            offset: -10,
          }}
        />
        <YAxis
          domain={[0, 0]}
          // type="number"
          label={{
            value: "Shear Force (kN)",
            angle: -90,
            position: "insideLeft",
          }}
        />
        <Tooltip />
        <Legend />
        <Area
          type="stepAfter"
          dataKey="shearForce"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.3}
        />

        <Line
          type="stepAfter"
          dataKey="shearForce"
          stroke="#8884d8"
          fill="#8884d8"
        />
      </LineChart>

      <BendingMomentDiagram />
    </>
  );
}

// import React from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
// } from "recharts";

// const shearForceData = [
//   { position: 0, shearForce: 0 },
//   { position: 2, shearForce: 5 },
//   { position: 5, shearForce: -10 },
//   { position: 7, shearForce: -10 },
//   { position: 10, shearForce: 0 },
// ];

// export default function TestPage() {
//   return (
//     <LineChart
//       width={600}
//       height={300}
//       data={shearForceData}
//       // margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
//     >
//       <CartesianGrid strokeDasharray="3 3" />
//       <XAxis
//         dataKey="position"
//         label={{ value: "Position (m)", position: "insideBottom", offset: -10 }}
//       />
//       <YAxis
//         label={{
//           value: "Shear Force (kN)",
//           angle: -90,
//           position: "insideLeft",
//         }}
//       />
//       <Tooltip />
//       <Legend />
//       <Line
//         type="stepAfter"
//         dataKey="shearForce"
//         stroke="#8884d8"
//         strokeWidth={2}
//       />
//     </LineChart>
//   );
// }
