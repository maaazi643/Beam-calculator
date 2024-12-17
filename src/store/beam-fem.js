import { loadingEnums, supportEnums } from "./beam-utils";
import { sprintf } from "sprintf-js";
import { lusolve, } from "mathjs";

const FEMformulas = {
  "single-pinned-equal": {
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
    leftToRight: (section, sectionLength, lr, isOverhanging) => {
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
    rightToLeft: (section, sectionLength, rl, isOverhanging) => {
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
    reactionLeftToRight: (section, sectionLength, lr, rl, momentsMap, name) => {
      const [firstItem] = section;
      const singleLoads = section.filter((s) => s.type === loadingEnums.single);
      const [singleLoad] = singleLoads;
      const leftToCenterLength = Math.abs(
        +singleLoad?.distanceFromLeft - +firstItem?.distanceFromLeft
      );
      const centerToRightLength = Math.abs(sectionLength - leftToCenterLength);
      const momentLR = momentsMap[lr];
      const momentRl = momentsMap[rl];
      const w = +singleLoad?.valueOfLoading;

      const p1 = -1 * w * centerToRightLength;
      const p2 = momentLR;
      const p3 = momentRl;
      const numerator = p1 + p2 + p3;
      const reaction = -numerator / sectionLength;

      return {
        reaction: reaction,
        steps: [
          sprintf("`R_%s = -(-w*b + M_%s + M_%s)/l`", name, lr, rl),
          sprintf(
            "`R_%s = -(-%.2f*%.2f + %.2f + %.2f)/%.2f`",
            name,
            w,
            centerToRightLength,
            momentLR,
            momentRl,
            sectionLength
          ),
          sprintf("`R_%s = %.2f N`", name, reaction),
        ],
        name: name,
      };
    },
    reactionRightToLeft: (section, lr, reactionL, name) => {
      const singleLoads = section.filter((s) => s.type === loadingEnums.single);
      const [singleLoad] = singleLoads;
      const w = +singleLoad?.valueOfLoading;

      const reaction = w - reactionL;

      return {
        reaction: reaction,
        steps: [
          sprintf("`∑ V = 0`"),
          sprintf("`R_%s = %.2f - %.2f`", name, w, reactionL),
          sprintf("`R_%s = %.2f N`", name, reaction),
        ],
        name: name,
      };
    },
  },
  "single-pinned-unequal": {
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
    leftToRight: (section, sectionLength, lr, isOverhanging) => {
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
    rightToLeft: (section, sectionLength, rl, isOverhanging) => {
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
    reactionLeftToRight: (section, sectionLength, lr, rl, momentsMap, name) => {
      const [firstItem] = section;
      const singleLoads = section.filter((s) => s.type === loadingEnums.single);
      const [singleLoad] = singleLoads;
      const leftToCenterLength = Math.abs(
        +singleLoad?.distanceFromLeft - +firstItem?.distanceFromLeft
      );
      const centerToRightLength = Math.abs(sectionLength - leftToCenterLength);
      const momentLR = momentsMap[lr];
      const momentRl = momentsMap[rl];
      const w = +singleLoad?.valueOfLoading;

      const p1 = -1 * w * centerToRightLength;
      const p2 = momentLR;
      const p3 = momentRl;
      const numerator = p1 + p2 + p3;
      const reaction = -numerator / sectionLength;

      return {
        reaction: reaction,
        steps: [
          sprintf("`R_%s = -(-w*b + M_%s + M_%s)/l`", name, lr, rl),
          sprintf(
            "`R_%s = -(-%.2f*%.2f + %.2f + %.2f)/%.2f`",
            name,
            w,
            centerToRightLength,
            momentLR,
            momentRl,
            sectionLength
          ),
          sprintf("`R_%s = %.2f N`", name, reaction),
        ],
        name: name,
      };
    },
    reactionRightToLeft: (section, lr, reactionL, name) => {
      const singleLoads = section.filter((s) => s.type === loadingEnums.single);
      const [singleLoad] = singleLoads;
      const w = +singleLoad?.valueOfLoading;

      const reaction = w - reactionL;

      return {
        reaction: reaction,
        steps: [
          sprintf("`∑ V = 0`"),
          sprintf("`R_%s = %.2f - %.2f`", name, w, reactionL),
          sprintf("`R_%s = %.2f N`", name, reaction),
        ],
        name: name,
      };
    },
  },
  "uniform-fully-covered": {
    isType: (section, sectionLength) => {
      const uniformLoads = section.filter(
        (s) => s.type === loadingEnums.uniform
      );
      if (uniformLoads.length !== 1) return false;
      const [uniformLoad] = uniformLoads;
      return +uniformLoad?.spanOfLoading === +sectionLength;
    },
    leftToRight: (section, sectionLength, lr, isOverhanging) => {
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
    rightToLeft: (section, sectionLength, rl, isOverhanging) => {
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
    reactionLeftToRight: (section, sectionLength, lr, rl, momentsMap, name) => {
      const uniformLoads = section.filter(
        (s) => s.type === loadingEnums.uniform
      );
      const [uniformLoad] = uniformLoads;
      const w = +uniformLoad?.valueOfLoading;
      const loadSpan = +uniformLoad?.spanOfLoading;
      const loadSpanHalved = loadSpan / 2;
      const momentLR = momentsMap[lr];
      const momentRl = momentsMap[rl];
      const p1 = -1 * w * loadSpan * loadSpanHalved;
      const p2 = momentLR;
      const p3 = momentRl;
      const numerator = p1 + p2 + p3;
      const reaction = -numerator / sectionLength;

      return {
        reaction: reaction,
        steps: [
          sprintf("`R_%s = -(-w*l*(l/2) + M_%s + M_%s)/l`", name, lr, rl),
          sprintf(
            "`R_%s = -(-%.2f*%.2f*%.2f + %.2f + %.2f)/%.2f`",
            name,
            w,
            loadSpan,
            loadSpanHalved,
            momentLR,
            momentRl,
            sectionLength
          ),
          sprintf("`R_%s = %.2f N`", name, reaction),
        ],
        name: name,
      };
    },
    reactionRightToLeft: (section, lr, reactionL, name) => {
      const uniformLoads = section.filter(
        (s) => s.type === loadingEnums.uniform
      );
      const [uniformLoad] = uniformLoads;
      const w = +uniformLoad?.valueOfLoading;
      const loadSpan = +uniformLoad?.spanOfLoading;
      const p1 = w * loadSpan;
      const reaction = p1 - reactionL;

      return {
        reaction: reaction,
        steps: [
          sprintf("`∑ V = 0`"),
          sprintf("`R_%s = %.2f - %.2f`", name, p1, reactionL),
          sprintf("`R_%s = %.2f N`", name, reaction),
        ],
        name: name,
      };
    },
  },
  "uniform-half-covered-at-beginning": {
    isType: (section, sectionLength) => {
      const uniformLoads = section.filter(
        (s) => s.type === loadingEnums.uniform
      );
      if (uniformLoads.length !== 1) return false;
      const [uniformLoad] = uniformLoads;
      return +uniformLoad?.spanOfLoading === +sectionLength / 2;
    },
    leftToRight: (section, sectionLength, lr, isOverhanging) => {
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
    rightToLeft: (section, sectionLength, rl, isOverhanging) => {
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
    reactionLeftToRight: (section, sectionLength, lr, rl, momentsMap, name) => {
      const uniformLoads = section.filter(
        (s) => s.type === loadingEnums.uniform
      );
      const [uniformLoad] = uniformLoads;
      const w = +uniformLoad?.valueOfLoading;
      const momentLR = momentsMap[lr];
      const momentRl = momentsMap[rl];

      const p1 = (-1 * (3 * w * sectionLength ** 2)) / 8;
      const p2 = momentLR;
      const p3 = momentRl;
      const numerator = p1 + p2 + p3;
      const reaction = -numerator / sectionLength;

      return {
        reaction: reaction,
        steps: [
          sprintf("`R_%s = -(-3w*l*(l/8) + M_%s + M_%s)/l`", name, lr, rl),
          sprintf(
            "`R_%s = -(-3(%.2f*%.2f*%.2f)/8 + %.2f + %.2f)/%.2f`",
            name,
            w,
            sectionLength,
            sectionLength,
            momentLR,
            momentRl,
            sectionLength
          ),
          sprintf("`R_%s = %.2f N`", name, reaction),
        ],
        name: name,
      };
    },
    reactionRightToLeft: (section, lr, reactionL, name) => {
      const uniformLoads = section.filter(
        (s) => s.type === loadingEnums.uniform
      );
      const [uniformLoad] = uniformLoads;
      const w = +uniformLoad?.valueOfLoading;
      const loadSpan = +uniformLoad?.spanOfLoading;
      const sectionLength = loadSpan * 2;
      const p1 = w * sectionLength;
      const reaction = p1 - reactionL;

      return {
        reaction: reaction,
        steps: [
          sprintf("`∑ V = 0`"),
          sprintf("`R_%s = %.2f - %.2f`", name, p1, reactionL),
          sprintf("`R_%s = %.2f N`", name, reaction),
        ],
        name: name,
      };
    },
  },
  "varying-triangular-fully-covered-positive-slope": {
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
    leftToRight: (section, sectionLength, lr, isOverhanging) => {
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
    rightToLeft: (section, sectionLength, rl, isOverhanging) => {
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
    reactionLeftToRight: (section, sectionLength, lr, rl, momentsMap, name) => {
      const uniformLoads = section.filter(
        (s) => s.type === loadingEnums.uniform
      );
      const [uniformLoad] = uniformLoads;
      const w = +uniformLoad?.valueOfLoading;
      const momentLR = momentsMap[lr];
      const momentRl = momentsMap[rl];

      const p1 = (-1 * (w * sectionLength ** 2)) / 6;
      const p2 = momentLR;
      const p3 = momentRl;
      const numerator = p1 + p2 + p3;
      const reaction = -numerator / sectionLength;

      return {
        reaction: reaction,
        steps: [
          sprintf("`R_%s = -(-w*l*(l/6) + M_%s + M_%s)/l`", name, lr, rl),
          sprintf(
            "`R_%s = -(-(%.2f*%.2f*%.2f)/6 + %.2f + %.2f)/%.2f`",
            name,
            w,
            sectionLength,
            sectionLength,
            momentLR,
            momentRl,
            sectionLength
          ),
          sprintf("`R_%s = %.2f N`", name, reaction),
        ],
        name: name,
      };
    },
    reactionRightToLeft: (section, lr, reactionL, name) => {
      const uniformLoads = section.filter(
        (s) => s.type === loadingEnums.uniform
      );
      const [uniformLoad] = uniformLoads;
      const w = +uniformLoad?.valueOfLoading;
      const loadSpan = +uniformLoad?.spanOfLoading;
      const sectionLength = loadSpan * 2;
      const p1 = (w * sectionLength) / 2;
      const reaction = p1 - reactionL;

      return {
        reaction: reaction,
        steps: [
          sprintf("`∑ V = 0`"),
          sprintf("`R_%s = %.2f - %.2f`", name, p1, reactionL),
          sprintf("`R_%s = %.2f N`", name, reaction),
        ],
        name: name,
      };
    },
  },
  "varying-triangular-fully-covered-negative-slope": {
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
    leftToRight: (section, sectionLength, lr, isOverhanging) => {
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
    rightToLeft: (section, sectionLength, rl, isOverhanging) => {
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
    reactionLeftToRight: (section, sectionLength, lr, rl, momentsMap, name) => {
      const uniformLoads = section.filter(
        (s) => s.type === loadingEnums.uniform
      );
      const [uniformLoad] = uniformLoads;
      const w = +uniformLoad?.valueOfLoading;
      const momentLR = momentsMap[lr];
      const momentRl = momentsMap[rl];

      const p1 = (-1 * (w * sectionLength ** 2)) / 3;
      const p2 = momentLR;
      const p3 = momentRl;
      const numerator = p1 + p2 + p3;
      const reaction = -numerator / sectionLength;

      return {
        reaction: reaction,
        steps: [
          sprintf("`R_%s = -(-w*l*(l/3) + M_%s + M_%s)/l`", name, lr, rl),
          sprintf(
            "`R_%s = -(-(%.2f*%.2f*%.2f)/3 + %.2f + %.2f)/%.2f`",
            name,
            w,
            sectionLength,
            sectionLength,
            momentLR,
            momentRl,
            sectionLength
          ),
          sprintf("`R_%s = %.2f N`", name, reaction),
        ],
        name: name,
      };
    },
    reactionRightToLeft: (section, lr, reactionL, name) => {
      const uniformLoads = section.filter(
        (s) => s.type === loadingEnums.uniform
      );
      const [uniformLoad] = uniformLoads;
      const w = +uniformLoad?.valueOfLoading;
      const loadSpan = +uniformLoad?.spanOfLoading;
      const sectionLength = loadSpan * 2;
      const p1 = (w * sectionLength) / 2;
      const reaction = p1 - reactionL;

      return {
        reaction: reaction,
        steps: [
          sprintf("`∑ V = 0`"),
          sprintf("`R_%s = %.2f - %.2f`", name, p1, reactionL),
          sprintf("`R_%s = %.2f N`", name, reaction),
        ],
        name: name,
      };
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

  if (spans?.length > supportRanges?.length) {
    const lastSpan = spans?.at(-1);
    const lastSupportRange = supportRanges?.at(-1);
    supportRanges?.push([
      lastSupportRange[1],
      lastSupportRange[1] + +lastSpan?.length,
    ]);
  }
  const lengthOfBeam = supportRanges?.at(-1)[1] - supportRanges[0][0];

  // find members(supports/loading) that belong to a span section
  const sections = supportRanges?.map((range, i) => {
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

    if (formI === -1) {
      throw new Error(
        "FEM formula not found for section " + JSON.stringify(supportRange)
      );
    }

    let isOverhanging = false;
    if (i == 0) {
      const supportAtExtremeLeft = supports?.find(
        (support) => +support?.distanceFromLeft === 0
      );
      isOverhanging = !supportAtExtremeLeft ? true : false;
    }
    if (i == sections?.length - 1) {
      const supportAtExtremeRight = supports?.find(
        (support) => +support?.distanceFromLeft === lengthOfBeam
      );
      isOverhanging = !supportAtExtremeRight ? true : false;
    }

    if (isOverhanging) {
      throw new Error(
        "sorry cant solve overhanging beams, dkm i don try 🙃🙃🙃"
      );
    }

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
  });

  const MAXIMUM_NUMBER_OF_SLOPES = sections?.length + 1;
  const momentEquationMap = {};

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
    const spanLength = +span?.length;
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
    const EI =
      span?.flexuralRigidity == "" || span?.flexuralRigidity == "0"
        ? 1
        : +span?.flexuralRigidity;
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

    // VERY IMPORTANT TO SIMULTANEOUS EQUATIONS
    const filledEquationL = fillEquationAtHoles(
      equationL,
      lr,
      MAXIMUM_NUMBER_OF_SLOPES
    );
    const filledEquationR = fillEquationAtHoles(
      equationR,
      lr,
      MAXIMUM_NUMBER_OF_SLOPES
    );
    momentEquationMap[lr] = filledEquationL;
    momentEquationMap[rl] = filledEquationR;

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
        EI,
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
        EI,
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
      lr: {
        name: lr,
        steps: stepsLr,
        equation: equationL,
        filled: filledEquationL,
      },
      rl: {
        name: rl,
        steps: stepsRl,
        equation: equationR,
        filled: filledEquationR,
      },
    };
  });

  // find all equilibrium equations
  const equilibriumEquations = [];
  supports?.forEach((sup, i) => {
    const prevSup = supports?.[i - 1];
    const nextSup = supports?.[i + 1];
    const isFixed = sup?.type === supportEnums?.fixed;
    const forward = `${i + 1}.${i + 2}`;
    const backward = `${i + 1}.${i}`;

    if (isFixed) {
      return;
    }

    if (!prevSup) {
      const steps = [sprintf("`M_%s = 0`", forward)];

      equilibriumEquations?.push({
        steps: steps,
        equation: [forward, null],
      });
      return;
    }

    if (!nextSup) {
      const steps = [sprintf("`M_%s = 0`", backward)];

      equilibriumEquations?.push({
        steps: steps,
        equation: [backward, null],
      });
      return;
    }

    const steps = [sprintf("`M_%s + M_%s = 0`", backward, forward)];

    equilibriumEquations?.push({
      steps: steps,
      equation: [backward, forward],
    });
  });

  // find all simultaneous equations
  const coefficients = [];
  const constants = [];
  const extraEquations = equilibriumEquations?.map((eqeq, ind) => {
    const equation = eqeq?.equation;
    const [firstEq, secondEq] = equation;

    const firstEquation = momentEquationMap?.[firstEq];
    const secondEquation = secondEq
      ? momentEquationMap?.[secondEq]
      : firstEquation?.map((num) => (!isNaN(num) ? num : null));

    const combination = firstEquation?.map((num1, i) => {
      const num2 = secondEquation?.[i];

      return +num1 + +num2;
    });

    const coefficient = combination?.slice(0, -2);
    const constant = combination
      ?.slice(-2)
      .map((num) => +num * -1)
      .reduce((acc, num) => acc + num, 0);
    coefficients.push(coefficient);
    constants.push(constant);

    const steps = [
      sprintf(
        "`M_%s %s = 0`",
        firstEq,
        secondEq ? sprintf("+ M_%s", secondEq) : ""
      ),
      sprintf(
        "`%s + %s = 0`",
        firstEquation
          ?.map((num, i) => {
            if (!num) return "";
            const isLastOrSecondToLastNum =
              i === firstEquation?.length - 1 ||
              i === firstEquation?.length - 2;
            const unit = isLastOrSecondToLastNum ? "" : `EIθ_${i + 1}`;
            return sprintf("+ %.2f%s", num, unit);
          })
          ?.join(""),
        secondEquation
          ?.map((num, i) => {
            if (!num) return "";
            const isLastOrSecondToLastNum =
              i === secondEquation?.length - 1 ||
              i === secondEquation?.length - 2;
            const unit = isLastOrSecondToLastNum ? "" : `EIθ_${i + 1}`;
            return sprintf("+ %.2f%s", num, unit);
          })
          ?.join("")
      ),
      sprintf(
        "`%s = 0 ~ eq.%d`",
        combination
          ?.map((num, i) => {
            if (!num) return "";
            const isLastOrSecondToLastNum =
              i === firstEquation?.length - 1 ||
              i === firstEquation?.length - 2;
            const unit = isLastOrSecondToLastNum ? "" : `EIθ_${i + 1}`;
            return sprintf("+ %.2f%s", num, unit);
          })
          ?.join(""),
        ind + 1
      ),
    ];

    return {
      steps,
    };
  });

  // solving simultaneous equations
  const [coefficientWithoutZeroColumns, zeroColumnsIndexesRemoved] =
    removeZeroColumns(coefficients);

  const slopeValues = lusolve(coefficientWithoutZeroColumns, constants);
  const slopeValuesCopy = [...slopeValues];

  // find all slopes
  // adds slope to their appropriate place
  const slopeValuesMap = {};
  for (let i = 0; i < MAXIMUM_NUMBER_OF_SLOPES; i++) {
    const indexWasRemoved = zeroColumnsIndexesRemoved?.includes(i);
    const position = i + 1;
    if (indexWasRemoved) {
      slopeValuesMap[position] = {
        value: 0,
        steps: [sprintf("`EIθ_%s = 0`", position)],
      };
    } else {
      const value = slopeValuesCopy?.shift()[0];
      slopeValuesMap[position] = {
        value,
        steps: [sprintf("`EIθ_%s = %.2f`", position, value)],
      };
    }
  }

  // finding all moments
  const momentsMap = {};
  const moments = Object?.entries(momentEquationMap)
    // ?.slice(0,1)
    ?.map((entry) => {
      const [name, equation] = entry;
      const [l, r] = name.split(".");
      let slopeAtLeft = slopeValuesMap?.[l]?.value;
      let slopeAtRight = slopeValuesMap?.[r]?.value;

      if (+l > +r) {
        slopeAtLeft = slopeValuesMap?.[r]?.value;
        slopeAtRight = slopeValuesMap?.[l]?.value;
      }

      const filteredEquation = equation?.filter((num) => num !== null);

      if (filteredEquation?.length !== 4) {
        throw new Error("Invalid moment equation");
      }

      const [firstCoefficient, secondCoefficient] = filteredEquation;
      const constant = filteredEquation
        ?.slice(-2)
        ?.reduce((acc, num) => acc + num, 0);
      const p1 = slopeAtLeft * firstCoefficient;
      const p2 = slopeAtRight * secondCoefficient;
      const moment = p1 + p2 + constant;
      momentsMap[name] = moment;

      const steps = [
        sprintf(
          "`M_%s = %s %s %s`",
          name,
          firstCoefficient ? sprintf("+ %.2f EIθ_%s", firstCoefficient, l) : "",
          secondCoefficient
            ? sprintf("+ %.2f EIθ_%s", secondCoefficient, r)
            : "",
          constant ? sprintf("+ %.2f", constant) : ""
        ),
        sprintf(
          "`M_%s = %s %s %s`",
          name,
          firstCoefficient
            ? sprintf("+ %.2f * %.2f", firstCoefficient, slopeAtLeft)
            : "",
          secondCoefficient
            ? sprintf("+ %.2f * %.2f", secondCoefficient, slopeAtRight)
            : "",
          constant ? sprintf("+ %.2f", constant) : ""
        ),
        sprintf("`M_%s = %.2f Nm`", name, moment),
      ];

      return { steps };
    });

  // finding reaction forces
  const reactionsMap = {};
  const reactions = sections.map((section, i) => {
    const momentKeys = Object.keys(momentsMap);
    const l = `${i + 1}`;
    const lName =
      momentKeys?.filter((k) => k?.startsWith(l))?.length > 1
        ? `${l}.${i + 1}`
        : l;
    const r = `${i + 2}`;
    const rName =
      momentKeys?.filter((k) => k?.startsWith(r))?.length > 1
        ? `${r}.${i + 1}`
        : r;
    const lr = `${l}.${r}`;
    const rl = `${r}.${l}`;
    const supportRange = supportRanges[i];
    const [p1, p2] = supportRange;
    const sectionLength = Math.abs(p2 - p1);
    const formulas = Object.entries(FEMformulas);
    const formI = formulas?.findIndex((formula) =>
      formula[1]?.isType(section, sectionLength)
    );

    if (formI === -1) {
      throw new Error("Cant find reactions at: ", JSON.stringify(section));
    }

    const formula = formulas[formI][1];

    const reactionLR = formula.reactionLeftToRight(
      section,
      sectionLength,
      lr,
      rl,
      momentsMap,
      lName
    );
    reactionsMap[lName] = reactionLR.reaction;
    const reactionRL = formula.reactionRightToLeft(
      section,
      lr,
      reactionLR.reaction,
      rName
    );
    reactionsMap[rName] = reactionRL.reaction;

    return {
      lr: {
        reaction: reactionLR.reaction,
        steps: reactionLR.steps,
        name: lr,
      },
      rl: {
        reaction: reactionRL.reaction,
        steps: reactionRL.steps,
        name: rl,
      },
      section: section,
    };
  });

  // balance the above reaction force, sum duplicates
  const finalReactionMaps = {}
  for (const [key, value] of Object.entries(reactionsMap)) {
    const point = key;
    const [main] = point.split(".");

    if (finalReactionMaps[main]) {
      finalReactionMaps[main] += value;
    } else {
      finalReactionMaps[main] = value;
    }
  }

  return {
    fixedEndedMoments,
    slopesDeflectionEquations,
    equilibriumEquations,
    extraEquations,
    slopeValuesMap,
    moments,
    reactions,
    finalReactionMaps,
  };
};

function fillEquationAtHoles(array, point, maxLength) {
  const newArray = [];

  const [l, r] = point.split(".");

  for (let i = 0; i < maxLength; i++) {
    if (i + 1 === +l) {
      newArray?.push(array[0]);
      continue;
    }
    if (i + 1 === +r) {
      newArray?.push(array[1]);
      continue;
    }
    newArray?.push(null);
  }

  newArray?.push(...array.slice(-2));

  return newArray;
}

function removeZeroColumns(matrix) {
  // Initialize an array to store indexes of columns to remove
  let columnsToRemove = [];

  // Determine the number of rows and columns
  const rows = matrix.length;
  const cols = matrix[0]?.length || 0;

  // Loop through each column
  for (let col = 0; col < cols; col++) {
    let isZeroColumn = true;

    // Check if all elements in the column are zero
    for (let row = 0; row < rows; row++) {
      if (matrix[row][col] !== 0) {
        isZeroColumn = false;
        break;
      }
    }

    // If column is all zeros, mark it for removal
    if (isZeroColumn) {
      columnsToRemove.push(col);
    }
  }

  // Create a new matrix without the zero columns
  const newMatrix = matrix.map((row) =>
    row.filter((_, colIndex) => !columnsToRemove.includes(colIndex))
  );

  return [newMatrix, columnsToRemove];
}
