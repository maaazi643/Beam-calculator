import React, { useState } from "react";
import { getBeamAnalysis } from "../../store/beam-fem";
import { useSelector } from "react-redux";
import { MathJax } from "better-react-mathjax";
import { v4 as uuidv4 } from "uuid";
import { Bars } from "react-loader-spinner";
import { COLORS } from "../../../tailwind.config";

export default function StepsPage() {
  const {
    beamProperties,
    solutionAnalysis,
    solutionAnalysisErrorMessage,
    solutionIsLoading,
  } = useSelector((state) => state.beam);

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
    return <div>ERRor {solutionAnalysisErrorMessage}</div>;
  }

  const noAnalysis = Object.keys(solutionAnalysis).length === 0;
  if(noAnalysis){
    return <div>Please solve a question</div>
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
        (Step 3). Find All reaction forces
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
    </div>
  );
}
