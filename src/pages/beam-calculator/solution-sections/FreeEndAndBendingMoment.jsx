import React from "react";
import {
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
} from "recharts";
import PropTypes from "prop-types";
import { COLORS } from "../../../../tailwind.config";
import { v4 as uuidv4 } from "uuid";
import { MathJax } from "better-react-mathjax";
import { sprintf } from "sprintf-js";

const FreeMomentDiagram = ({ data }) => {
  return (
    <div>
      <h2 className="text-center">Free Moment Diagram</h2>
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
              value: "Moment (Nm)",
              angle: -90,
              position: "insideLeft",
            }}
            domain={["auto", "auto"]}
            allowDuplicatedCategory={false}
          />
          <Tooltip />

          {data?.map((d, i) => (
            <Area
              key={i}
              data={d?.points}
              type={d?.type}
              dataKey="moment"
              stroke={COLORS["secondary-2"]}
              fill={COLORS["secondary-2"]}
              dot={{ r: 3 }}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

FreeMomentDiagram.propTypes = {
  data: PropTypes.array,
};

const EndMomentDiagram = ({ data }) => {
  return (
    <div>
      <h2 className="text-center">End Moment Diagram</h2>
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
              value: "Moment (Nm)",
              angle: -90,
              position: "insideLeft",
            }}
            domain={["auto", "auto"]}
            allowDuplicatedCategory={false}
          />
          <Tooltip />

            <Area
              data={data}
              type="linear"
              dataKey="moment"
              stroke={COLORS["secondary-2"]}
              fill={COLORS["secondary-2"]}
              dot={{ r: 3 }}
            />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

EndMomentDiagram.propTypes = {
  data: PropTypes.array,
};

const BendingMomentDiagram = ({ endMomentData1, freeMomentData }) => {
  return (
    <div>
      <h2 className="text-center">Bending Moment Diagram</h2>
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
              value: "Moment (Nm)",
              angle: -90,
              position: "insideLeft",
            }}
            domain={["auto", "auto"]}
            allowDuplicatedCategory={false}
          />
          <Tooltip />
          {freeMomentData?.map((d, i) => (
            <Area
              key={i}
              data={d?.points}
              type={d?.type}
              dataKey="moment"
              stroke={COLORS["secondary-2"]}
              fill={COLORS["secondary-2"]}
              dot={{ r: 3 }}
            />
          ))}
          <Area
            data={endMomentData1}
            type="linear"
            dataKey="moment"
            stroke={COLORS["secondary-2"]}
            fill={COLORS["secondary-2"]}
            dot={{ r: 3 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

BendingMomentDiagram.propTypes = {
  endMomentData1: PropTypes.array,
  freeMomentData: PropTypes.array,
};

export default function FreeEndAndBendingMoment({ solutionAnalysis }) {
  const { freeMoments, freeMomentsDiagram, endMomentsDiagram } =
    solutionAnalysis;

  return (
    <>
      <h2 className="text-secondary text-lg sm:text-2xl italic font-semibold leading-[normal] font-inter">
        (Step 6). Find Bending Moment Diagram using Free And End Moments:
      </h2>
      {freeMoments?.map((el) => {
        return (
          <div key={uuidv4()} className="space-y-4">
            <h3 className="text-secondary text-base italic font-semibold leading-[normal] font-inter">
              Free Moment For Span {el?.name}
            </h3>
            {el?.steps?.map((step) => (
              <MathJax key={uuidv4()}>{step}</MathJax>
            ))}
          </div>
        );
      })}
      <table className="table-auto w-full border-collapse border border-gray-300 rounded-lg">
        <thead className="bg-gray-200">
          <tr className="text-left text-gray-700">
            <th></th>
            {freeMoments?.map((el, ind) => (
              <>
                <th
                  key={el?.name + ind}
                  className="px-4 py-2 border border-gray-300 font-semibold"
                >
                  {el?.name}
                </th>
              </>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="even:bg-gray-100 odd:bg-white text-gray-800">
            <td>Free End Moments</td>
            {freeMoments?.map((el, ind) => (
              <>
                <td
                  key={el?.name + ind}
                  className="px-4 py-2 border border-gray-300"
                >
                  <MathJax>{sprintf("`%.2f Nm`", el?.fm)}</MathJax>
                </td>
              </>
            ))}
          </tr>
        </tbody>
      </table>
      <FreeMomentDiagram data={freeMomentsDiagram} />
      <EndMomentDiagram data={endMomentsDiagram} />
      <BendingMomentDiagram endMomentData1={endMomentsDiagram} freeMomentData={freeMomentsDiagram} />
    </>
  );
}

FreeEndAndBendingMoment.propTypes = {
  solutionAnalysis: PropTypes.object,
};
