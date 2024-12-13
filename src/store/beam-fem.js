import { section } from "motion/react-client";
import { loadingEnums } from "./beam-utils";

const FEMformulas = {
  "single-pinned-equal": {
    leftToRight: (section, sectionLength, lr) => {
      const singleLoads = section.filter((s) => s.type === loadingEnums.single);
      const [singleLoad] = singleLoads;
      const steps = [
        // `M_{${rl}} = \\frac{${singleLoad?.valueOfLoading} \\cdot ${sectionLength}}{8}`,
      ];

      const fem = -(singleLoad?.valueOfLoading * sectionLength) / 8;

      return {
        fem: fem,
        steps: steps,
      };
    },
    rightToLeft: (section, sectionLength, rl) => {
      const singleLoads = section.filter((s) => s.type === loadingEnums.single);
      const [singleLoad] = singleLoads;
      const steps = [
        // `M_{${rl}} = \\frac{${singleLoad?.valueOfLoading} \\cdot ${sectionLength}}{8}`,
      ];

      const fem = (singleLoad?.valueOfLoading * sectionLength) / 8;

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
      const steps = [];

      const a = Math.abs(
        +singleLoad?.distanceFromLeft - +firstItem?.distanceFromLeft
      );
      const b = sectionLength - a;

      const fem =
        -(singleLoad?.valueOfLoading * b ** 2 * a) / sectionLength ** 2;

      return {
        fem: fem,
        steps: steps,
      };
    },
    rightToLeft: (section, sectionLength, rl) => {
      const [firstItem] = section;
      const singleLoads = section.filter((s) => s.type === loadingEnums.single);
      const [singleLoad] = singleLoads;
      const steps = [];

      const a = Math.abs(
        +singleLoad?.distanceFromLeft - +firstItem?.distanceFromLeft
      );
      const b = sectionLength - a;

      const fem =
        (singleLoad?.valueOfLoading * b * a ** 2) / sectionLength ** 2;

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
      const steps = [];

      const fem = -(uniformLoad?.valueOfLoading * sectionLength ** 2) / 12;

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
      const steps = [];

      const fem = (uniformLoad?.valueOfLoading * sectionLength ** 2) / 12;

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
      const steps = [];

      const fem =
        -(11 * uniformLoad?.valueOfLoading * sectionLength ** 2) / 192;

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
      const steps = [];

      const fem = (5 * uniformLoad?.valueOfLoading * sectionLength ** 2) / 192;

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
  // console.log(supportRanges);

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
  const fixedEndedMoments = sections?.map((fem, i) => {
    const lr = `${i + 1}*${i + 2}`;
    const rl = `${i + 2}*${i + 1}`;
    const supportRange = supportRanges[i];
    const [p1, p2] = supportRange;
    const sectionLength = Math.abs(p2 - p1);
    const formulas = Object.entries(FEMformulas);
    const formI = formulas?.findIndex((formula) =>
      formula[1]?.isType(fem, sectionLength)
    );
    if (formI != -1) {
      const formula = formulas[formI][1];
      const resultLtR = formula.leftToRight(fem, sectionLength, lr);
      // console.log(i, resultLtR);
      const resultRtL = formula.rightToLeft(fem, sectionLength, rl);
      // console.log(i, resultRtL);
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
      return {
        lr: { fem: null, steps: [], name: lr },
        rl: { fem: null, steps: [], name: rl },
        section: fem,
      };
      // throw new Error("FEM formula not found");
    }
  });

  // console.log(sections);

  return {
    fixedEndedMoments,
  };
};
