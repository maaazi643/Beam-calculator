import React from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import { MathJax } from "better-react-mathjax";

function SlopeDeflectionEquations({ solutionAnalysis }) {
  const { isSingleSpanWithFixedEnds, slopesDeflectionEquations } =
    solutionAnalysis;

  return (
    <>
      <h2 className="text-secondary text-lg sm:text-2xl italic font-semibold leading-[normal] font-inter">
        (Step 2). Find Slope Deflection Equations For Each Span:
      </h2>
      {isSingleSpanWithFixedEnds ? (
        <p>
          Since No Pinned Or Roller Support there are no Slope Deflection
          Equation(s)
        </p>
      ) : (
        slopesDeflectionEquations?.map((el, i1) => {
          return (
            <div key={uuidv4()} className="space-y-4">
              <h3 className="text-secondary text-base italic font-semibold leading-[normal] font-inter">
                Slope Deflection Equation For Span {el?.lr?.name} (left to
                right)
              </h3>
              {el?.lr?.steps?.map((step) => (
                <MathJax key={uuidv4()}>{step}</MathJax>
              ))}
              {/* <p>{JSON.stringify(el?.lr?.equation)}</p> */}
              {/* <p>{JSON.stringify(el?.lr?.filled)}</p> */}
              <h3 className="text-secondary text-base italic font-semibold leading-[normal] font-inter">
                Slope Deflection Equation For Span {el?.rl?.name} (right to
                left)
              </h3>
              {el?.rl?.steps?.map((step) => (
                <MathJax key={uuidv4()}>{step}</MathJax>
              ))}
              {/* <p>{JSON.stringify(el?.rl?.equation)}</p> */}
              {/* <p>{JSON.stringify(el?.rl?.filled)}</p> */}
            </div>
          );
        })
      )}
    </>
  );
}

SlopeDeflectionEquations.propTypes = {
  solutionAnalysis: PropTypes.object,
};

export default SlopeDeflectionEquations;
