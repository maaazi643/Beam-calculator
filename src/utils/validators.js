import { supportEnums, loadingEnums } from "../store/beam-utils";

import { isDecimal } from "validator";
export const MaxSpanLength = 100;
export const MaxSpanFlexuralRigidity = 1000;

export const validateSpanLength = (length) => {
  if (!isDecimal(length)) return [false, "Length must be a number."];
  if (length <= 0) return [false, "Length must be greater than 0."];
  if (length > MaxSpanLength)
    return [false, `Length must be less than ${MaxSpanLength}.`];
  return [true, ""];
};

export const validateSpanFlexuralRigidity = (flexuralRigidity) => {
  if (!isDecimal(flexuralRigidity))
    return [false, "Flexural rigidity must be a number."];
  if (flexuralRigidity <= 0)
    return [false, "Flexural rigidity must be greater than 0."];
  if (flexuralRigidity > MaxSpanFlexuralRigidity)
    return [
      false,
      `Flexural rigidity must be less than ${MaxSpanFlexuralRigidity}.`,
    ];
  return [true, ""];
};

export const validateSupportSinkingValue = (supportType, value) => {
  if (!isDecimal(value)) return [false, "Sinking value must be a number."];
  if (supportType === supportEnums.SINKING_PINNED) return [true, ""];
  if (value <= 0) return [false, "Sinking value must be greater than 0."];
  return [true, ""];
};

export const validateSupportDistanceFromLeft = (supportType, value) => {
  if (!isDecimal(value)) return [false, "Distance from left must be a number."];
  // if (supportType === supportEnums.SINKING_PINNED) return [true, ""];
  if (value < 0) return [false, "Distance from left must be greater than 0."];
  return [true, ""];
};

export const validateLoadingDistanceFromLeft = (loadingType, value) => {
  if (!isDecimal(value)) return [false, "Distance from left must be a number."];
  if (value < 0) return [false, "Distance from left must be greater than 0."];
  return [true, ""];
};

export const validateLoadingValue = (loadingType, value) => {
  if (!isDecimal(value)) return [false, "Value must be a number."];
  if (value <= 0) return [false, "Value must be greater than 0."];
  return [true, ""];
};

export const validateLoadingSpan = (loadingType, value) => {
  if (!isDecimal(value)) return [false, "Value must be a number."];
  if (value <= 0) return [false, "Value must be greater than 0."];
  return [true, ""];
};

export const validateOpeningValue = (loadingType, value) => {
  // if (loadingType === loadingEnums.UNIFORM_DISTRIBUTED) return [true, ""];
  if (!isDecimal(value)) return [false, "Value must be a number."];
  if (value <= 0) return [false, "Value must be greater than 0."];
  return [true, ""];
};

export const validateClosingValue = (loadingType, value) => {
  // if (loadingType === loadingEnums.UNIFORM_DISTRIBUTED) return [true, ""];
  if (!isDecimal(value)) return [false, "Value must be a number."];
  if (value <= 0) return [false, "Value must be greater than 0."];
  return [true, ""];
};
