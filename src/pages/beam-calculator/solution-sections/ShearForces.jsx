import React, { useMemo } from "react";
import {
  AreaChart,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  ReferenceArea,
  Area
} from "recharts";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import { MathJax } from "better-react-mathjax";
import { COLORS } from "../../../../tailwind.config";


const ShearForceDiagram = ({ data }) => {
  return (
    <div>
      <h2 className="text-center">Shear Force Diagram</h2>
      <ResponsiveContainer width="100%" height={325}>
        <AreaChart
          width="100%"
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="distanceFromLeft"
            label={{
              value: "Distance from Left (m)",
              position: "insideBottom",
              offset: -10,
            }}
            allowDuplicatedCategory={false}
          />
          <YAxis
            label={{
              value: "Shear Force (N)",
              angle: -90,
              position: "insideLeft",
            }}
            domain={["auto", "auto"]}
            allowDuplicatedCategory={false}
          />
          <Tooltip />
          {data?.map((d, i) => (
            <Area
              data={d.points}
              key={i}
              type={d?.type || "monotone"}
              dataKey="force"
              stroke={COLORS["secondary-2"]}
              fill={COLORS["secondary"]}
              // dot={{ r: 3 }}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

ShearForceDiagram.propTypes = {
  data: PropTypes.array,
};

function ShearForces({ solutionAnalysis }) {
  const {shearForceDiagramPoints} = solutionAnalysis
  console.log('shearForceDiagramPoints',shearForceDiagramPoints);

  return (
    <>
      <h2 className="text-secondary text-lg sm:text-2xl italic font-semibold leading-[normal] font-inter">
        (Step 5). Find shear forces
      </h2>
      <div className="space-y-4">
        {solutionAnalysis?.shearForces?.map((el) => {
          return (
            <div key={uuidv4()} className="space-y-2">
              {el?.steps?.map((step) => (
                <>
                  <MathJax key={uuidv4()}>{step}</MathJax>
                </>
              ))}
            </div>
          );
        })}
      </div>
      <ShearForceDiagram data={shearForceDiagramPoints} />
    </>
  );
}

ShearForces.propTypes = {
  solutionAnalysis: PropTypes.object,
};

export default ShearForces;
