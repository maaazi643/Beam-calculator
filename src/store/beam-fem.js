import { loadingEnums, supportEnums } from "./beam-utils";
import { sprintf } from "sprintf-js";
import linear from "linear-solve";

const FEMformulas = {
  "single-pinned-equal": {
    leftToRight: (section, sectionLength, lr) => {
      const singleLoads = section.filter((s) => s.type === loadingEnums.single);
      const [singleLoad] = singleLoads;

      const w = +singleLoad?.valueOfLoading;
      const divisor = 8;
      const fem = -(w * sectionLength) / divisor;

      const steps = [
        sprintf("`M_(F%s) = -(w * l)/%.2f`", lr, divisor),
        sprintf(
          "`M_(F%s) = -((%.2f)(%.2f))/%.2f`",
          lr,
          w,
          sectionLength,
          divisor
        ),
        sprintf("`M_(F%s) = %.2f Nm`", lr, fem),
      ];

      return {
        fem: fem,
        steps: steps,
      };
    },
    rightToLeft: (section, sectionLength, rl) => {
      const singleLoads = section.filter((s) => s.type === loadingEnums.single);
      const [singleLoad] = singleLoads;

      const w = +singleLoad?.valueOfLoading;
      const divisor = 8;
      const fem = (w * sectionLength) / divisor;

      const steps = [
        sprintf("`M_(F%s) = (w * l)/%.2f`", rl, divisor),
        sprintf("`M_(F%s) = ((%.2f)(%.2f))/8`", rl, w, sectionLength, divisor),
        sprintf("`M_(F%s) = %.2f Nm`", rl, fem),
      ];

      return {
        fem: fem,
        steps: steps,
      };
    },
    isType: (section, sectionLength) => {
      const [firstItem] = section;
      const singleLoads = section.filter((s) => s.type === loadingEnums.single);
      if (singleLoads.length != 1) return false;
      const [singleLoad] = singleLoads;
      const relativeLengthOfSingleLoad = Math.abs(
        +singleLoad?.distanceFromLeft - +firstItem?.distanceFromLeft
      );
      const halfLength = sectionLength / 2;

      return relativeLengthOfSingleLoad === halfLength;
    },
  },
  "single-pinned-unequal": {
    leftToRight: (section, sectionLength, lr) => {
      const [firstItem] = section;
      const singleLoads = section.filter((s) => s.type === loadingEnums.single);
      const [singleLoad] = singleLoads;

      const w = +singleLoad?.valueOfLoading;
      const a = Math.abs(
        +singleLoad?.distanceFromLeft - +firstItem?.distanceFromLeft
      );
      const b = sectionLength - a;
      const bPow = 2;
      const sectionLengthPow = 2;
      const fem = -(w * a * b ** bPow) / sectionLength ** sectionLengthPow;

      const steps = [
        sprintf(
          "`M_(F%s) = -(w * a * b^%.2f) / l^%.2f`",
          lr,
          bPow,
          sectionLengthPow
        ),
        sprintf(
          "`M_(F%s) = -((%.2f)(%.2f)(%.2f^%.2f))/(%.2f^%.2f)`",
          lr,
          w,
          a,
          b,
          bPow,
          sectionLength,
          sectionLengthPow
        ),
        sprintf("`M_(F%s) = %.2f Nm`", lr, fem),
      ];

      return {
        fem: fem,
        steps: steps,
      };
    },
    rightToLeft: (section, sectionLength, rl) => {
      const [firstItem] = section;
      const singleLoads = section.filter((s) => s.type === loadingEnums.single);
      const [singleLoad] = singleLoads;

      const w = +singleLoad?.valueOfLoading;
      const a = Math.abs(
        +singleLoad?.distanceFromLeft - +firstItem?.distanceFromLeft
      );
      const b = sectionLength - a;
      const aPow = 2;
      const sectionLengthPow = 2;
      const fem = (w * a ** aPow * b) / sectionLength ** sectionLengthPow;

      const steps = [
        sprintf(
          "`M_(F%s) = (w * a^%.2f * b)/(l^%.2f)`",
          rl,
          aPow,
          sectionLengthPow
        ),
        sprintf(
          "`M_(F%s) = ((%.2f)(%.2f^%.2f)(%.2f))/(%.2f^%.2f)`",
          rl,
          w,
          a,
          aPow,
          b,
          sectionLength,
          sectionLengthPow
        ),
        sprintf("`M_(F%s) = %.2f Nm`", rl, fem),
      ];

      return {
        fem: fem,
        steps: steps,
      };
    },
    isType: (section, sectionLength) => {
      const [firstItem] = section;
      const singleLoads = section.filter((s) => s.type === loadingEnums.single);
      if (singleLoads.length != 1) return false;
      const [singleLoad] = singleLoads;
      const relativeLengthOfSingleLoad = Math.abs(
        +singleLoad?.distanceFromLeft - +firstItem?.distanceFromLeft
      );
      const halfLength = sectionLength / 2;

      return relativeLengthOfSingleLoad !== halfLength;
    },
  },
  "uniform-fully-covered": {
    leftToRight: (section, sectionLength, lr) => {
      const uniformLoads = section.filter(
        (s) => s.type === loadingEnums.uniform
      );
      const [uniformLoad] = uniformLoads;

      const w = +uniformLoad?.valueOfLoading;
      const divisor = 12;
      const sectionLengthPow = 2;
      const fem = -(w * sectionLength ** sectionLengthPow) / divisor;

      const steps = [
        sprintf(
          "`M_(F%s) = -(w * l^%.2f)/%.2f`",
          lr,
          sectionLengthPow,
          divisor
        ),
        sprintf(
          "`M_(F%s) = -((%.2f)(%.2f^%.2f))/%.2f`",
          lr,
          w,
          sectionLength,
          sectionLengthPow,
          divisor
        ),
        sprintf("`M_(F%s) = %.2f Nm`", lr, fem),
      ];

      return {
        fem: fem,
        steps: steps,
      };
    },
    rightToLeft: (section, sectionLength, rl) => {
      const uniformLoads = section.filter(
        (s) => s.type === loadingEnums.uniform
      );
      const [uniformLoad] = uniformLoads;

      const w = +uniformLoad?.valueOfLoading;
      const divisor = 12;
      const sectionLengthPow = 2;
      const fem = (w * sectionLength ** sectionLengthPow) / divisor;

      const steps = [
        sprintf("`M_(F%s) = (w * l^%.2f)/%.2f`", rl, sectionLengthPow, divisor),
        sprintf(
          "`M_(F%s) = ((%.2f)(%.2f^%.2f))/%.2f`",
          rl,
          w,
          sectionLength,
          sectionLengthPow,
          divisor
        ),
        sprintf("`M_(F%s) = %.2f Nm`", rl, fem),
      ];

      return {
        fem: fem,
        steps: steps,
      };
    },
    isType: (section, sectionLength) => {
      const uniformLoads = section.filter(
        (s) => s.type === loadingEnums.uniform
      );
      if (uniformLoads.length !== 1) return false;
      const [uniformLoad] = uniformLoads;
      return +uniformLoad?.spanOfLoading === +sectionLength;
    },
  },
  "uniform-half-covered": {
    leftToRight: (section, sectionLength, lr) => {
      const uniformLoads = section.filter(
        (s) => s.type === loadingEnums.uniform
      );
      const [uniformLoad] = uniformLoads;

      const w = +uniformLoad?.valueOfLoading;
      const sectionLengthPow = 2;
      const divisor = 192;
      const multiplier = 11;

      const fem =
        -(multiplier * w * sectionLength ** sectionLengthPow) / divisor;

      const steps = [
        sprintf(
          "`M_(F%s) = -(%.2f * w * l^%.2f) / %.2f`",
          lr,
          multiplier,
          sectionLengthPow,
          divisor
        ),
        sprintf(
          "`M_(F%s) = -((%.2f)(%.2f)(%.2f^%.2f)) / (%.2f)`",
          lr,
          multiplier,
          w,
          sectionLength,
          sectionLengthPow,
          divisor
        ),
        sprintf("`M_(F%s) = %.2f Nm`", lr, fem),
      ];

      return {
        fem: fem,
        steps: steps,
      };
    },
    rightToLeft: (section, sectionLength, rl) => {
      const uniformLoads = section.filter(
        (s) => s.type === loadingEnums.uniform
      );
      const [uniformLoad] = uniformLoads;

      const w = +uniformLoad?.valueOfLoading;
      const sectionLengthPow = 2;
      const divisor = 192;
      const multiplier = 5;

      const fem =
        (multiplier * w * sectionLength ** sectionLengthPow) / divisor;

      const steps = [
        sprintf(
          "`M_(F%s) = (%.2f * w * l^%.2f) / %.2f`",
          rl,
          multiplier,
          sectionLengthPow,
          divisor
        ),
        sprintf(
          "`M_(F%s) = ((%.2f)(%.2f)(%.2f^%.2f)) / (%.2f)`",
          rl,
          multiplier,
          w,
          sectionLength,
          sectionLengthPow,
          divisor
        ),
        sprintf("`M_(F%s) = %.2f Nm`", rl, fem),
      ];

      return {
        fem: fem,
        steps: steps,
      };
    },
    isType: (section, sectionLength) => {
      const uniformLoads = section.filter(
        (s) => s.type === loadingEnums.uniform
      );
      if (uniformLoads.length !== 1) return false;
      const [uniformLoad] = uniformLoads;
      return +uniformLoad?.spanOfLoading === +sectionLength / 2;
    },
  },
  "varying-triangular-fully-covered-positive-slope": {
    leftToRight: (section, sectionLength, lr) => {
      const varyingLoads = section.filter(
        (s) => s.type === loadingEnums.varying
      );
      const [varyingLoad] = varyingLoads;

      const w = +varyingLoad?.closingValue;
      const sectionLengthPow = 2;
      const divisor = 30;
      const fem = -(w * sectionLength ** sectionLengthPow) / divisor;
      const steps = [
        sprintf(
          "`M_(F%s) = -(w * l^%.2f) / %.2f`",
          lr,
          sectionLengthPow,
          divisor
        ),
        sprintf(
          "`M_(F%s) = -((%.2f)(%.2f^%.2f)) / (%.2f)`",
          lr,
          w,
          sectionLength,
          sectionLengthPow,
          divisor
        ),
        sprintf("`M_(F%s) = %.2f Nm`", lr, fem),
      ];

      return {
        fem: fem,
        steps: steps,
      };
    },
    rightToLeft: (section, sectionLength, rl) => {
      const varyingLoads = section.filter(
        (s) => s.type === loadingEnums.varying
      );
      const [varyingLoad] = varyingLoads;

      const w = +varyingLoad?.closingValue;
      const sectionLengthPow = 2;
      const divisor = 20;
      const fem = +(w * sectionLength ** sectionLengthPow) / divisor;
      const steps = [
        sprintf(
          "`M_(F%s) = +(w * l^%.2f) / %.2f`",
          rl,
          sectionLengthPow,
          divisor
        ),
        sprintf(
          "`M_(F%s) = +((%.2f)(%.2f^%.2f)) / (%.2f)`",
          rl,
          w,
          sectionLength,
          sectionLengthPow,
          divisor
        ),
        sprintf("`M_(F%s) = %.2f Nm`", rl, fem),
      ];

      return {
        fem: fem,
        steps: steps,
      };
    },
    isType: (section, sectionLength) => {
      const varyingLoads = section.filter(
        (s) => s.type === loadingEnums.varying
      );
      if (varyingLoads.length !== 1) return false;
      const [varyingLoad] = varyingLoads;
      const sameLengthAsSection =
        +varyingLoad?.spanOfLoading === +sectionLength;
      const openingIsZero = +varyingLoad?.openingValue === 0;
      const closingIsGreaterThanZero = +varyingLoad?.closingValue > 0;
      return sameLengthAsSection && openingIsZero && closingIsGreaterThanZero;
    },
  },
  "varying-triangular-fully-covered-negative-slope": {
    leftToRight: (section, sectionLength, lr) => {
      const varyingLoads = section.filter(
        (s) => s.type === loadingEnums.varying
      );
      const [varyingLoad] = varyingLoads;

      const w = +varyingLoad?.openingValue;
      const sectionLengthPow = 2;
      const divisor = 20;
      const fem = (w * sectionLength ** sectionLengthPow) / divisor;
      const steps = [
        sprintf(
          "`M_(F%s) = (w * l^%.2f) / %.2f`",
          lr,
          sectionLengthPow,
          divisor
        ),
        sprintf(
          "`M_(F%s) = ((%.2f)(%.2f^%.2f)) / (%.2f)`",
          lr,
          w,
          sectionLength,
          sectionLengthPow,
          divisor
        ),
        sprintf("`M_(F%s) = %.2f Nm`", lr, fem),
      ];

      return {
        fem: fem,
        steps: steps,
      };
    },
    rightToLeft: (section, sectionLength, rl) => {
      const varyingLoads = section.filter(
        (s) => s.type === loadingEnums.varying
      );
      const [varyingLoad] = varyingLoads;

      const w = +varyingLoad?.openingValue;
      const sectionLengthPow = 2;
      const divisor = 30;
      const fem = -(w * sectionLength ** sectionLengthPow) / divisor;
      const steps = [
        sprintf(
          "`M_(F%s) = -(w * l^%.2f) / %.2f`",
          rl,
          sectionLengthPow,
          divisor
        ),
        sprintf(
          "`M_(F%s) = -((%.2f)(%.2f^%.2f)) / (%.2f)`",
          rl,
          w,
          sectionLength,
          sectionLengthPow,
          divisor
        ),
        sprintf("`M_(F%s) = %.2f Nm`", rl, fem),
      ];

      return {
        fem: fem,
        steps: steps,
      };
    },
    isType: (section, sectionLength) => {
      const varyingLoads = section.filter(
        (s) => s.type === loadingEnums.varying
      );
      if (varyingLoads.length !== 1) return false;
      const [varyingLoad] = varyingLoads;
      const sameLengthAsSection =
        +varyingLoad?.spanOfLoading === +sectionLength;
      const closingIsZero = +varyingLoad?.closingValue === 0;
      const openingIsGreaterThanZero = +varyingLoad?.openingValue > 0;
      return sameLengthAsSection && closingIsZero && openingIsGreaterThanZero;
    },
  },
};

export const getBeamAnalysis = (beam) => {
  // find ranges of true spans using supports
  const spans = beam?.spans || [];
  const supports = beam?.supports || [];
  const loadings = beam?.loadings || [];
  const supportsAndLoading = [...supports, ...loadings];

  const supportRanges = [];
  supports?.forEach((support, ind, arr) => {
    const prevSupport = arr[ind - 1];

    if (!prevSupport) return;

    supportRanges?.push([
      +prevSupport?.distanceFromLeft,
      +support?.distanceFromLeft,
    ]);
  });

  // find members(supports/loading) that belong to a span section
  const sections = supportRanges?.map((range) => {
    const [p1, p2] = range;
    return supportsAndLoading
      ?.filter(
        (sal) => +sal?.distanceFromLeft >= p1 && +sal?.distanceFromLeft < p2
      )
      ?.sort((a, b) => +a.distanceFromLeft - +b.distanceFromLeft);
  });

  // find fixed ended moments for each section
  const fixedEndedMoments = sections?.map((section, i) => {
    const lr = `${i + 1}.${i + 2}`;
    const rl = `${i + 2}.${i + 1}`;
    const supportRange = supportRanges[i];
    const [p1, p2] = supportRange;
    const sectionLength = Math.abs(p2 - p1);
    const formulas = Object.entries(FEMformulas);
    const formI = formulas?.findIndex((formula) =>
      formula[1]?.isType(section, sectionLength)
    );
    if (formI != -1) {
      const formula = formulas[formI][1];
      const resultLtR = formula.leftToRight(section, sectionLength, lr);
      const resultRtL = formula.rightToLeft(section, sectionLength, rl);

      return {
        lr: {
          fem: resultLtR.fem,
          steps: resultLtR.steps,
          name: lr,
        },
        rl: {
          fem: resultRtL.fem,
          steps: resultRtL.steps,
          name: rl,
        },
        section: section,
      };
    } else {
      throw new Error(
        "FEM formula not found for section " + JSON.stringify(supportRange)
      );
    }
  });

  console.log(fixedEndedMoments);

  // making slope deflection equations for each span
  const slopesDeflectionEquations = supportRanges.map((supportRange, i) => {
    // supportRanges.forEach((supportRange, i) => {
    const leftPoint = supportRange[0];
    const rightPoint = supportRange[1];
    const supportAtLeftPoint = supports?.find(
      (support) => +support?.distanceFromLeft === +leftPoint
    );
    const supportAtRightPoint = supports?.find(
      (support) => +support?.distanceFromLeft === +rightPoint
    );
    if (!supportAtLeftPoint || !supportAtRightPoint) {
      throw new Error(
        "Support not found for section: " + JSON.stringify(supportRange)
      );
    }
    const span = spans?.[i];
    const spanLength = span?.length;
    const lr = fixedEndedMoments?.[i]?.lr?.name;
    const rl = fixedEndedMoments?.[i]?.rl?.name;
    const [l, r] = lr.split(".");
    const femLr = fixedEndedMoments?.[i]?.lr?.fem;
    const femRl = fixedEndedMoments?.[i]?.rl?.fem;
    const slopeAtLeft = supportAtLeftPoint?.type === supportEnums.fixed ? 0 : 1;
    const slopeAtRight =
      supportAtRightPoint?.type === supportEnums.fixed ? 0 : 1;
    const sinkingAtLeft = supportAtLeftPoint?.sinking
      ? +supportAtLeftPoint?.sinkingValue
      : 0;
    const sinkingAtRight = supportAtRightPoint?.sinking
      ? +supportAtRightPoint?.sinkingValue
      : 0;
    const EI = span?.flexuralRigidity == "" ? 1 : +span?.flexuralRigidity;
    const multiplier = (2 * EI) / spanLength;
    const [pl1, pl2, pl3, pl4] = [
      multiplier * 2 * slopeAtLeft,
      multiplier * slopeAtRight,
      multiplier * -3 * sinkingAtLeft,
      femLr,
    ];
    const equationL = [pl1, pl2, pl3, pl4];
    const [pr1, pr2, pr3, pr4] = [
      multiplier * slopeAtLeft,
      multiplier * 2 * slopeAtRight,
      multiplier * -3 * sinkingAtRight,
      femRl,
    ];
    const equationR = [pr1, pr2, pr3, pr4];

    const stepsLr = [
      sprintf("`M_%s = ((2EI)/l)(2θ_%s + θ_%s - 3φ) + M_(F%s)`", lr, l, r, lr),
      sprintf("`EI = %.2fEI`", EI),
      sprintf("`l = %.2fm`", spanLength),
      sprintf(
        "`θ_%s, θ_%s = %s, %s`",
        l,
        r,
        slopeAtLeft ? `θ_${l}` : "0",
        slopeAtRight ? `θ_${r}` : "0"
      ),
      sprintf("`φ = %.2f`", sinkingAtLeft),
      sprintf("`M_(F%s) = %.2f Nm`", lr, femLr),
      sprintf(
        "`M_%s = ((2*%.2fEI)/%.2f)(2%s + %s - 3*%.2f) + %.2f`",
        lr,
        EI == 1 ? "" : EI,
        spanLength,
        slopeAtLeft == 0 ? `*0` : `*θ_${l}`,
        slopeAtRight == 0 ? `0` : `θ_${r}`,
        sinkingAtLeft,
        femLr
      ),
      sprintf(
        "`M_%s = %s %s %s %s`",
        lr,
        pl1 == 0 ? "" : sprintf("+ %.2f EIθ_%s", pl1, l),
        pl2 == 0 ? "" : sprintf("+ %.2f EIθ_%s", pl2, r),
        pl3 == 0 ? "" : sprintf("+ %.2f EI", pl3),
        pl4 == 0 ? "" : sprintf("+ %.2f", pl4)
      ),
    ];

    const stepsRl = [
      sprintf("`M_%s = ((2EI)/l)(θ_%s + 2θ_%s - 3φ) + M_(F%s)`", rl, l, r, rl),
      sprintf("`EI = %.2fEI`", EI),
      sprintf("`l = %.2fm`", spanLength),
      sprintf(
        "`θ_%s, θ_%s = %s, %s`",
        l,
        r,
        slopeAtLeft ? `θ_${l}` : "0",
        slopeAtRight ? `θ_${r}` : "0"
      ),
      sprintf("`φ = %.2f`", sinkingAtRight),
      sprintf("`M_(F%s) = %.2f Nm`", rl, femRl),
      sprintf(
        "`M_%s = ((2*%.2fEI)/%.2f)(%s + 2%s - 3*%.2f) + %.2f`",
        rl,
        EI == 1 ? "" : EI,
        spanLength,
        slopeAtLeft == 0 ? `0` : `θ_${l}`,
        slopeAtRight == 0 ? `*0` : `*θ_${r}`,
        sinkingAtRight,
        femRl
      ),
      sprintf(
        "`M_%s = %s %s %s %s`",
        rl,
        pl1 == 0 ? "" : sprintf("+ %.2f EIθ_%s", pr1, l),
        pl2 == 0 ? "" : sprintf("+ %.2f EIθ_%s", pr2, r),
        pl3 == 0 ? "" : sprintf("+ %.2f EI", pr3),
        pl4 == 0 ? "" : sprintf("+ %.2f", pr4)
      ),
    ];

    return {
      lr: { name: lr, steps: stepsLr, equation: equationL },
      rl: { name: rl, steps: stepsRl, equation: equationR },
    };
  });

  return {
    fixedEndedMoments,
    slopesDeflectionEquations,
  };
};

//  '`M_2.1 + M_2.3 = 0`' ], equation: [ '2.1', '2.3' ]

// {

//   '1.2': [

//     { num: 0, v: 'θ_1' },

//     { num: 0.4, v: 'θ_2' },

//     { num: -0, v: null },

//     { num: -36, v: null }

//   ],

//   '2.1': [

//     { num: 0.8, v: 'θ_2' },

//     { num: 0, v: 'θ_1' },

//     { num: -0, v: null },

//     { num: 24, v: null }

//   ],

//   '2.3': [

//     { num: 0.8, v: 'θ_2' },

//     { num: 0, v: 'θ_3' },

//     { num: -0, v: null },

//     { num: -50, v: null }

//   ],

//   '3.2': [

//     { num: 0, v: 'θ_3' },

//     { num: 0.4, v: 'θ_2' },

//     { num: -0, v: null },

//     { num: 50, v: null }

//   ]

// }

function sortArrayByV(array) {
  return [...array].sort((a, b) => {
    if (a.v === null && b.v === null) return 0; // Both null, no change
    if (a.v === null) return 1; // Null goes after non-null
    if (b.v === null) return -1; // Non-null goes before null
    return a.v - b.v; // Compare numeric values
  });
}

// function ensureMatchingVs(arr1, arr2) {
//   // Clone the arrays to avoid modifying the originals
//   const newArr1 = [...arr1];
//   const newArr2 = [...arr2];

//   // Add missing `v` values from `arr1` into `arr2`
//   arr1?.forEach((el1) => {
//     const v = el1?.v;

//     if (!v) return; // Skip null or undefined `v`

//     const isFound = arr2?.find((el2) => +el2?.v === +v);
//     if (!isFound) {
//       newArr2.push({ num: 0, v });
//     }
//   });

//   // Add missing `v` values from `arr2` into `arr1`
//   arr2?.forEach((el2) => {
//     const v = el2?.v;

//     if (!v) return; // Skip null or undefined `v`

//     const isFound = arr1?.find((el1) => +el1?.v === +v);
//     if (!isFound) {
//       newArr1.push({ num: 0, v });
//     }
//   });

//   return [newArr1, newArr2];
// }

function ensureMatchingVs(...arrays) {
  // Collect all unique `v` values from all arrays
  const allVs = new Set();

  arrays.forEach((arr) => {
    arr?.forEach((el) => {
      if (el?.v != null) {
        allVs.add(+el.v); // Ensure numeric comparison consistency
      }
    });
  });

  // Clone and synchronize each array with all unique `v` values
  const updatedArrays = arrays.map((arr) => {
    const newArr = [...arr];

    allVs.forEach((v) => {
      const isFound = newArr.find((el) => +el?.v === +v);
      if (!isFound) {
        newArr.push({ num: 0, v });
      }
    });

    return newArr;
  });

  return updatedArrays;
}
