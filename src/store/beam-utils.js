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
