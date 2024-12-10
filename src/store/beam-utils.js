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
  return beam?.spans?.reduce((acc, span) => acc + span.length, 0);
};

export const getLoadPositionAndDimension = (beam, loadId) => {
  const load = beam?.loadings?.find((l) => l.id === loadId);
  const beamTotalLength = getBeamTotalLength(beam);

  let left = 0;
  let top = 0;
  let width = 0;
  let height = 0;


  if (load?.type === loadingEnums.single) {
    left = (load.distanceFromLeft / beamTotalLength) * 100;
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
