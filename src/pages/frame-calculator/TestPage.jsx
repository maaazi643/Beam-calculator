import React from 'react'
import {
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
} from "recharts";
import PropTypes from 'prop-types'
import { COLORS } from '../../../tailwind.config';

const ShearForceDiagramQ1 = ({ data }) => {
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

          <Area
            data={[
              { distanceFromLeft: 0, shearForce: 0 },
              { distanceFromLeft: 2, shearForce: 60 },
              { distanceFromLeft: 5, shearForce: 0 },
            ]}
            type="linear"
            dataKey="shearForce"
            stroke={COLORS["secondary-2"]}
            fill={COLORS["secondary-2"]}
            dot={{ r: 3 }}
          />

          <Area
            data={[
              { distanceFromLeft: 5, shearForce: 0 },
              { distanceFromLeft: 7.5, shearForce: 75 },
              { distanceFromLeft: 10, shearForce: 0 },
            ]}
            type="monotone"
            dataKey="shearForce"
            stroke={COLORS["secondary-2"]}
            fill={COLORS["secondary-2"]}
            dot={{ r: 3 }}
          />

          <Area
            data={[
              { distanceFromLeft: 0, shearForce: 29.5 },
              { distanceFromLeft: 5, shearForce: 37.5 },
              { distanceFromLeft: 10, shearForce: 56.5 },
            ]}
            type="monotone"
            dataKey="shearForce"
            stroke={COLORS["secondary-2"]}
            fill={COLORS["secondary-2"]}
            dot={{ r: 3 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

ShearForceDiagramQ1.propTypes = {
  data: PropTypes.array,
};

const ShearForceDiagramQ2 = ({ data }) => {
  return (
    <div>
      <h2 className="text-center">Shear Force Diagram</h2>
      <ResponsiveContainer width="100%" height={325}>
        <AreaChart
          width="100%"
          // data={data}
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

          <Area
            data={[
              { distanceFromLeft: 0, shearForce: 0 },
              { distanceFromLeft: 0, shearForce: 8.31 },
            ]}
            type="monotone"
            dataKey="shearForce"
            stroke={COLORS["secondary-2"]}
            dot={{ r: 3 }}
          />
          <Area
            data={[
              { distanceFromLeft: 0, shearForce: 8.31 },
              { distanceFromLeft: 2, shearForce: 8.31 },
            ]}
            type="monotone"
            dataKey="shearForce"
            stroke={COLORS["secondary-2"]}
            dot={{ r: 3 }}
          />
          <Area
            data={[
              { distanceFromLeft: 2, shearForce: 8.31 },
              { distanceFromLeft: 2, shearForce: -11.69 },
            ]}
            type="monotone"
            dataKey="shearForce"
            stroke={COLORS["secondary-2"]}
            dot={{ r: 3 }}
          />
          <Area
            data={[
              { distanceFromLeft: 2, shearForce: -11.69 },
              { distanceFromLeft: 4, shearForce: -11.69 },
            ]}
            type="monotone"
            dataKey="shearForce"
            stroke={COLORS["secondary-2"]}
            dot={{ r: 3 }}
          />
          <Area
            data={[
              { distanceFromLeft: 4, shearForce: -11.69 },
              { distanceFromLeft: 4, shearForce: 14.9 },
            ]}
            type="monotone"
            dataKey="shearForce"
            stroke={COLORS["secondary-2"]}
            dot={{ r: 3 }}
          />
          <Area
            data={[
              { distanceFromLeft: 4, shearForce: 14.9 },
              { distanceFromLeft: 6, shearForce: 14.9 },
            ]}
            type="monotone"
            dataKey="shearForce"
            stroke={COLORS["secondary-2"]}
            dot={{ r: 3 }}
          />
          <Area
            data={[
              { distanceFromLeft: 6, shearForce: 14.9 },
              { distanceFromLeft: 6, shearForce: -10.09 },
            ]}
            type="monotone"
            dataKey="shearForce"
            stroke={COLORS["secondary-2"]}
            dot={{ r: 3 }}
          />
          <Area
            data={[
              { distanceFromLeft: 6, shearForce: -10.09 },
              { distanceFromLeft: 9, shearForce: -10.09 },
            ]}
            type="monotone"
            dataKey="shearForce"
            stroke={COLORS["secondary-2"]}
            dot={{ r: 3 }}
          />
          <Area
            data={[
              { distanceFromLeft: 9, shearForce: -10.09 },
              { distanceFromLeft: 9, shearForce: 23.6 },
            ]}
            type="monotone"
            dataKey="shearForce"
            stroke={COLORS["secondary-2"]}
            dot={{ r: 3 }}
          />
          <Area
            data={[
              { distanceFromLeft: 9, shearForce: 23.6 },
              { distanceFromLeft: 13, shearForce: -24.4 },
            ]}
            type="basisOpen"
            dataKey="shearForce"
            stroke={COLORS["secondary-2"]}
            dot={{ r: 3 }}
          />
          <Area
            data={[
              { distanceFromLeft: 13, shearForce: -24.4 },
              { distanceFromLeft: 13, shearForce: 0 },
            ]}
            type="monotone"
            dataKey="shearForce"
            stroke={COLORS["secondary-2"]}
            dot={{ r: 3 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

ShearForceDiagramQ2.propTypes = {
  data: PropTypes.array,
};

function TestPage(props) {

  return (
    <div>
      <ShearForceDiagramQ1/>
      {/* <ShearForceDiagramQ2/> */}
    </div>
  )
}

TestPage.propTypes = {}

export default TestPage
