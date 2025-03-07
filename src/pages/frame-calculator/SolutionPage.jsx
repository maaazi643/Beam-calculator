import React, { useState } from "react";
import { useSelector } from "react-redux";
import { MathJax } from "better-react-mathjax";
import { v4 as uuidv4 } from "uuid";
import { Bars } from "react-loader-spinner";
import { COLORS } from "../../../tailwind.config";
import { sprintf } from "sprintf-js";
import DescriptionIcon from "@mui/icons-material/Description";
import ErrorIcon from "@mui/icons-material/Error";
import { usePDF } from "react-to-pdf";
import FixedEndedMoments from "./solution-sections/FixedEndedMoments";
// import SlopeDeflectionEquations from "./solution-sections/SlopeDeflectionEquations";
// import EquilibriumEquations from "./solution-sections/EquilibriumEquations";
// import ReactionForces from "./solution-sections/ReactionForces";
// import ShearForces from "./solution-sections/ShearForces";
// import FreeEndAndBendingMoment from "./solution-sections/FreeEndAndBendingMoment";

export default function SolutionPage() {
  const randomSolutionFilename = `solution-${uuidv4()?.replaceAll(
    "-",
    ""
  )}.pdf`;
  const { toPDF, targetRef } = usePDF({ filename: randomSolutionFilename });
  const { solutionAnalysis, solutionAnalysisErrorMessage, solutionIsLoading } =
    useSelector((state) => state.frame);

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

  const downloadPDF = () => {
    try {
      // toPDF();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="space-y-4 overflow-x-hidden"
      ref={targetRef}
      onClick={downloadPDF}
    >
      {/* <FixedEndedMoments solutionAnalysis={solutionAnalysis} /> */}
      {/* <SlopeDeflectionEquations solutionAnalysis={solutionAnalysis} /> */}
      {/* <EquilibriumEquations solutionAnalysis={solutionAnalysis} /> */}
      {/* <ReactionForces solutionAnalysis={solutionAnalysis} /> */}
      {/* <ShearForces solutionAnalysis={solutionAnalysis} /> */}
      {/* <FreeEndAndBendingMoment solutionAnalysis={solutionAnalysis} /> */}
    </div>
  );
}
