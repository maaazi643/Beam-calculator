import React, { useState } from "react";
import { getBeamAnalysis } from "../../store/beam-fem";
import { useDispatch, useSelector } from "react-redux";
import { MathJaxProvider, MathJaxFormula } from "mathjax3-react";
import { MathJax } from "better-react-mathjax";
import { escapeTex } from "../../utils/tex";
import { v4 as uuidv4 } from "uuid";
import { sprintf } from "sprintf-js";

export default function StepsPage() {
  const dispatch = useDispatch();
  const { beamProperties } = useSelector((state) => state.beam);

  try {
    const analysis = getBeamAnalysis(beamProperties);
    console.log(beamProperties);
    console.log(analysis);

    return (
      <div className="space-y-6">
        <h2 className="text-secondary text-2xl italic font-semibold leading-[normal] font-inter">
          (Step 1). Find Fixed Ended Moments(FEM) For Each Span:
        </h2>
        {analysis?.fixedEndedMoments?.map((el, i1) => {
          return (
            <div key={uuidv4()} className="space-y-6">
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
          (Step 2). Find Slope Deflection Equation For Each Span:
        </h2>
        {analysis?.slopesDeflectionEquations?.map((el, i1) => {
          return (
            <div key={uuidv4()} className="space-y-6">
              <h3 className="text-secondary text-base italic font-semibold leading-[normal] font-inter">
                Slope Deflection Equation For Span {el?.lr?.name} (left to
                right)
              </h3>
              {el?.lr?.steps?.map((step) => (
                <MathJax key={uuidv4()}>{step}</MathJax>
              ))}
              <p>{JSON.stringify(el?.lr?.equation)}</p>
              <h3 className="text-secondary text-base italic font-semibold leading-[normal] font-inter">
                Slope Deflection Equation For Span {el?.rl?.name} (right to
                left)
              </h3>
              {el?.rl?.steps?.map((step) => (
                <MathJax key={uuidv4()}>{step}</MathJax>
              ))}
              <p>{JSON.stringify(el?.rl?.equation)}</p>
            </div>
          );
        })}
        {/* <h2 className="text-secondary text-2xl italic font-semibold leading-[normal] font-inter">
          (Step 3). Find Equilibrium Equations
        </h2>
        {analysis?.equilibriumEquations?.map((el, i) => {
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
        })} */}
        {/* {analysis?.extraEquations?.map((el) => {
          return (
            <div key={uuidv4()} className="space-y-6">
              {el?.steps?.map((step) => (
                <MathJax key={uuidv4()}>{step}</MathJax>
              ))}
            </div>
          );
        })}
        {Object.values(analysis?.slopeValuesMap)?.filter(el => +el?.value !== 0)?.map((el) => {
          return (
            <div key={uuidv4()} className="space-y-6">
              {el?.steps?.map((step) => (
                <MathJax key={uuidv4()}>{step}</MathJax>
              ))}
            </div>
          );
        })} */}
      </div>
    );
  } catch (error) {
    alert(error?.message);
    return <div> Can not solve yet, please report</div>;
  }
}
