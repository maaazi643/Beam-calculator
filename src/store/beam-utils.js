import { p } from "motion/react-client";
import { v4 as uuidv4 } from "uuid";

export const createNewSpan = (length = "", flexuralRigidity = "") => {
  return { id: uuidv4(), length: length, flexuralRigidity: flexuralRigidity };
};

export const createNewLoading = () => {
  return {
    id: uuidv4(),
    type: "",
    distanceFromLeft: "",
    valueOfLoading: "",
    spanOfLoading: "",
    openingValue: "",
    closingValue: "",
  };
};

export const supportEnums = Object.freeze({
  pinned: "pinned",
  roller: "roller",
  fixed: "fixed",
});

export const createNewSupport = (
  type = supportEnums.pinned,
  sinking = false,
  sinkingValue = "",
  distanceFromLeft = ""
) => {
  return {
    id: uuidv4(),
    type: type,
    sinking: sinking,
    sinkingValue: sinkingValue,
    distanceFromLeft: distanceFromLeft,
  };
};

export const loadingEnums = Object.freeze({
  single: "single",
  uniform: "uniform",
  varying: "varying",
});

export const createNewLoad = (
  type = loadingEnums.single,
  distanceFromLeft = "",
  valueOfLoading = "",
  spanOfLoading = "",
  openingValue = "",
  closingValue = ""
) => {
  return {
    id: uuidv4(),
    type: type,
    distanceFromLeft: distanceFromLeft,
    valueOfLoading: valueOfLoading,
    spanOfLoading: spanOfLoading,
    openingValue: openingValue,
    closingValue: closingValue,
  };
};

export const getBeamTotalLength = (beam) => {
  return beam?.spans?.reduce((acc, span) => +acc + +span.length, 0);
};

const widthOfSinglePointInPixel = 25;

export const getLoadPositionAndDimension = (beam, loadId, beamPixelLength) => {
  const load = beam?.loadings?.find((l) => l.id === loadId);
  const beamTotalLength = getBeamTotalLength(beam);

  let left = 0;
  let top = 0;
  let width = 0;
  let height = 0;

  if (load?.type === loadingEnums.single) {
    left = Math.abs(
      (load.distanceFromLeft / beamTotalLength) * 100 -
        ((widthOfSinglePointInPixel / beamPixelLength) * 100) / 2
    );
    top = 20;
    width = 2.2;
    height = 30;
  } else if (load?.type === loadingEnums.uniform) {
    left = (load.distanceFromLeft / beamTotalLength) * 100;
    top = 20;
    width = (load.spanOfLoading / beamTotalLength) * 100;
    height = 30;
  } else if (load?.type === loadingEnums.varying) {
    left = (load.distanceFromLeft / beamTotalLength) * 100;
    top = 20;
    width = (load.spanOfLoading / beamTotalLength) * 100;
    height = 30;
  }

  return { left, top, width, height };
};

const widthOfPinnedOrRollerSupportInPixel = 45;

export const getSupportPositionAndDimension = (
  beam,
  supportId,
  beamPixelLength
) => {
  const support = beam?.supports?.find((s) => s.id === supportId);
  const beamTotalLength = getBeamTotalLength(beam);

  let left = 0;
  let top = 0;

  if (support?.type === supportEnums.pinned) {
    console.log(support);
    left =
      (+support.distanceFromLeft / beamTotalLength) * 100 -
      ((widthOfPinnedOrRollerSupportInPixel / beamPixelLength) * 100) / 2;
    console.log(left);
    top = 50;
  }

  if (support?.type === supportEnums.roller) {
    left =
      (+support.distanceFromLeft / beamTotalLength) * 100 -
      ((widthOfPinnedOrRollerSupportInPixel / beamPixelLength) * 100) / 2;
    top = 50;
  }

  if (support?.type === supportEnums.fixed) {
    const atStart = support.distanceFromLeft == 0;
    left = atStart ? -1.3 : 100;
    top = 40;
  }

  return { left, top };
};

export const getMarkings = (beam) => {
  const totalBeamLength = getBeamTotalLength(beam);

  const supportsAndLoadings = [
    ...(beam?.supports || []),
    ...(beam?.loadings || []),
  ];
  supportsAndLoadings.sort((a, b) => a.distanceFromLeft - b.distanceFromLeft);

  let markings = [];
  supportsAndLoadings?.forEach((sal, i, arr) => {
    const prevSal = arr?.[i - 1];

    if (i === 0) {
      markings.push(0);
      return;
    }
    if (i === arr.length - 1) {
      markings.push(totalBeamLength);
      return;
    }

    if (sal?.spanOfLoading)
      markings.push(
        +sal?.distanceFromLeft,
        +sal?.distanceFromLeft + +sal?.spanOfLoading
      );
    else markings.push(+sal?.distanceFromLeft);

    if (prevSal?.spanOfLoading)
      markings.push(
        +prevSal?.distanceFromLeft,
        +prevSal?.distanceFromLeft + +prevSal?.spanOfLoading
      );
    else markings.push(+prevSal?.distanceFromLeft);
  });

  markings.sort((a, b) => a - b);

  const uniqueMarks = [...new Set(markings)];

  const markCoords = uniqueMarks
    .map((mark, i, arr) => {
      let leftInUnit,
        leftInPercentage,
        spacingInUnit,
        spacingInPercentage = 0;

      const nextMark = arr?.[i + 1];

      leftInUnit = mark;
      leftInPercentage = (leftInUnit / totalBeamLength) * 100;
      spacingInUnit = Math.abs(nextMark - mark);
      spacingInPercentage = (spacingInUnit / totalBeamLength) * 100;

      return {
        leftInUnit,
        leftInPercentage,
        spacingInUnit,
        spacingInPercentage,
      };
    })
    ?.slice(0, -1);

  return markCoords;
};
