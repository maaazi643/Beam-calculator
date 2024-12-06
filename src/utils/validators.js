import { isDecimal } from "validator";

export const MaxSpanLength = 10;
export const MaxSpanFlexuralRigidity = 1000;

export const validateSpanLength = (length) => {
  if (!isDecimal(length)) return [false, "Length must be a number."];
  if (length <= 0) return [false, "Length must be greater than 0."];
  if (length > MaxSpanLength) return [false, `Length must be less than ${MaxSpanLength}.`];
  return [true, ""];
};

export const validateSpanFlexuralRigidity = (flexuralRigidity) => {
  if (!isDecimal(flexuralRigidity)) return [false, "Flexural rigidity must be a number."];
  if (flexuralRigidity <= 0) return [false, "Flexural rigidity must be greater than 0."];
  if (flexuralRigidity > MaxSpanFlexuralRigidity) return [false, `Flexural rigidity must be less than ${MaxSpanFlexuralRigidity}.`];
  return [true, ""];
};