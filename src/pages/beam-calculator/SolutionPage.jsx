import React, { useState } from "react";
import { useSelector } from "react-redux";
import { MathJax } from "better-react-mathjax";
import { v4 as uuidv4 } from "uuid";
import { Bars } from "react-loader-spinner";
import { COLORS } from "../../../tailwind.config";
import { sprintf } from "sprintf-js";
import DescriptionIcon from "@mui/icons-material/Description";
import ErrorIcon from "@mui/icons-material/Error";

export default function SolutionPage() {
  const { solutionAnalysis, solutionAnalysisErrorMessage, solutionIsLoading } =
    useSelector((state) => state.beam);

  if (solutionIsLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Bars
          height="80"
          width="80"
          color={COLORS.secondary}
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }

  if (solutionAnalysisErrorMessage) {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center">
        <ErrorIcon className="text-secondary" style={{ fontSize: "9rem" }} />

        <p className="text-xl font-medium text-secondary text-center">
          {solutionAnalysisErrorMessage}
        </p>
      </div>
    );
  }

  const noAnalysis = Object.keys(solutionAnalysis).length === 0;
  if (noAnalysis) {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center">
        <DescriptionIcon
          className="text-secondary"
          style={{ fontSize: "9rem" }}
        />

        <p className="text-xl font-medium text-secondary text-center">
          Please solve a question.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
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
      <h2 className="text-secondary text-2xl italic font-semibold leading-[normal] font-inter">
        (Step 2). Find Slope Deflection Equations For Each Span:
      </h2>
      {solutionAnalysis?.slopesDeflectionEquations?.map((el, i1) => {
        return (
          <div key={uuidv4()} className="space-y-4">
            <h3 className="text-secondary text-base italic font-semibold leading-[normal] font-inter">
              Slope Deflection Equation For Span {el?.lr?.name} (left to right)
            </h3>
            {el?.lr?.steps?.map((step) => (
              <MathJax key={uuidv4()}>{step}</MathJax>
            ))}
            <p>{JSON.stringify(el?.lr?.equation)}</p>
            <p>{JSON.stringify(el?.lr?.filled)}</p>
            <h3 className="text-secondary text-base italic font-semibold leading-[normal] font-inter">
              Slope Deflection Equation For Span {el?.rl?.name} (right to left)
            </h3>
            {el?.rl?.steps?.map((step) => (
              <MathJax key={uuidv4()}>{step}</MathJax>
            ))}
            <p>{JSON.stringify(el?.rl?.equation)}</p>
            <p>{JSON.stringify(el?.rl?.filled)}</p>
          </div>
        );
      })}
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
      <div className="flex gap-x-4">
        {Object.entries(solutionAnalysis?.finalReactionMaps)?.map(
          ([key, value]) => {
            return (
              <MathJax key={uuidv4()} className="">
                {sprintf("`R_%d = %.2f N`", key, value)}
              </MathJax>
            );
          }
        )}
      </div>
      <h2 className="text-secondary text-2xl italic font-semibold leading-[normal] font-inter">
        (Step 5). Find shear forces
      </h2>
      <div className="space-y-4">
        {solutionAnalysis?.shearForces?.map((el) => {
          return (
            <div key={uuidv4()} className="space-y-2">
              {el?.steps?.map((step) => (
                <>
                  <MathJax key={uuidv4()}>{step}</MathJax>
                </>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

//   <table className="table-auto w-full border-collapse border border-gray-300 rounded-lg shadow-md">
//     <thead className="bg-gray-200">
//       <tr className="text-left text-gray-700">
//         <th></th>
//         {analysis?.fixedEndedMoments?.map((el, ind) => (
//           <>
//             <th
//               key={el?.lr?.name + ind}
//               className="px-4 py-2 border border-gray-300 font-semibold"
//             >
//               {el?.lr?.name}
//             </th>
//             <th
//               key={el?.rl?.name + ind}
//               className="px-4 py-2 border border-gray-300 font-semibold"
//             >
//               {el?.rl?.name}
//             </th>
//           </>
//         ))}
//       </tr>
//     </thead>
//     <tbody>
//       <tr className="even:bg-gray-100 odd:bg-white text-gray-800">
//         <td>Fixed End Moments</td>
//         {analysis?.fixedEndedMoments?.map((el, ind) => (
//           <>
//             <td
//               key={el?.lr?.name + ind}
//               className="px-4 py-2 border border-gray-300"
//             >
//               {el?.lr?.fem}
//             </td>
//             <td
//               key={el?.rl?.name + ind}
//               className="px-4 py-2 border border-gray-300"
//             >
//               {el?.rl?.fem}
//             </td>
//           </>
//         ))}
//       </tr>
//     </tbody>
//   </table>
