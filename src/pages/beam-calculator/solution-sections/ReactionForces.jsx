import React from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import { MathJax } from "better-react-mathjax";
import { sprintf } from "sprintf-js";

function ReactionForces({ solutionAnalysis }) {
  return (
    <>
      <h2 className="text-secondary text-2xl italic font-semibold leading-[normal] font-inter">
        (Step 4). Find All reaction forces
      </h2>
      {solutionAnalysis?.reactions?.map((el, i1) => {
        return (
          <div key={uuidv4()} className="space-y-4">
            <h3 className="text-secondary text-base italic font-semibold leading-[normal] font-inter">
              Take moment about Point: {el?.lr?.name?.split(".")[0]}
            </h3>
            {el?.lr?.steps?.map((step) => (
              <MathJax key={uuidv4()}>{step}</MathJax>
            ))}
            {el?.rl?.steps?.map((step) => (
              <MathJax key={uuidv4()}>{step}</MathJax>
            ))}
          </div>
        );
      })}
      <h3 className="text-secondary text-base italic font-semibold leading-[normal] font-inter">
        Final Reaction Forces
      </h3>
      {/* <div className="flex gap-x-4">
        {Object.entries(solutionAnalysis?.finalReactionMaps)?.map(
          ([key, value]) => {
            return (
              <MathJax key={uuidv4()} className="">
                {sprintf("`R_%d = %.2f N`", key, value)}
              </MathJax>
            );
          }
        )}
      </div> */}
      <table className="table-auto w-full border-collapse border border-gray-300 rounded-lg">
        <thead className="bg-gray-200">
          <tr className="text-left text-gray-700">
            <th></th>
            {Object.keys(solutionAnalysis?.finalReactionMaps)?.map((el) => (
              <>
                <th
                  key={uuidv4()}
                  className="px-4 py-2 border border-gray-300 font-semibold"
                >
                  <MathJax>{sprintf("`R_%d`", el)}</MathJax>
                </th>
              </>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="even:bg-gray-100 odd:bg-white text-gray-800">
            <td>Moments</td>
            {Object.values(solutionAnalysis?.finalReactionMaps)?.map((el) => (
              <>
                <td key={uuidv4()} className="px-4 py-2 border border-gray-300">
                  {`${el?.toFixed(2)}`}N
                </td>
              </>
            ))}
          </tr>
        </tbody>
      </table>
    </>
  );
}

ReactionForces.propTypes = {
  solutionAnalysis: PropTypes.object,
};

export default ReactionForces;
