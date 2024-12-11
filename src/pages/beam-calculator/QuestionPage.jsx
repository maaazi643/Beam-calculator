import React, { useRef } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import {
  BeamIcon,
  SinglePointLoadIcon,
  UniformDistributedLoadIcon,
  VaryingDistributedLoadIcon,
  PinnedSupportIcon,
  RollerSupportIcon,
  FixedSupportIcon,
} from "../../icons/Properties";
import { AnimatePresence, motion } from "framer-motion";
import {
  getLoadPositionAndDimension,
  loadingEnums,
  getSupportPositionAndDimension,
  supportEnums,
} from "../../store/beam-utils";
import { beamActions } from "../../store/beam";
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
        bigToSmall={load?.openingValue > load?.closingValue}
      />
    );
  }
};

LoadIcon.propTypes = {
  load: PropTypes.object.isRequired,
  beam: PropTypes.object.isRequired,
};

const SupportIcon = ({ support, beam, beamPixelLength }) => {
  const dim = getSupportPositionAndDimension(beam, support.id, beamPixelLength);
  const { top, left } = dim;

  if (support.type === supportEnums.pinned) {
    return (
      <PinnedSupportIcon
        key={support.id}
        style={{
          position: "absolute",
          left: `-${left}%`,
          top: `${top}%`,
        }}
      />
    );
  }
  if (support.type === supportEnums.roller) {
    return (
      <RollerSupportIcon
        key={support.id}
        style={{
          position: "absolute",
          left: `${left}%`,
          top: `${top}%`,
          // transform: `translate(-${left}%, 0)`,
        }}
      />
    );
  }
  if (support.type === supportEnums.fixed) {
    return (
      <FixedSupportIcon
        atStart={support.distanceFromLeft == 0}
        key={support.id}
        style={{
          position: "absolute",
          left: `${left}%`,
          top: `${top}%`,
          // transform: `translate(-${left}%, 0)`,
        }}
      />
    );
  }
};

SupportIcon.propTypes = {
  support: PropTypes.object.isRequired,
  beam: PropTypes.object.isRequired,
  beamPixelLength: PropTypes.number.isRequired,
};

export default function QuestionPage() {
  const dispatch = useDispatch();
  const { beamProperties, beamPixelLength } = useSelector(
    (state) => state.beam
  );
  const canShowBeam = beamProperties.spans.length > 0;
  const containerHeight = 325;

  const setBeamPixelLength = (length) => {
    dispatch(beamActions.set({ key: "beamPixelLength", value: length }));
  };

  console.log("beamPixelLength", beamPixelLength);

  return (
    <AnimatePresence>
      {canShowBeam && (
        <motion.div
          className="w-full relative"
          style={{ height: containerHeight }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <BeamIcon
            className="absolute top-1/2"
            setBeamPixelLength={setBeamPixelLength}
          />
          {beamProperties?.loadings?.map((load) => (
            <LoadIcon load={load} beam={beamProperties} key={load.id} />
          ))}
          {beamProperties?.supports?.map((support) => (
            <SupportIcon
              support={support}
              beam={beamProperties}
              beamPixelLength={beamPixelLength}
              key={support.id}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
