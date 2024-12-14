import { loadingEnums } from "./beam-utils"
import { sprintf } from "sprintf-js"

const FEMformulas = {
    "single-pinned-equal": {
        leftToRight: (section, sectionLength, lr) => {
            const singleLoads = section.filter((s) => s.type === loadingEnums.single)
            const [singleLoad] = singleLoads

            const w = +singleLoad?.valueOfLoading
            const divisor = 8
            const fem = -(w * sectionLength) / divisor

            const steps = [
                sprintf("`M_(F%s) = -(w * l)/%.2f`", lr, divisor),
                sprintf("`M_(F%s) = -((%.2f)(%.2f))/%.2f`", lr, w, sectionLength, divisor),
                sprintf("`M_(F%s) = %.2f Nm`", lr, fem),
            ]

            return {
                fem: fem,
                steps: steps,
            }
        },
        rightToLeft: (section, sectionLength, rl) => {
            const singleLoads = section.filter((s) => s.type === loadingEnums.single)
            const [singleLoad] = singleLoads

            const w = +singleLoad?.valueOfLoading
            const divisor = 8
            const fem = (w * sectionLength) / divisor

            const steps = [
                sprintf("`M_(F%s) = (w * l)/%.2f`", rl, divisor),
                sprintf("`M_(F%s) = ((%.2f)(%.2f))/8`", rl, w, sectionLength, divisor),
                sprintf("`M_(F%s) = %.2f Nm`", rl, fem),
            ]

            return {
                fem: fem,
                steps: steps,
            }
        },
        isType: (section, sectionLength) => {
            const [firstItem] = section
            const singleLoads = section.filter((s) => s.type === loadingEnums.single)
            if (singleLoads.length != 1) return false
            const [singleLoad] = singleLoads
            const relativeLengthOfSingleLoad = Math.abs(+singleLoad?.distanceFromLeft - +firstItem?.distanceFromLeft)
            const halfLength = sectionLength / 2

            return relativeLengthOfSingleLoad === halfLength
        },
    },
    "single-pinned-unequal": {
        leftToRight: (section, sectionLength, lr) => {
            const [firstItem] = section
            const singleLoads = section.filter((s) => s.type === loadingEnums.single)
            const [singleLoad] = singleLoads

            const w = +singleLoad?.valueOfLoading
            const a = Math.abs(+singleLoad?.distanceFromLeft - +firstItem?.distanceFromLeft)
            const b = sectionLength - a
            const bPow = 2
            const sectionLengthPow = 2
            const fem = -(w * a * b ** bPow) / sectionLength ** sectionLengthPow

            const steps = [
                sprintf("`M_(F%s) = -(w * a * b^%.2f) / l^%.2f`", lr, bPow, sectionLengthPow),
                sprintf("`M_(F%s) = -((%.2f)(%.2f)(%.2f^%.2f))/(%.2f^%.2f)`", lr, w, a, b, bPow, sectionLength, sectionLengthPow),
                sprintf("`M_(F%s) = %.2f Nm`", lr, fem),
            ]

            return {
                fem: fem,
                steps: steps,
            }
        },
        rightToLeft: (section, sectionLength, rl) => {
            const [firstItem] = section
            const singleLoads = section.filter((s) => s.type === loadingEnums.single)
            const [singleLoad] = singleLoads

            const w = +singleLoad?.valueOfLoading
            const a = Math.abs(+singleLoad?.distanceFromLeft - +firstItem?.distanceFromLeft)
            const b = sectionLength - a
            const aPow = 2
            const sectionLengthPow = 2
            const fem = (w * a ** aPow * b) / sectionLength ** sectionLengthPow

            const steps = [
                sprintf("`M_(F%s) = (w * a^%.2f * b)/(l^%.2f)`", rl, aPow, sectionLengthPow),
                sprintf("`M_(F%s) = ((%.2f)(%.2f^%.2f)(%.2f))/(%.2f^%.2f)`", rl, w, a, aPow, b, sectionLength, sectionLengthPow),
                sprintf("`M_(F%s) = %.2f Nm`", rl, fem),
            ]

            return {
                fem: fem,
                steps: steps,
            }
        },
        isType: (section, sectionLength) => {
            const [firstItem] = section
            const singleLoads = section.filter((s) => s.type === loadingEnums.single)
            if (singleLoads.length != 1) return false
            const [singleLoad] = singleLoads
            const relativeLengthOfSingleLoad = Math.abs(+singleLoad?.distanceFromLeft - +firstItem?.distanceFromLeft)
            const halfLength = sectionLength / 2

            return relativeLengthOfSingleLoad !== halfLength
        },
    },
    "uniform-fully-covered": {
        leftToRight: (section, sectionLength, lr) => {
            const uniformLoads = section.filter((s) => s.type === loadingEnums.uniform)
            const [uniformLoad] = uniformLoads

            const w = +uniformLoad?.valueOfLoading
            const divisor = 12
            const sectionLengthPow = 2
            const fem = -(w * sectionLength ** sectionLengthPow) / divisor

            const steps = [
                sprintf("`M_(F%s) = -(w * l^%.2f)/%.2f`", lr, sectionLengthPow, divisor),
                sprintf("`M_(F%s) = -((%.2f)(%.2f^%.2f))/%.2f`", lr, w, sectionLength, sectionLengthPow, divisor),
                sprintf("`M_(F%s) = %.2f Nm`", lr, fem),
            ]

            return {
                fem: fem,
                steps: steps,
            }
        },
        rightToLeft: (section, sectionLength, rl) => {
            const uniformLoads = section.filter((s) => s.type === loadingEnums.uniform)
            const [uniformLoad] = uniformLoads

            const w = +uniformLoad?.valueOfLoading
            const divisor = 12
            const sectionLengthPow = 2
            const fem = (w * sectionLength ** sectionLengthPow) / divisor

            const steps = [
                sprintf("`M_(F%s) = (w * l^%.2f)/%.2f`", rl, sectionLengthPow, divisor),
                sprintf("`M_(F%s) = ((%.2f)(%.2f^%.2f))/%.2f`", rl, w, sectionLength, sectionLengthPow, divisor),
                sprintf("`M_(F%s) = %.2f Nm`", rl, fem),
            ]

            return {
                fem: fem,
                steps: steps,
            }
        },
        isType: (section, sectionLength) => {
            const uniformLoads = section.filter((s) => s.type === loadingEnums.uniform)
            if (uniformLoads.length !== 1) return false
            const [uniformLoad] = uniformLoads
            return +uniformLoad?.spanOfLoading === +sectionLength
        },
    },
    "uniform-half-covered": {
        leftToRight: (section, sectionLength, lr) => {
            const uniformLoads = section.filter((s) => s.type === loadingEnums.uniform)
            const [uniformLoad] = uniformLoads

            const w = +uniformLoad?.valueOfLoading
            const sectionLengthPow = 2
            const divisor = 192
            const multiplier = 11

            const fem = -(multiplier * w * sectionLength ** sectionLengthPow) / divisor

            const steps = [
                sprintf("`M_(F%s) = -(%.2f * w * l^%.2f) / %.2f`", lr, multiplier, sectionLengthPow, divisor),
                sprintf("`M_(F%s) = -((%.2f)(%.2f)(%.2f^%.2f)) / (%.2f)`", lr, multiplier, w, sectionLength, sectionLengthPow, divisor),
                sprintf("`M_(F%s) = %.2f Nm`", lr, fem),
            ]

            return {
                fem: fem,
                steps: steps,
            }
        },
        rightToLeft: (section, sectionLength, rl) => {
            const uniformLoads = section.filter((s) => s.type === loadingEnums.uniform)
            const [uniformLoad] = uniformLoads

            const w = +uniformLoad?.valueOfLoading
            const sectionLengthPow = 2
            const divisor = 192
            const multiplier = 5

            const fem = (multiplier * w * sectionLength ** sectionLengthPow) / divisor

            const steps = [
                sprintf("`M_(F%s) = (%.2f * w * l^%.2f) / %.2f`", rl, multiplier, sectionLengthPow, divisor),
                sprintf("`M_(F%s) = ((%.2f)(%.2f)(%.2f^%.2f)) / (%.2f)`", rl, multiplier, w, sectionLength, sectionLengthPow, divisor),
                sprintf("`M_(F%s) = %.2f Nm`", rl, fem),
            ]

            return {
                fem: fem,
                steps: steps,
            }
        },
        isType: (section, sectionLength) => {
            const uniformLoads = section.filter((s) => s.type === loadingEnums.uniform)
            if (uniformLoads.length !== 1) return false
            const [uniformLoad] = uniformLoads
            return +uniformLoad?.spanOfLoading === +sectionLength / 2
        },
    },
    "varying-triangular-fully-covered-positive-slope": {
        leftToRight: (section, sectionLength, lr) => {
            const varyingLoads = section.filter((s) => s.type === loadingEnums.varying)
            const [varyingLoad] = varyingLoads

            const w = +varyingLoad?.closingValue
            const sectionLengthPow = 2
            const divisor = 30
            const fem = -(w * sectionLength ** sectionLengthPow) / divisor
            const steps = [
                sprintf("`M_(F%s) = -(w * l^%.2f) / %.2f`", lr, sectionLengthPow, divisor),
                sprintf("`M_(F%s) = -((%.2f)(%.2f^%.2f)) / (%.2f)`", lr, w, sectionLength, sectionLengthPow, divisor),
                sprintf("`M_(F%s) = %.2f Nm`", lr, fem),
            ]

            return {
                fem: fem,
                steps: steps,
            }
        },
        rightToLeft: (section, sectionLength, rl) => {
            const varyingLoads = section.filter((s) => s.type === loadingEnums.varying)
            const [varyingLoad] = varyingLoads

            const w = +varyingLoad?.closingValue
            const sectionLengthPow = 2
            const divisor = 20
            const fem = +(w * sectionLength ** sectionLengthPow) / divisor
            const steps = [
                sprintf("`M_(F%s) = +(w * l^%.2f) / %.2f`", rl, sectionLengthPow, divisor),
                sprintf("`M_(F%s) = +((%.2f)(%.2f^%.2f)) / (%.2f)`", rl, w, sectionLength, sectionLengthPow, divisor),
                sprintf("`M_(F%s) = %.2f Nm`", rl, fem),
            ]

            return {
                fem: fem,
                steps: steps,
            }
        },
        isType: (section, sectionLength) => {
            const varyingLoads = section.filter((s) => s.type === loadingEnums.varying)
            if (varyingLoads.length !== 1) return false
            const [varyingLoad] = varyingLoads
            const sameLengthAsSection = +varyingLoad?.spanOfLoading === +sectionLength
            const openingIsZero = +varyingLoad?.openingValue === 0
            const closingIsGreaterThanZero = +varyingLoad?.closingValue > 0
            return sameLengthAsSection && openingIsZero && closingIsGreaterThanZero
        },
    },
    "varying-triangular-fully-covered-negative-slope": {
        leftToRight: (section, sectionLength, lr) => {
            const varyingLoads = section.filter((s) => s.type === loadingEnums.varying)
            const [varyingLoad] = varyingLoads

            const w = +varyingLoad?.openingValue
            const sectionLengthPow = 2
            const divisor = 20
            const fem = (w * sectionLength ** sectionLengthPow) / divisor
            const steps = [
                sprintf("`M_(F%s) = (w * l^%.2f) / %.2f`", lr, sectionLengthPow, divisor),
                sprintf("`M_(F%s) = ((%.2f)(%.2f^%.2f)) / (%.2f)`", lr, w, sectionLength, sectionLengthPow, divisor),
                sprintf("`M_(F%s) = %.2f Nm`", lr, fem),
            ]

            return {
                fem: fem,
                steps: steps,
            }
        },
        rightToLeft: (section, sectionLength, rl) => {
            const varyingLoads = section.filter((s) => s.type === loadingEnums.varying)
            const [varyingLoad] = varyingLoads

            const w = +varyingLoad?.openingValue
            const sectionLengthPow = 2
            const divisor = 30
            const fem = -(w * sectionLength ** sectionLengthPow) / divisor
            const steps = [
                sprintf("`M_(F%s) = -(w * l^%.2f) / %.2f`", rl, sectionLengthPow, divisor),
                sprintf("`M_(F%s) = -((%.2f)(%.2f^%.2f)) / (%.2f)`", rl, w, sectionLength, sectionLengthPow, divisor),
                sprintf("`M_(F%s) = %.2f Nm`", rl, fem),
            ]

            return {
                fem: fem,
                steps: steps,
            }
        },
        isType: (section, sectionLength) => {
            const varyingLoads = section.filter((s) => s.type === loadingEnums.varying)
            if (varyingLoads.length !== 1) return false
            const [varyingLoad] = varyingLoads
            const sameLengthAsSection = +varyingLoad?.spanOfLoading === +sectionLength
            const closingIsZero = +varyingLoad?.closingValue === 0
            const openingIsGreaterThanZero = +varyingLoad?.openingValue > 0
            return sameLengthAsSection && closingIsZero && openingIsGreaterThanZero
        },
    },
}

export const getBeamAnalysis = (beam) => {
    // find ranges of true spans using supports
    const spans = beam?.spans || []
    const supports = beam?.supports || []
    const loadings = beam?.loadings || []
    const supportsAndLoading = [...supports, ...loadings]

    const supportRanges = []
    supports?.forEach((support, ind, arr) => {
        const prevSupport = arr[ind - 1]

        if (!prevSupport) return

        supportRanges?.push([+prevSupport?.distanceFromLeft, +support?.distanceFromLeft])
    })
    // console.log(supportRanges)

    // find members(supports/loading) that belong to a span section
    const sections = supportRanges?.map((range) => {
        const [p1, p2] = range
        return supportsAndLoading
            ?.filter((sal) => +sal?.distanceFromLeft >= p1 && +sal?.distanceFromLeft < p2)
            ?.sort((a, b) => +a.distanceFromLeft - +b.distanceFromLeft)
    })

    // console.log(sections)

    // find fixed ended moments for each section
    const fixedEndedMoments = sections?.map((section, i) => {
        const lr = `${i + 1}.${i + 2}`
        const rl = `${i + 2}.${i + 1}`
        const supportRange = supportRanges[i]
        const [p1, p2] = supportRange
        const sectionLength = Math.abs(p2 - p1)
        const formulas = Object.entries(FEMformulas)
        const formI = formulas?.findIndex((formula) => formula[1]?.isType(section, sectionLength))
        if (formI != -1) {
            const formula = formulas[formI][1]
            const resultLtR = formula.leftToRight(section, sectionLength, lr)
            const resultRtL = formula.rightToLeft(section, sectionLength, rl)

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
            }
        } else {
            console.log(section)
            console.log(section)
            throw new Error("FEM formula not found for section " + JSON.stringify(supportRange))
            // return {
            //   lr: { fem: null, steps: [], name: lr },
            //   rl: { fem: null, steps: [], name: rl },
            //   section: fem,
            // };
        }
    })

    const DEFAULT_SINKING_VALUE = 0
    const DEFAULT_FLEXURAL_RIGIDITY = 1

    const slopesDeflectionEquations = fixedEndedMoments?.map((fem, i) => {
        const lr = fem?.lr?.name
        const l = lr.split(".")[0]
        const femLr = fem?.lr?.fem
        const rl = fem?.rl?.name
        const r = rl.split(".")[0]
        const femRl = fem?.rl?.fem

        if (supportRanges?.length !== spans?.length) {
            console.log("ERRR")
            throw new Error("Support ranges and spans do not match")
        }

        if (!supportRanges?.every((sup, i2) => sup[1] - sup[0] === +spans[i2]?.length)) {
            console.log("ERRR")
            throw new Error("Support ranges do not match spans")
        }

        const supportRange = supportRanges[i]

        const supportAtLeft = supports?.find((sup) => +sup.distanceFromLeft === +supportRange[0])

        if (!supportAtLeft) {
            console.log("ERRR")
            throw new Error("No support at left of span: ", i + 1)
        }

        const supportAtRight = supports?.find((sup) => +sup.distanceFromLeft === +supportRange[1])

        if (!supportAtRight) {
            console.log("ERRR")
            throw new Error("No support at right of span: ", i + 1)
        }

        const currentSpan = spans[i]
        const EI = +currentSpan?.flexuralRigidity || DEFAULT_FLEXURAL_RIGIDITY
        const spanLength = currentSpan?.length
        const sinkingAtLeft = supportAtLeft?.sinking ? +supportAtLeft?.sinkingValue : DEFAULT_SINKING_VALUE
        const sinkingAtRight = supportAtRight?.sinking ? +supportAtLeft?.sinkingValue : DEFAULT_SINKING_VALUE
        const slopeAtLeft = supportAtLeft?.type === "fixed" ? "0" : sprintf("θ_%s", l)
        const slopeAtRight = supportAtRight?.type === "fixed" ? "0" : sprintf("θ_%s", r)

        const multiplier = (2 * EI) / spanLength
        const p1Left = slopeAtLeft === "0" ? "0" : "2"
        const p2Left = slopeAtRight === "0" ? "0" : "1"
        const p3Left = -3 * sinkingAtLeft
        const p1LeftMul = multiplier * +p1Left
        const p2LeftMul = multiplier * +p2Left
        const p3LeftMul = multiplier * +p3Left

        const p1Right = slopeAtRight === "0" ? "0" : "2"
        const p2Right = slopeAtLeft === "0" ? "0" : "1"
        const p3Right = -3 * sinkingAtRight
        const p1RightMul = multiplier * +p1Right
        const p2RightMul = multiplier * +p2Right
        const p3RightMul = multiplier * +p3Right

        const momentEquationLR = [p1LeftMul + `*EI${slopeAtLeft}`, p2LeftMul + `*EI${slopeAtRight}`, p3LeftMul + `*EI`, femLr]
        const momentLRSteps = [
            sprintf("`M_(%s) = ((2 * EI) / l)(2θ_%s + θ_%s - 3Φ) + M_(F%s)`", lr, l, r, lr),
            sprintf("`EI = %.2f`", EI),
            sprintf("`l = %.2f m`", spanLength),
            sprintf("`Φ = %.2f m`", sinkingAtLeft),
            sprintf("`θ_%s , θ_%s = %s, %s`", l, r, slopeAtLeft, slopeAtRight),
            sprintf("`M_(F%s) = %.2f N/m`", lr, femLr),
            sprintf(
                "`M_(%s) = ((2 * %.2f * EI ) / %.2f)(2 * %s + %s - 3 * %.2f) + %.2f`",
                lr,
                EI,
                spanLength,
                slopeAtLeft,
                slopeAtRight,
                sinkingAtLeft,
                femLr
            ),
            sprintf(
                "`M_(%s) = (%.2f * EI)(%s %s %.2f) + %.2f`",
                lr,
                multiplier,
                p1Left == 0 ? "" : sprintf("%.2f * θ_%s + ", p1Left, l),
                p2Left == 0 ? "" : sprintf("%.2f * θ_%s + ", p2Left, r),
                p3Left,
                femLr
            ),
            sprintf(
                "`M_(%s) = %s %s %s %.2f`",
                lr,
                p1LeftMul == 0 ? "" : sprintf("%.2f*EI%s +", p1LeftMul, slopeAtLeft),
                p2LeftMul == 0 ? "" : sprintf("%.2f*EI%s +", p2LeftMul, slopeAtRight),
                p3LeftMul == 0 ? "" : sprintf("%.2f*EI%s +", p3LeftMul, sinkingAtLeft),
                femLr
            ),
        ]

        const momentEquationRL = [p1RightMul + `*EI${slopeAtRight}`, p2RightMul + `*EI${slopeAtLeft}`, p3RightMul + `*EI`, femRl]
        // const momentEquationRL = [p1RightMul, p2RightMul, p3RightMul, femRl]
        const momentRLSteps = [
            sprintf("`M_(%s) = ((2 * EI) / l)(2θ_%s + θ_%s - 3Φ) + M_(F%s)`", rl, r, l, rl),
            sprintf("`EI = %.2f`", EI),
            sprintf("`l = %.2f m`", spanLength),
            sprintf("`Φ = %.2f m`", sinkingAtRight),
            sprintf("`θ_%s , θ_%s = %s, %s`", l, r, slopeAtLeft, slopeAtRight),
            sprintf("`M_(F%s) = %.2f N/m`", rl, femRl),
            sprintf(
                "`M_(%s) = ((2 * %.2f * EI ) / %.2f)(2 * %s + %s - 3 * %.2f) + %.2f`",
                rl,
                EI,
                spanLength,
                slopeAtRight,
                slopeAtLeft,
                sinkingAtRight,
                femRl
            ),
            sprintf(
                "`M_(%s) = (%.2f * EI)(%s %s %.2f) + %.2f`",
                rl,
                multiplier,
                p1Right == 0 ? "" : sprintf("%.2f * θ_%s + ", p1Right, l),
                p2Right == 0 ? "" : sprintf("%.2f * θ_%s + ", p2Right, r),
                p3Right,
                femRl
            ),
            sprintf(
                "`M_(%s) = %s %s %s %.2f`",
                rl,
                p1RightMul == 0 ? "" : sprintf("%.2f*EI%s +", p1RightMul, slopeAtRight),
                p2RightMul == 0 ? "" : sprintf("%.2f*EI%s +", p2RightMul, slopeAtLeft),
                p3RightMul == 0 ? "" : sprintf("%.2f*EI%s +", p3RightMul, sinkingAtLeft),
                femRl
            ),
        ]

        return {
            lr: {
                equation: momentEquationLR,
                steps: momentLRSteps,
                name: lr,
            },
            rl: {
                equation: momentEquationRL,
                steps: momentRLSteps,
                name: rl,
            },
        }
    })

    // console.log(sections);

    return {
        fixedEndedMoments,
        slopesDeflectionEquations,
    }
}
