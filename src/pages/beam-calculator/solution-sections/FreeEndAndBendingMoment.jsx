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
import { useMediaQuery } from "react-responsive";

const FreeMomentDiagram = ({ data }) => {
  const isMobile = useMediaQuery({ maxWidth: 640 });

  return (
    <div>
      <h2 className="text-center">Free Moment Diagram</h2>
      <div className="overflow-x-auto">
        <ResponsiveContainer width={isMobile ? "200%" : "100%"} height={325}>
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
    </div>
  );
};

FreeMomentDiagram.propTypes = {
  data: PropTypes.array,
};

const EndMomentDiagram = ({ data }) => {
  const isMobile = useMediaQuery({ maxWidth: 640 });

  return (
    <div>
      <h2 className="text-center">End Moment Diagram</h2>
      <div className="overflow-x-auto">
        <ResponsiveContainer width={isMobile ? "200%" : "100%"} height={325}>
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
    </div>
  );
};

EndMomentDiagram.propTypes = {
  data: PropTypes.array,
};

const BendingMomentDiagram = ({ endMomentData1, freeMomentData }) => {
  const isMobile = useMediaQuery({ maxWidth: 640 });

  return (
    <div>
      <h2 className="text-center">Bending Moment Diagram</h2>
      <div className="overflow-x-auto">
        <ResponsiveContainer width={isMobile ? "200%" : "100%"} height={325}>
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
      <h2 className="text-black text-2xl uppercase font-semibold leading-[normal]">
        Final Bending Moment Diagram using Free Moments And End Moments
      </h2>
      {freeMoments?.map((el) => {
        return (
          <div key={uuidv4()} className="space-y-4">
            <h3 className="text-black text-2xl uppercase font-semibold leading-[normal]">
              Free Moment For Span {el?.name}
            </h3>
            {el?.steps?.map((step) => (
              <MathJax
                key={uuidv4()}
                // className="text-black text-2xl uppercase font-semibold leading-[1.4rem] overflow-x-auto overflow-y-hidden"
                className="text-xs sm:text-sm md:text-base font-poppins overflow-x-auto overflow-y-hidden"
              >
                {step}
              </MathJax>
            ))}
          </div>
        );
      })}

      <FreeMomentDiagram data={freeMomentsDiagram} />
      <EndMomentDiagram data={endMomentsDiagram} />
      <BendingMomentDiagram
        endMomentData1={endMomentsDiagram}
        freeMomentData={freeMomentsDiagram}
      />
    </>
  );
}

FreeEndAndBendingMoment.propTypes = {
  solutionAnalysis: PropTypes.object,
};
