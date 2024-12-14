import { s, section } from "motion/react-client";
import { loadingEnums } from "./beam-utils";
import { sprintf } from "sprintf-js";

const FEMformulas = {
  "single-pinned-equal": {
    leftToRight: (section, sectionLength, lr) => {
      const singleLoads = section.filter((s) => s.type === loadingEnums.single);
      const [singleLoad] = singleLoads;

      const w = +singleLoad?.valueOfLoading;
      const divisor = 8;
      const fem = -(w * sectionLength) / divisor;

      const steps = [
        sprintf("`M_(F%s) = -(w * l)/%f`", lr, divisor),
        sprintf("`M_(F%s) = -((%f)(%f))/8`", lr, w, sectionLength, divisor),
        sprintf("`M_(F%s) = %f N/m`", lr, fem),
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
        sprintf("`M_(F%s) = (w * l)/%f`", rl, divisor),
        sprintf("`M_(F%s) = ((%f)(%f))/8`", rl, w, sectionLength, divisor),
        sprintf("`M_(F%s) = %f N/m`", rl, fem),
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
          "`M_(F%s) = -(w * a * b^%f) / l^%f`",
          lr,
          bPow,
          sectionLengthPow
        ),
        sprintf(
          "`M_(F%s) = -((%f)(%f)(%f^%f))/(%f^%f)`",
          lr,
          w,
          a,
          b,
          bPow,
          sectionLength,
          sectionLengthPow
        ),
        sprintf("`M_(F%s) = %f N/m`", lr, fem),
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
          "`M_(F%s) = (w * a^%f * b)/(l^%f)`",
          rl,
          aPow,
          sectionLengthPow
        ),
        sprintf(
          "`M_(F%s) = ((%f)(%f^%f)(%f))/(%f^%f)`",
          rl,
          w,
          a,
          aPow,
          b,
          sectionLength,
          sectionLengthPow
        ),
        sprintf("`M_(F%s) = %f N/m`", rl, fem),
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
      const fem = -(w * sectionLength ** 2) / divisor;

      const steps = [
        sprintf("`M_(F%s) = -((%f)(%f^2))/12`", lr, w, sectionLength),
        sprintf("`M_(F%s) = %f N/m`", lr, fem),
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
      const fem = (w * sectionLength ** 2) / divisor;

      const steps = [
        sprintf("`M_(F%s) = ((%f)(%f^2))/12`", rl, w, sectionLength),
        sprintf("`M_(F%s) = %f N/m`", rl, fem),
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
          "`M_(F%s) = -(%f * w * l^%f) / %f`",
          lr,
          multiplier,
          sectionLengthPow,
          divisor
        ),
        sprintf(
          "`M_(F%s) = -((%f)(%f)(%f^%f)) / (%f)`",
          lr,
          multiplier,
          w,
          sectionLength,
          sectionLengthPow,
          divisor
        ),
        sprintf("`M_(F%s) = %f N/m`", lr, fem),
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
          "`M_(F%s) = (%f * w * l^%f) / %f`",
          rl,
          multiplier,
          sectionLengthPow,
          divisor
        ),
        sprintf(
          "`M_(F%s) = ((%f)(%f)(%f^%f)) / (%f)`",
          rl,
          multiplier,
          w,
          sectionLength,
          sectionLengthPow,
          divisor
        ),
        sprintf("`M_(F%s) = %f N/m`", rl, fem),
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
};

// FEMformulas["uniform-fully-covered"].isType(
//   [
//     {
//       id: "312c8a57-f834-4734-841a-b32143cb68ae",

//       type: "pinned",

//       sinking: false,

//       sinkingValue: "",

//       distanceFromLeft: "4",
//     },

//     {
//       id: "fd4e96c0-4a9e-48a7-8199-6682140387f1",

//       type: "uniform",

//       distanceFromLeft: "4",

//       valueOfLoading: "12",

//       spanOfLoading: "3",

//       openingValue: "",

//       closingValue: "",
//     },
//   ],
//   3
// );

export const getBeamAnalysis = (beam) => {
  // find ranges of true spans using supports
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
  console.log(supportRanges);

  // find members(supports/loading) that belong to a span section
  const sections = supportRanges?.map((range) => {
    const [p1, p2] = range;
    return supportsAndLoading
      ?.filter(
        (sal) => +sal?.distanceFromLeft >= p1 && +sal?.distanceFromLeft < p2
      )
      ?.sort((a, b) => +a.distanceFromLeft - +b.distanceFromLeft);
  });

  console.log(sections);

  // find fixed ended moments for each section
  const fixedEndedMoments = sections?.map((fem, i) => {
    console.log(fem);
    const lr = `${i + 1}.${i + 2}`;
    const rl = `${i + 2}.${i + 1}`;
    // const lr = `${i + 1}${"\\"?.repeat(2)}*${i + 2}`;
    // const rl = `${i + 2}${"\\"?.repeat(2)}*${i + 1}`;
    const supportRange = supportRanges[i];
    const [p1, p2] = supportRange;
    const sectionLength = Math.abs(p2 - p1);
    const formulas = Object.entries(FEMformulas);
    const formI = formulas?.findIndex((formula) =>
      formula[1]?.isType(fem, sectionLength)
    );
    if (formI != -1) {
      const formula = formulas[formI][1];
      console.log({ formula });
      const resultLtR = formula.leftToRight(fem, sectionLength, lr);
      console.log(i, resultLtR);
      const resultRtL = formula.rightToLeft(fem, sectionLength, rl);
      console.log(i, resultRtL);

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
        section: fem,
      };
    } else {
      console.log(fem);
      throw new Error(
        "FEM formula not found for section " + JSON.stringify(supportRange)
      );
      // return {
      //   lr: { fem: null, steps: [], name: lr },
      //   rl: { fem: null, steps: [], name: rl },
      //   section: fem,
      // };
    }
  });

  // console.log(sections);

  return {
    fixedEndedMoments,
  };
};
