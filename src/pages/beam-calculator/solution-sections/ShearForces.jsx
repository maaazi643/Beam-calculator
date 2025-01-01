import React from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import { MathJax } from "better-react-mathjax";

function ShearForces({ solutionAnalysis }) {
  console.log(solutionAnalysis?.shearForces);

  return (
    <>
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
    </>
  );
}

ShearForces.propTypes = {
  solutionAnalysis: PropTypes.object,
};

export default ShearForces;
