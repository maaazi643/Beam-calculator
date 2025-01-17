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
  ReferenceArea
} from "recharts";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import { MathJax } from "better-react-mathjax";
import { COLORS } from "../../../../tailwind.config";


const ShearForceDiagram = ({ data }) => {
  const minX = Math.min(...data.map((d) => d.distanceFromLeft));
  const minY = Math.min(...data.map((d) => d.shearForce));
  const maxX = Math.max(...data.map((d) => d.distanceFromLeft));
  const maxY = Math.max(...data.map((d) => d.shearForce));
  return (
    <div>
      <h2 className="text-center">Shear Force Diagram</h2>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart
          width="100%"
          data={data}
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
            // domain={["dataMin", "dataMax"]}
            domain={["auto", "auto"]}
            allowDuplicatedCategory={false}
          />
          <Tooltip />
          <Line
            type="linear"
            dataKey="shearForce"
            stroke={COLORS["secondary-2"]}
            dot={{ r: 3 }}
          />
          {minY < 0 && (
            <ReferenceLine
              y={0}
              stroke={COLORS["secondary-2"]}
              strokeWidth={1.5}
              strokeOpacity={0.65}
            />
          )}
          {/* <ReferenceArea
            x1={minX}
            x2={0}
            y1={0}
            y2={maxY}
            fill="lightblue"
            opacity={0.3}
          />

          <ReferenceArea
            x1={0}
            x2={maxX}
            y1={minY}
            y2={0}
            fill="lightgreen"
            opacity={0.3}
          /> */}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

ShearForceDiagram.propTypes = {
  data: PropTypes.array,
};

function ShearForces({ solutionAnalysis }) {
  const shearForces = useMemo(() => {
    return solutionAnalysis?.shearForces?.map((el) => {
      return { ...el, shearForce: +el?.force?.toFixed(2) };
    });
  }, [solutionAnalysis?.shearForces]);

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
      <ShearForceDiagram data={shearForces} />
    </>
  );
}

ShearForces.propTypes = {
  solutionAnalysis: PropTypes.object,
};

export default ShearForces;
