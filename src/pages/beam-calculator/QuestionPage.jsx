import React from "react";
import { useSelector } from "react-redux";
import JsonFormatter from "react-json-formatter";
// import JSONFormatter from "json-formatter-js";

const jsonStyle = {
  propertyStyle: { color: "#4a4a4a" }, // Neutral gray for property names
  stringStyle: { color: "#4caf50" }, // Soft green for strings
  numberStyle: { color: "#ffa726" }, // Warm orange for numbers
  booleanStyle: { color: "#42a5f5" }, // Cool blue for booleans
  nullStyle: { color: "#9e9e9e", fontStyle: "italic" }, // Gray italic for null
  bracketStyle: { color: "#6d6d6d" }, // Dark gray for brackets
};

export default function QuestionPage() {
  const { beamProperties } = useSelector((state) => state.beam);

  return (
    <JsonFormatter json={beamProperties} tabWith={4} jsonStyle={jsonStyle} />
  );
}
