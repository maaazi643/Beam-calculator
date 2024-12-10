import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import JsonFormatter from "react-json-formatter";
import {
  BeamIcon,
  SinglePointLoadIcon,
  UniformDistributedLoadIcon,
  VaryingDistributedLoadIcon,
} from "../../icons/Properties";
import { AnimatePresence, motion, transform } from "framer-motion";
import {
  getLoadPositionAndDimension,
  loadingEnums,
} from "../../store/beam-utils";
import { head } from "motion/react-client";
// import JSONFormatter from "json-formatter-js";

// const jsonStyle = {
//   propertyStyle: { color: "#4a4a4a" }, // Neutral gray for property names
//   stringStyle: { color: "#4caf50" }, // Soft green for strings
//   numberStyle: { color: "#ffa726" }, // Warm orange for numbers
//   booleanStyle: { color: "#42a5f5" }, // Cool blue for booleans
//   nullStyle: { color: "#9e9e9e", fontStyle: "italic" }, // Gray italic for null
//   bracketStyle: { color: "#6d6d6d" }, // Dark gray for brackets
// };

const LoadIcon = ({ load, beam }) => {
  console.log(load);
  const dim = getLoadPositionAndDimension(beam, load.id);
  const { top, left, width, height } = dim;
  if (load.type === loadingEnums.single) {
    return (
      <SinglePointLoadIcon
        key={load.id}
        width={`${width}%`}
        height={`${height}%`}
        style={{
          position: "absolute",
          left: `${left}%`,
          top: `${top}%`,
          transform: `translate(-${left}%, 0)`,
        }}
      />
    );
  }
  if (load.type === loadingEnums.uniform) {
    return (
      <UniformDistributedLoadIcon
        key={load.id}
        width={`${width}%`}
        height={`${height}%`}
        style={{
          position: "absolute",
          left: `${left}%`,
          top: `${top}%`,
          transform: `translate(-${left}%, 0)`,
        }}
      />
    );
  }
  if (load.type === loadingEnums.varying) {
    return (
      <VaryingDistributedLoadIcon
        key={load.id}
        width={`${width}%`}
        height={`${height}%`}
        style={{
          position: "absolute",
          left: `${left}%`,
          top: `${top}%`,
          transform: `translate(-${left}%, 0)`,
        }}
      />
    );
  }
};

LoadIcon.propTypes = {
  load: PropTypes.object.isRequired,
  beam: PropTypes.object.isRequired,
};

export default function QuestionPage() {
  const { beamProperties } = useSelector((state) => state.beam);
  const canShowBeam = beamProperties.spans.length > 0;
  const containerHeight = 250;

  return (
    <AnimatePresence>
      {canShowBeam && (
        <motion.div
          className="w-full mt-14 border border-secondary relative"
          style={{ height: containerHeight }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <BeamIcon className="absolute top-1/2" />
          {beamProperties?.loadings?.map((load) => (
            <LoadIcon load={load} beam={beamProperties} key={load.id} />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
