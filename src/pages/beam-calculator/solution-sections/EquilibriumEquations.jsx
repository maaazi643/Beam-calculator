import React from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import { MathJax } from "better-react-mathjax";
import { sprintf } from "sprintf-js";

function EquilibriumEquations({ solutionAnalysis }) {
  return (
    <>
      <h2 className="text-secondary text-2xl italic font-semibold leading-[normal] font-inter">
        (Step 3). Find All Equilibrium Equations
      </h2>
      {solutionAnalysis?.equilibriumEquations?.map((el, i) => {
        return (
          <div key={uuidv4()} className="flex gap-x-2">
            {el?.steps?.map((step) => (
              <>
                <span>{i + 1}. </span>
                <MathJax key={uuidv4()}>{step}</MathJax>
              </>
            ))}
          </div>
        );
      })}
      <h3 className="text-secondary text-base italic font-semibold leading-[normal] font-inter">
        Substituting Moment Equations
      </h3>
      {solutionAnalysis?.extraEquations?.map((el, i) => {
        return (
          <div key={uuidv4()} className="space-y-4">
            {el?.steps?.map((step) => (
              <>
                <MathJax key={uuidv4()}>{step}</MathJax>
              </>
            ))}
          </div>
        );
      })}
      <h3 className="text-secondary text-base italic font-semibold leading-[normal] font-inter">
        Solve the simultaneous equations
      </h3>
      {Object.values(solutionAnalysis?.slopeValuesMap)?.map((el) => {
        // {Object.values(solutionAnalysis?.slopeValuesMap)?.filter(el => +el?.value !== 0)?.map((el) => {
        return (
          <div key={uuidv4()} className="space-y-4">
            {el?.steps?.map((step) => (
              <MathJax key={uuidv4()}>{step}</MathJax>
            ))}
          </div>
        );
      })}
      {solutionAnalysis?.moments?.map((el) => {
        return (
          <div key={uuidv4()} className="space-y-4">
            {el?.steps?.map((step) => (
              <>
                <MathJax key={uuidv4()}>{step}</MathJax>
              </>
            ))}
          </div>
        );
      })}
      <table className="table-auto w-full border-collapse border border-gray-300 rounded-lg">
        <thead className="bg-gray-200">
          <tr className="text-left text-gray-700">
            <th></th>
            {solutionAnalysis?.moments?.map((el) => (
              <>
                <th
                  key={uuidv4()}
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
            <td>Moments</td>
            {solutionAnalysis?.moments?.map((el) => (
              <>
                <td key={uuidv4()} className="px-4 py-2 border border-gray-300">
                  <MathJax>{sprintf("`%.2f Nm`", el?.moment)}</MathJax>
                </td>
              </>
            ))}
          </tr>
        </tbody>
      </table>
    </>
  );
}

EquilibriumEquations.propTypes = {
  solutionAnalysis: PropTypes.object,
};

export default EquilibriumEquations;
