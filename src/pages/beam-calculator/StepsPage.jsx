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
          (Step 1). Fixed Ended Moments For Each Span:
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
      </div>
    );
  } catch (error) {
    alert(error?.message);
    return <div> Can not solve yet, please report</div>;
  }
}
