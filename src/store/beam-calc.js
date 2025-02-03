import { loadingEnums, supportEnums } from "./beam-utils";
import { sprintf } from "sprintf-js";
import { lusolve } from "mathjs";

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
    leftToRight: (
      section,
      sectionLength,
      lr,
      isOverhangingAtLeft,
      isOverhangingAtRight
    ) => {
      const singleLoads = section.filter((s) => s.type === loadingEnums.single);
      const [singleLoad] = singleLoads;

      const w = +singleLoad?.valueOfLoading;

      if (isOverhangingAtLeft) {
        return {
          fem: 0,
          steps: [sprintf("`M_(F%s) = 0 Nm`", lr)],
        };
      }

      if (isOverhangingAtRight) {
        const fem = -w * sectionLength;
        return {
          fem: fem,
          steps: [
            sprintf("`M_(F%s) = -(w*l) Nm`", lr),
            sprintf("`M_(F%s) = -(%.2f*%.2f) Nm`", lr, w, sectionLength),
            sprintf("`M_(F%s) = %.2f Nm`", lr, fem),
          ],
        };
      }

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
    rightToLeft: (
      section,
      sectionLength,
      rl,
      isOverhangingAtLeft,
      isOverhangingAtRight
    ) => {
      const singleLoads = section.filter((s) => s.type === loadingEnums.single);
      const [singleLoad] = singleLoads;

      const w = +singleLoad?.valueOfLoading;

      if (isOverhangingAtLeft) {
        const fem = w * sectionLength;
        return {
          fem: fem,
          steps: [
            sprintf("`M_(F%s) = (w*l) Nm`", rl),
            sprintf("`M_(F%s) = (%.2f*%.2f) Nm`", rl, w, sectionLength),
            sprintf("`M_(F%s) = %.2f Nm`", rl, fem),
          ],
        };
      }

      if (isOverhangingAtRight) {
        return {
          fem: 0,
          steps: [sprintf("`M_(F%s) = 0 Nm`", rl)],
        };
      }

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
    freeMoment: (section, sectionLength, lr) => {
      const singleLoads = section.filter((s) => s.type === loadingEnums.single);
      const [singleLoad] = singleLoads;

      const w = +singleLoad?.valueOfLoading;

      const divisor = 4;
      const fm = (w * sectionLength) / divisor;

      const steps = [
        sprintf("`Span_(%s) = (w * l)/%.2f`", lr, divisor),
        sprintf(
          "`Span_(%s) = (%.2f * %.2f)/%.2f`",
          lr,
          w,
          sectionLength,
          divisor
        ),
        sprintf("`Span_(%s) = %.2f Nm`", lr, fm),
      ];

      return {
        fm: fm,
        steps: steps,
        type: "linear",
        distanceFromLeft: +singleLoad?.distanceFromLeft,
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
    leftToRight: (
      section,
      sectionLength,
      lr,
      isOverhangingAtLeft,
      isOverhangingAtRight
    ) => {
      const [firstItem] = section;
      const singleLoads = section.filter((s) => s.type === loadingEnums.single);
      const [singleLoad] = singleLoads;

      const w = +singleLoad?.valueOfLoading;

      if (isOverhangingAtLeft) {
        return {
          fem: 0,
          steps: [sprintf("`M_(F%s) = 0 Nm`", lr)],
        };
      }

      if (isOverhangingAtRight) {
        const fem = -w * sectionLength;
        return {
          fem: fem,
          steps: [
            sprintf("`M_(F%s) = -(w*l) Nm`", lr),
            sprintf("`M_(F%s) = -(%.2f*%.2f) Nm`", lr, w, sectionLength),
            sprintf("`M_(F%s) = %.2f Nm`", lr, fem),
          ],
        };
      }

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
    rightToLeft: (
      section,
      sectionLength,
      rl,
      isOverhangingAtLeft,
      isOverhangingAtRight
    ) => {
      const [firstItem] = section;
      const singleLoads = section.filter((s) => s.type === loadingEnums.single);
      const [singleLoad] = singleLoads;

      const w = +singleLoad?.valueOfLoading;

      if (isOverhangingAtLeft) {
        const fem = w * sectionLength;
        return {
          fem: fem,
          steps: [
            sprintf("`M_(F%s) = (w*l) Nm`", rl),
            sprintf("`M_(F%s) = (%.2f*%.2f) Nm`", rl, w, sectionLength),
            sprintf("`M_(F%s) = %.2f Nm`", rl, fem),
          ],
        };
      }

      if (isOverhangingAtRight) {
        return {
          fem: 0,
          steps: [sprintf("`M_(F%s) = 0 Nm`", rl)],
        };
      }

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
    freeMoment: (section, sectionLength, lr) => {
      const singleLoads = section.filter((s) => s.type === loadingEnums.single);
      const [singleLoad] = singleLoads;

      const [firstItem] = section;
      const w = +singleLoad?.valueOfLoading;
      const a = Math.abs(
        +singleLoad?.distanceFromLeft - +firstItem?.distanceFromLeft
      );
      const b = sectionLength - a;

      const fm = (w * a * b) / sectionLength;

      const steps = [
        sprintf("`Span_(%s) = (w * a * b)/l`", lr),
        sprintf(
          "`Span_(%s) = (%.2f * %.2f * %.2f)/%.2f`",
          lr,
          w,
          a,
          b,
          sectionLength
        ),
        sprintf("`Span_(%s) = %.2f Nm`", lr, fm),
      ];

      return {
        fm: fm,
        steps: steps,
        type: "linear",
        distanceFromLeft: +singleLoad?.distanceFromLeft,
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
    leftToRight: (
      section,
      sectionLength,
      lr,
      isOverhangingAtLeft,
      isOverhangingAtRight
    ) => {
      const uniformLoads = section.filter(
        (s) => s.type === loadingEnums.uniform
      );
      const [uniformLoad] = uniformLoads;
      const w = +uniformLoad?.valueOfLoading;

      if (isOverhangingAtLeft) {
        return {
          fem: 0,
          steps: [sprintf("`M_(F%s) = 0 Nm`", lr)],
        };
      }

      if (isOverhangingAtRight) {
        const fem = -(w * sectionLength * sectionLength) / 2;
        return {
          fem: fem,
          steps: [
            sprintf("`M_(F%s) = -(w*l^2)/2 Nm`", lr),
            sprintf("`M_(F%s) = -(%.2f*%.2f^2)/2 Nm`", lr, w, sectionLength),
            sprintf("`M_(F%s) = %.2f Nm`", lr, fem),
          ],
        };
      }

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
    rightToLeft: (
      section,
      sectionLength,
      rl,
      isOverhangingAtLeft,
      isOverhangingAtRight
    ) => {
      const uniformLoads = section.filter(
        (s) => s.type === loadingEnums.uniform
      );
      const [uniformLoad] = uniformLoads;
      const w = +uniformLoad?.valueOfLoading;

      if (isOverhangingAtLeft) {
        const fem = (w * sectionLength * sectionLength) / 2;
        return {
          fem: fem,
          steps: [
            sprintf("`M_(F%s) = (w*l^2)/2 Nm`", rl),
            sprintf("`M_(F%s) = (%.2f*%.2f^2)/2 Nm`", rl, w, sectionLength),
            sprintf("`M_(F%s) = %.2f Nm`", rl, fem),
          ],
        };
      }

      if (isOverhangingAtRight) {
        return {
          fem: 0,
          steps: [sprintf("`M_(F%s) = 0 Nm`", rl)],
        };
      }

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
    freeMoment: (section, sectionLength, lr) => {
      const uniformLoads = section.filter(
        (s) => s.type === loadingEnums.uniform
      );
      const [uniformLoad] = uniformLoads;
      const distanceFromLeft = +uniformLoad?.distanceFromLeft;
      const distanceFromLeftFromPointLoad =
        distanceFromLeft + distanceFromLeft / 2;

      const w = +uniformLoad?.valueOfLoading;
      const divisor = 8;

      const fm = (w * sectionLength ** 2) / divisor;

      const steps = [
        sprintf("`Span_(%s) = (w * l^2)/%.2f`", lr, divisor),
        sprintf(
          "`Span_(%s) = (%.2f * %.2f ^ 2)/%.2f`",
          lr,
          w,
          sectionLength,
          divisor
        ),
        sprintf("`Span_(%s) = %.2f Nm`", lr, fm),
      ];

      return {
        fm: fm,
        steps: steps,
        type: "monotone",
        distanceFromLeft: distanceFromLeftFromPointLoad,
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
    leftToRight: (
      section,
      sectionLength,
      lr,
      isOverhangingAtLeft,
      isOverhangingAtRight
    ) => {
      const uniformLoads = section.filter(
        (s) => s.type === loadingEnums.uniform
      );
      const [uniformLoad] = uniformLoads;

      const w = +uniformLoad?.valueOfLoading;

      if (isOverhangingAtLeft) {
        return {
          fem: 0,
          steps: [sprintf("`M_(F%s) = 0 Nm`", lr)],
        };
      }

      if (isOverhangingAtRight) {
        const sectionLengthHalved = sectionLength / 2;
        const fem = -(w * sectionLengthHalved * sectionLengthHalved) / 8;
        return {
          fem: fem,
          steps: [
            sprintf("`M_(F%s) = -(w*l^2)/8 Nm`", lr),
            sprintf(
              "`M_(F%s) = -(%.2f*%.2f^2)/8 Nm`",
              lr,
              w,
              sectionLengthHalved
            ),
            sprintf("`M_(F%s) = %.2f Nm`", lr, fem),
          ],
        };
      }

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
    rightToLeft: (
      section,
      sectionLength,
      rl,
      isOverhangingAtLeft,
      isOverhangingAtRight
    ) => {
      const uniformLoads = section.filter(
        (s) => s.type === loadingEnums.uniform
      );
      const [uniformLoad] = uniformLoads;

      const w = +uniformLoad?.valueOfLoading;

      if (isOverhangingAtLeft) {
        const sectionLengthHalved = sectionLength / 2;
        const fem = (3 * w * sectionLengthHalved * sectionLengthHalved) / 8;
        return {
          fem: fem,
          steps: [
            sprintf("`M_(F%s) = 3(w*l^2)/8 Nm`", rl),
            sprintf(
              "`M_(F%s) = 3(%.2f*%.2f^2)/8 Nm`",
              rl,
              w,
              sectionLengthHalved
            ),
            sprintf("`M_(F%s) = %.2f Nm`", rl, fem),
          ],
        };
      }

      if (isOverhangingAtRight) {
        return {
          fem: 0,
          steps: [sprintf("`M_(F%s) = 0 Nm`", rl)],
        };
      }

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
    leftToRight: (
      section,
      sectionLength,
      lr,
      isOverhangingAtLeft,
      isOverhangingAtRight
    ) => {
      const varyingLoads = section.filter(
        (s) => s.type === loadingEnums.varying
      );
      const [varyingLoad] = varyingLoads;

      const w = +varyingLoad?.closingValue;

      if (isOverhangingAtLeft) {
        return {
          fem: 0,
          steps: [sprintf("`M_(F%s) = 0 Nm`", lr)],
        };
      }

      if (isOverhangingAtRight) {
        const fem = -(w * sectionLength * sectionLength) / 3;
        return {
          fem: fem,
          steps: [
            sprintf("`M_(F%s) = -(w*l^2)/3 Nm`", lr),
            sprintf("`M_(F%s) = -(%.2f*%.2f^2)/3 Nm`", lr, w, sectionLength),
            sprintf("`M_(F%s) = %.2f Nm`", lr, fem),
          ],
        };
      }

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
    rightToLeft: (
      section,
      sectionLength,
      rl,
      isOverhangingAtLeft,
      isOverhangingAtRight
    ) => {
      const varyingLoads = section.filter(
        (s) => s.type === loadingEnums.varying
      );
      const [varyingLoad] = varyingLoads;

      const w = +varyingLoad?.closingValue;

      if (isOverhangingAtLeft) {
        const fem = (w * sectionLength * sectionLength) / 6;
        return {
          fem: fem,
          steps: [
            sprintf("`M_(F%s) = (w*l^2)/6 Nm`", rl),
            sprintf("`M_(F%s) = (%.2f*%.2f^2)/6 Nm`", rl, w, sectionLength),
            sprintf("`M_(F%s) = %.2f Nm`", rl, fem),
          ],
        };
      }

      if (isOverhangingAtRight) {
        return {
          fem: 0,
          steps: [sprintf("`M_(F%s) = 0 Nm`", rl)],
        };
      }

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
      const varyingLoads = section.filter(
        (s) => s.type === loadingEnums.varying
      );
      const [varyingLoad] = varyingLoads;
      const w = +varyingLoad?.closingValue;
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
      const varyingLoads = section.filter(
        (s) => s.type === loadingEnums.varying
      );
      const [varyingLoad] = varyingLoads;
      const w = +varyingLoad?.closingValue;
      const loadSpan = +varyingLoad?.spanOfLoading;
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
    freeMoment: (section, sectionLength, lr) => {
      const varyingLoads = section.filter(
        (s) => s.type === loadingEnums.varying
      );
      const [varyingLoad] = varyingLoads;
      const [firstItem] = section;

      const w = +varyingLoad?.valueOfLoading;
      const distanceFromLeft =
        firstItem.distanceFromLeft +
        sectionLength -
        sectionLength / Math.sqrt(3);

      const fm = (w * sectionLength ** 2) / (9 * Math.sqrt(3));

      const steps = [
        sprintf("`Span_(%s) = (w * l ^ 2)/(9 * sqrt(3))`", lr),
        sprintf(
          "`Span_(%s) = (%.2f * %.2f ^ 2)/(9 * sqrt(3))`",
          lr,
          w,
          sectionLength
        ),
        sprintf("`Span_(%s) = %.2f Nm`", lr, fm),
      ];

      return {
        fm: fm,
        steps: steps,
        type: "monotone",
        distanceFromLeft: distanceFromLeft,
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
    leftToRight: (
      section,
      sectionLength,
      lr,
      isOverhangingAtLeft,
      isOverhangingAtRight
    ) => {
      const varyingLoads = section.filter(
        (s) => s.type === loadingEnums.varying
      );
      const [varyingLoad] = varyingLoads;

      const w = +varyingLoad?.openingValue;

      if (isOverhangingAtLeft) {
        return {
          fem: 0,
          steps: [sprintf("`M_(F%s) = 0 Nm`", lr)],
        };
      }

      if (isOverhangingAtRight) {
        const fem = -(w * sectionLength * sectionLength) / 3;
        return {
          fem: fem,
          steps: [
            sprintf("`M_(F%s) = -(w*l^2)/3 Nm`", lr),
            sprintf("`M_(F%s) = -(%.2f*%.2f^2)/3 Nm`", lr, w, sectionLength),
            sprintf("`M_(F%s) = %.2f Nm`", lr, fem),
          ],
        };
      }

      const sectionLengthPow = 2;
      const divisor = 20;
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
    rightToLeft: (
      section,
      sectionLength,
      rl,
      isOverhangingAtLeft,
      isOverhangingAtRight
    ) => {
      const varyingLoads = section.filter(
        (s) => s.type === loadingEnums.varying
      );
      const [varyingLoad] = varyingLoads;

      const w = +varyingLoad?.openingValue;

      if (isOverhangingAtLeft) {
        const fem = (w * sectionLength * sectionLength) / 3;
        return {
          fem: fem,
          steps: [
            sprintf("`M_(F%s) = (w*l^2)/3 Nm`", rl),
            sprintf("`M_(F%s) = (%.2f*%.2f^2)/3 Nm`", rl, w, sectionLength),
            sprintf("`M_(F%s) = %.2f Nm`", rl, fem),
          ],
        };
      }

      if (isOverhangingAtRight) {
        return {
          fem: 0,
          steps: [sprintf("`M_(F%s) = 0 Nm`", rl)],
        };
      }

      const sectionLengthPow = 2;
      const divisor = 30;
      const fem = (w * sectionLength ** sectionLengthPow) / divisor;
      const steps = [
        sprintf(
          "`M_(F%s) = (w * l^%.2f) / %.2f`",
          rl,
          sectionLengthPow,
          divisor
        ),
        sprintf(
          "`M_(F%s) = ((%.2f)(%.2f^%.2f)) / (%.2f)`",
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
      const varyingLoads = section.filter(
        (s) => s.type === loadingEnums.varying
      );
      const [varying] = varyingLoads;
      const w = +varying?.openingValue;
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
      const varyingLoads = section.filter(
        (s) => s.type === loadingEnums.varying
      );
      const [varyingLoad] = varyingLoads;
      const w = +varyingLoad?.openingValue;
      const loadSpan = +varyingLoad?.spanOfLoading;
      const sectionLength = loadSpan;
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
    freeMoment: (section, sectionLength, lr) => {
      const varyingLoads = section.filter(
        (s) => s.type === loadingEnums.varying
      );
      const [varyingLoad] = varyingLoads;
      const [firstItem] = section;

      const w = +varyingLoad?.valueOfLoading;
      const distanceFromLeft =
        firstItem.distanceFromLeft + sectionLength / Math.sqrt(3);

      const fm = (w * sectionLength ** 2) / (9 * Math.sqrt(3));

      const steps = [
        sprintf("`Span_(%s) = (w * l ^ 2)/(9 * sqrt(3))`", lr),
        sprintf(
          "`Span_(%s) = (%.2f * %.2f ^ 2)/(9 * sqrt(3))`",
          lr,
          w,
          sectionLength
        ),
        sprintf("`Span_(%s) = %.2f Nm`", lr, fm),
      ];

      return {
        fm: fm,
        steps: steps,
        type: "monotone",
        distanceFromLeft: distanceFromLeft,
      };
    },
  },
};

// FEMformulas["single-pinned-unequal"].isType([
//   {
//     id: "672d610a-3271-47e3-8443-e273b56446e8",
//     type: "pinned",
//     sinking: false,
//     sinkingValue: "",
//     distanceFromLeft: "9",
//   },
// ], 2);

export const getBeamAnalysis = (beam) => {
  // find ranges of true spans using supports
  const spans = beam?.spans?.slice() || [];
  const supports = beam?.supports?.slice() || [];
  const loadings = beam?.loadings?.slice() || [];
  const supportsAndLoading = [...supports, ...loadings];
  const isSingleSpanWithFixedEnds =
    spans?.length === 1 &&
    supports?.length === 2 &&
    supports?.every((sup) => sup?.type === supportEnums.fixed);

  const supportRanges = [];
  supports?.forEach((support, ind, arr) => {
    const prevSupport = arr[ind - 1];

    if (!prevSupport) return;

    supportRanges?.push([
      +prevSupport?.distanceFromLeft || 0,
      +support?.distanceFromLeft,
    ]);
  });

  // prevent missing first range and support
  if (supportRanges[0][0] !== 0) {
    supportRanges?.unshift([0, supportRanges[0][0]]);
  }

  // prevent missing last range
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
      console.log(section, sectionLength);
      throw new Error(
        "FEM formula not found for section " + JSON.stringify(supportRange)
      );
    }

    let isOverHangingAtLeft = false;
    let isOverhangingAtRight = false;
    if (i == 0) {
      const supportAtExtremeLeft = supports?.find(
        (support) => +support?.distanceFromLeft === 0
      );
      isOverHangingAtLeft = !supportAtExtremeLeft;
    }
    if (i == sections?.length - 1) {
      const supportAtExtremeRight = supports?.find(
        (support) => +support?.distanceFromLeft === lengthOfBeam
      );
      isOverhangingAtRight = !supportAtExtremeRight;
    }

    // if (isOverHangingAtLeft || isOverhangingAtRight) {
    //   throw new Error(
    //     "sorry cant solve overhanging beams, dkm i don try 🙃🙃🙃"
    //   );
    // }

    const formula = formulas[formI][1];
    const resultLtR = formula.leftToRight(
      section,
      sectionLength,
      lr,
      isOverHangingAtLeft,
      isOverhangingAtRight
    );
    const resultRtL = formula.rightToLeft(
      section,
      sectionLength,
      rl,
      isOverHangingAtLeft,
      isOverhangingAtRight
    );

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

  const MAXIMUM_NUMBER_OF_SLOPES = isSingleSpanWithFixedEnds ? 0 : sections?.length + 1;
  const momentEquationMap = {};

  // making slope deflection equations for each span
  const slopesDeflectionEquations = supportRanges.map((supportRange, i) => {
    const span = spans?.[i];
    const spanLength = +span?.length;
    const lr = fixedEndedMoments?.[i]?.lr?.name;
    const rl = fixedEndedMoments?.[i]?.rl?.name;
    const [l, r] = lr.split(".");
    const leftPoint = supportRange[0];
    const rightPoint = supportRange[1];
    const femLr = fixedEndedMoments?.[i]?.lr?.fem;
    const femRl = fixedEndedMoments?.[i]?.rl?.fem;

    const supportAtLeftPoint = supports?.find(
      (support) => +support?.distanceFromLeft === +leftPoint
    );
    const supportAtRightPoint = supports?.find(
      (support) => +support?.distanceFromLeft === +rightPoint
    );

    if (!supportAtLeftPoint && !supportAtRightPoint) {
      throw new Error(
        "Supports not found for section: " + JSON.stringify(supportRange)
      );
    }

    // MIGHT COME BACK TO FIX
    const isOverHanging = !supportAtLeftPoint || !supportAtRightPoint;

    const slopeAtLeft =
      supportAtLeftPoint?.type === supportEnums.fixed || isOverHanging ? 0 : 1;
    const slopeAtRight =
      supportAtRightPoint?.type === supportEnums.fixed || isOverHanging ? 0 : 1;
    const sinkingAtLeft =
      supportAtLeftPoint?.sinking || isOverHanging
        ? 0
        : +supportAtLeftPoint?.sinkingValue;
    const sinkingAtRight =
      supportAtRightPoint?.sinking || isOverHanging
        ? 0
        : +supportAtRightPoint?.sinkingValue;
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
  if(isSingleSpanWithFixedEnds){
    equilibriumEquations?.push({
      steps: [
        sprintf("`M_1.2 = %.2f`", slopesDeflectionEquations[0]?.lr?.equation?.at(-1)),
        sprintf("`M_2.1 = %.2f`", slopesDeflectionEquations[0]?.rl?.equation?.at(-1)),
      ],
      equation: [null, null],
    });
  }else{
    supports?.forEach((sup, i) => {
      // the is just to offset if the first support is not at zero
      let balancer = 0;
      const firstSupport = supports[0];
      if (+firstSupport?.distanceFromLeft !== 0) {
        balancer = 1;
      }

      const isFixed = sup?.type === supportEnums?.fixed;
      const forward = `${i + 1 + balancer}.${i + 2 + balancer}`;
      const backward = `${i + 1 + balancer}.${i + balancer}`;
      const lastSupportRange = supportRanges?.at(-1);
      const beamLength = lastSupportRange[1];
      const supportIsAtBeamEnd = +sup?.distanceFromLeft === +beamLength;
      const supportIsAtBeamStart = +sup?.distanceFromLeft === 0;

      if (isFixed) {
        return;
      }

      if (i == 0 && supportIsAtBeamStart) {
        const steps = [sprintf("`M_%s = 0`", forward)];

        equilibriumEquations?.push({
          steps: steps,
          equation: [forward, null],
        });
        return;
      }

      if (i == supports?.length - 1 && supportIsAtBeamEnd) {
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
  }

  // find all simultaneous equations
  const coefficients = [];
  const constants = [];
  const extraEquations = isSingleSpanWithFixedEnds ? [] : equilibriumEquations?.map((eqeq, ind) => {
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

  const slopeValues = isSingleSpanWithFixedEnds ? [] : lusolve(coefficientWithoutZeroColumns, constants);
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
  const moments = Object?.entries(momentEquationMap)?.map((entry) => {
    const [name, equation] = entry;
    const [l, r] = name.split(".");

    if(isSingleSpanWithFixedEnds){
      const moment = equation?.reduce((acc, num) => acc + num, 0);
      momentsMap[name] = moment;
      return {steps: [], name: name, moment: moment}
    }


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
        firstCoefficient ? sprintf("+ %.2f EIθ_%s", firstCoefficient, l) : "+0",
        secondCoefficient
          ? sprintf("+ %.2f EIθ_%s", secondCoefficient, r)
          : "+0",
        constant ? sprintf("+ %.2f", constant) : "+0"
      ),
      sprintf(
        "`M_%s = %s %s %s`",
        name,
        firstCoefficient
          ? sprintf("+ %.2f * %.2f", firstCoefficient, slopeAtLeft)
          : "+0",
        secondCoefficient
          ? sprintf("+ %.2f * %.2f", secondCoefficient, slopeAtRight)
          : "+0",
        constant ? sprintf("+ %.2f", constant) : "+0"
      ),
      sprintf("`M_%s = %.2f Nm`", name, moment),
    ];

    return { steps, name, moment };
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
  const finalReactionMaps = {};
  for (const [key, value] of Object.entries(reactionsMap)) {
    const point = key;
    const [main] = point.split(".");

    if (finalReactionMaps[main]) {
      finalReactionMaps[main] += value;
    } else {
      finalReactionMaps[main] = value;
    }
  }

  // find all vertical forces imposed by loadings
  const loadingVerticalForces = loadings?.map((load) => {
    if (load?.type === loadingEnums.single) {
      const w = -1 * +load?.valueOfLoading;
      return {
        force: w,
        distanceFromLeft: +load?.distanceFromLeft,
        type: load?.type,
        isLoading: true,
      };
    }
    if (load?.type === loadingEnums?.uniform) {
      const w = -1 * +load?.valueOfLoading * load?.spanOfLoading;
      return {
        force: w,
        distanceFromLeft: +load?.distanceFromLeft,
        type: load?.type,
        isLoading: true,
      };
    }
    if (load?.type === loadingEnums?.varying) {
      const w =
        (-1 *
          +load?.spanOfLoading *
          (+load?.openingValue + +load?.closingValue)) /
        2;
      return {
        force: w,
        distanceFromLeft: +load?.distanceFromLeft,
        type: load?.type,
        isLoading: true,
      };
    }
  });

  // add the - loadingVerticalForces plus the + reactions
  const allVerticalForces = [];
  sections?.forEach((_, i) => {
    const supportRange = supportRanges[i];
    const [p1, p2] = supportRange;
    const reaction1 = finalReactionMaps[`${i + 1}`];
    const verticalReaction1 = {
      force: reaction1,
      distanceFromLeft: +p1,
      isLoading: false,
    };
    const verticalForcesInRange = loadingVerticalForces?.filter(
      (vf) => +vf?.distanceFromLeft >= p1 && +vf?.distanceFromLeft < p2
    );

    allVerticalForces.push(verticalReaction1, ...verticalForcesInRange);

    if (i == sections.length - 1) {
      const reaction2 = finalReactionMaps[`${i + 2}`];
      const verticalReaction2 = {
        force: reaction2,
        distanceFromLeft: +p2,
        isLoading: false,
      };
      allVerticalForces.push(verticalReaction2);
    }
  });

  // find shear forces
  const shearForces = [];
  allVerticalForces?.reduce((acc, verticalForce, i) => {
    const force = verticalForce?.force;
    const distanceFromLeft = verticalForce?.distanceFromLeft;

    if (i == 0) {
      const resolvedForce = force;
      const steps = [
        sprintf(
          '`S.F " at " %.2f m = %.2f N`',
          distanceFromLeft,
          resolvedForce
        ),
      ];
      shearForces.push({
        force: resolvedForce,
        steps: steps,
        distanceFromLeft: distanceFromLeft,
      });

      return resolvedForce;
    } else if (i == allVerticalForces.length - 1) {
      const resolvedForceLeft = acc;
      let steps = [
        sprintf(
          '`S.F " at just left of " %.2f m = %.2f N`',
          distanceFromLeft,
          resolvedForceLeft
        ),
      ];

      shearForces.push({
        force: resolvedForceLeft,
        steps: steps,
        distanceFromLeft: distanceFromLeft,
      });

      const resolvedForce = acc + force;
      steps = [
        sprintf(
          '`S.F " at " %.2f m = %.2f + %.2f N`',
          distanceFromLeft,
          acc,
          force
        ),
        sprintf(
          '`S.F " at " %.2f m = %.2f N`',
          distanceFromLeft,
          resolvedForce
        ),
      ];

      shearForces.push({
        force: resolvedForce,
        steps: steps,
        distanceFromLeft: distanceFromLeft,
      });

      return resolvedForce;
    } else {
      const resolvedForceLeft = acc;

      if (
        verticalForce?.isLoading &&
        verticalForce?.type != loadingEnums?.single
      ) {
        return acc + force;
      }

      let steps = [
        sprintf(
          '`S.F " just left of " %.2f m = %.2f N`',
          distanceFromLeft,
          resolvedForceLeft
        ),
      ];

      shearForces.push({
        force: resolvedForceLeft,
        steps: steps,
        distanceFromLeft: distanceFromLeft,
      });

      const resolvedForceRight = acc + force;
      steps = [
        sprintf(
          '`S.F " just right of " %.2f m = %.2f + %.2f N`',
          distanceFromLeft,
          acc,
          force
        ),
        sprintf(
          '`S.F " at just right of " %.2f m = %.2f N`',
          distanceFromLeft,
          resolvedForceRight
        ),
      ];

      shearForces.push({
        force: resolvedForceRight,
        steps: steps,
        distanceFromLeft: distanceFromLeft,
      });

      return resolvedForceRight;
    }
  }, 0);

  // [a, b, c, d, e] -> [[a,b], [b,c], [c,d], [d,e]]
  const shearForceDiagramPoints = [];
  shearForces?.forEach((shearForce, i, arr) => {
    if (i == arr.length - 1) return;
    const nextShearForce = arr?.[i + 1];
    shearForceDiagramPoints?.push({
      type: "monotone",
      points: [
        { ...shearForce, force: +shearForce?.force?.toFixed(2) },
        { ...nextShearForce, force: +nextShearForce?.force?.toFixed(2) },
      ],
    });
  });

  const freeMoments = sections?.map((section, i) => {
    const lr = `${i + 1}.${i + 2}`;
    const supportRange = supportRanges[i];
    const [p1, p2] = supportRange;
    const sectionLength = Math.abs(p2 - p1);
    const formulas = Object.entries(FEMformulas);
    const formI = formulas?.findIndex((formula) =>
      formula[1]?.isType(section, sectionLength)
    );

    if (formI === -1) {
      throw new Error(
        "Free moment formula not found for section " +
          JSON.stringify(supportRange)
      );
    }

    const formula = formulas[formI][1];

    const result = formula?.freeMoment(section, sectionLength, lr);

    return {
      fm: result?.fm?.toFixed(2),
      steps: result?.steps,
      name: lr,
      type: result?.type,
      distanceFromLeft: result?.distanceFromLeft,
    };
  });

  const freeMomentsDiagram = freeMoments?.map((frm, i) => {
    const supportRange = supportRanges[i];
    const [p1, p2] = supportRange;
    const { fm, type, distanceFromLeft } = frm;
    return {
      type: type,
      points: [
        { distanceFromLeft: p1, moment: 0 },
        { distanceFromLeft: distanceFromLeft, moment: fm },
        { distanceFromLeft: p2, moment: 0 },
      ],
    };
  });

  // { '1.2': -29.5, '2.1': 37, '2.3': -37, '3.2': 56.5 } -> { '1.2': -29.5, '3.2': 56.5 }
  const combinedMomentsMap = {};
  Object.entries(momentsMap)?.forEach(([key, value]) => {
    const newKey = key.split(".")[0]; // Extract the first part of the key

    if (!(newKey in combinedMomentsMap) || value > combinedMomentsMap[newKey]) {
      combinedMomentsMap[newKey] = Math.abs(value);
    }
  });
  const uniqueSupportRanges = flattenRanges(supportRanges);
  if (uniqueSupportRanges.length !== Object.keys(combinedMomentsMap).length) {
    throw new Error("Mismatch between support ranges and moments");
  }
  const endMomentsDiagram = uniqueSupportRanges?.map((distanceFromLeft, i) => {
    return {
      distanceFromLeft: distanceFromLeft,
      moment: +combinedMomentsMap[i + 1]?.toFixed(2),
    };
  });

  return {
    fixedEndedMoments,
    slopesDeflectionEquations,
    isSingleSpanWithFixedEnds,
    equilibriumEquations,
    extraEquations,
    slopeValuesMap,
    moments,
    reactions,
    finalReactionMaps,
    shearForces,
    shearForceDiagramPoints,
    freeMoments,
    freeMomentsDiagram,
    endMomentsDiagram,
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

function flattenRanges(ranges) {
  const result = new Set();

  ranges.forEach((range) => {
    range.forEach((value) => result.add(value));
  });

  return Array.from(result).sort((a, b) => a - b);
}
