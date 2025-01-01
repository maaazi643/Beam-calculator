import React from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import { MathJax } from "better-react-mathjax";
import { sprintf } from "sprintf-js";

export default function FixedEndedMoments({ solutionAnalysis }) {
  return (
    <>
      <h2 className="text-secondary text-2xl italic font-semibold leading-[normal] font-inter">
        (Step 1). Find Fixed Ended Moments(FEM) For Each Span:
      </h2>
      {solutionAnalysis?.fixedEndedMoments?.map((el, i1) => {
        return (
          <div key={uuidv4()} className="space-y-4">
            <h3 className="text-secondary text-base italic font-semibold leading-[normal] font-inter">
              Fixed End Moment For Span {el?.lr?.name} (left to right)
            </h3>
            {el?.lr?.steps?.map((step) => (
              <MathJax key={uuidv4()}>{step}</MathJax>
            ))}
            <h3 className="text-secondary text-base italic font-semibold leading-[normal] font-inter">
              Fixed End Moment For Span {el?.rl?.name} (right to left)
            </h3>
            {el?.rl?.steps?.map((step) => (
              <MathJax key={uuidv4()}>{step}</MathJax>
            ))}
          </div>
        );
      })}
      <table className="table-auto w-full border-collapse border border-gray-300 rounded-lg">
        <thead className="bg-gray-200">
          <tr className="text-left text-gray-700">
            <th></th>
            {solutionAnalysis?.fixedEndedMoments?.map((el, ind) => (
              <>
                <th
                  key={el?.lr?.name + ind}
                  className="px-4 py-2 border border-gray-300 font-semibold"
                >
                  {el?.lr?.name}
                </th>
                <th
                  key={el?.rl?.name + ind}
                  className="px-4 py-2 border border-gray-300 font-semibold"
                >
                  {el?.rl?.name}
                </th>
              </>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="even:bg-gray-100 odd:bg-white text-gray-800">
            <td>Fixed End Moments</td>
            {solutionAnalysis?.fixedEndedMoments?.map((el, ind) => (
              <>
                <td
                  key={el?.lr?.name + ind}
                  className="px-4 py-2 border border-gray-300"
                >
                  <MathJax>{sprintf("`%.2f Nm`", el?.lr?.fem)}</MathJax>
                </td>
                <td
                  key={el?.rl?.name + ind}
                  className="px-4 py-2 border border-gray-300"
                >
                  <MathJax>{sprintf("`%.2f Nm`", el?.rl?.fem)}</MathJax>
                </td>
              </>
            ))}
          </tr>
        </tbody>
      </table>
    </>
  );
}

FixedEndedMoments.propTypes = {
  solutionAnalysis: PropTypes.object,
};
