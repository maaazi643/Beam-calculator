import React, { useRef } from "react";
// import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
// import {
//   BeamIcon,
//   SinglePointLoadIcon,
//   UniformDistributedLoadIcon,
//   VaryingDistributedLoadIcon,
//   PinnedSupportIcon,
//   RollerSupportIcon,
//   FixedSupportIcon,
//   DimensionMark,
//   FlexuralRigidityMark,
//   LoadingMark,
//   FullDimensionMark,
// } from "../../icons/Properties";
import { AnimatePresence, motion } from "framer-motion";
// import {
//   getLoadPositionAndDimension,
//   loadingEnums,
//   getSupportPositionAndDimension,
//   supportEnums,
//   getDimensionMarkings,
//   getFlexuralRigidityMarkings,
//   getLoadMarkings,
//   getBeamTotalLength,
// } from "../../store/beam-utils";
// import { beamActions } from "../../store/beam";
// import EngineeringIcon from "@mui/icons-material/Engineering";
// import { isBeamEmpty } from "../../store/beam";
// import JSONFormatter from "json-formatter-js";
import JsonFormatter from "react-json-formatter";

const darkTheme = {
  propertyStyle: { color: "#4a4a4a" }, // Neutral gray for property names
  stringStyle: { color: "#4caf50" }, // Soft green for strings
  numberStyle: { color: "#ffa726" }, // Warm orange for numbers
  booleanStyle: { color: "#42a5f5" }, // Cool blue for booleans
  nullStyle: { color: "#9e9e9e", fontStyle: "italic" }, // Gray italic for null
  bracketStyle: { color: "#6d6d6d" }, // Dark gray for brackets
};

export default function QuestionPage() {
  const dispatch = useDispatch();
  const { frameProperties } = useSelector((state) => state.frame);

  return (
    <AnimatePresence>
      <JsonFormatter json={frameProperties} tabWith={2} jsonStyle={darkTheme} />
    </AnimatePresence>
  );
}
