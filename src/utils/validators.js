import { supportEnums, loadingEnums } from "../store/beam-utils";
import { isDecimal } from "validator";
export const MaxSpanLength = 100000;
export const MaxSpanFlexuralRigidity = 100000;
export const MaxSinkingValue = 100000;
export const MaxLoadingValue = 100000;

export const validateSpanLength = (length) => {
  if (!isDecimal(length)) return [false, "Length must be a number."];
  if (length <= 0) return [false, "Length must be greater than 0."];
  if (length > MaxSpanLength)
    return [false, `Length must be less than ${MaxSpanLength}.`];
  return [true, ""];
};

export const validateSpanHeight = (height) => {
  if (!isDecimal(height)) return [false, "height must be a number."];
  if (height <= 0) return [false, "height must be greater than 0."];
  if (height > MaxSpanLength)
    return [false, `height must be less than ${MaxSpanLength}.`];
  return [true, ""];
};

export const validateSpanFlexuralRigidity = (flexuralRigidity) => {
  if (!isDecimal(flexuralRigidity))
    return [false, "Flexural rigidity must be a number."];
  if (flexuralRigidity < 0)
    return [false, "Flexural rigidity must be greater than 0."];
  if (flexuralRigidity > MaxSpanFlexuralRigidity)
    return [
      false,
      `Flexural rigidity must be less than ${MaxSpanFlexuralRigidity}.`,
    ];
  return [true, ""];
};

export const validateSpans = (spans) => {
  let errorMessage = "";

  if (spans?.length === 0) return [false, "Please add at least one span."];

  const spansAreValid = spans?.every((span, i) => {
    const spanLengthIsValid = validateSpanLength(span.length)[0];
    const spanFlexuralRigidityIsValid = validateSpanFlexuralRigidity(
      span.flexuralRigidity
    )[0];

    if (spanLengthIsValid && spanFlexuralRigidityIsValid) {
      return true;
    }
    if (!spanLengthIsValid || !spanFlexuralRigidityIsValid) {
      errorMessage = `Span ${i + 1} is invalid.`;
      return false;
    }
  });

  return [spansAreValid, errorMessage];
};

export const validateSupportSinkingValue = (supportType, value) => {
  // if (supportType === supportEnums.SINKING_PINNED) return [true, ""];
  if (!isDecimal(value)) return [false, "Sinking value must be a number."];
  if (value <= 0) return [false, "Sinking value must be greater than 0."];
  if (value > MaxSinkingValue)
    return [false, `Sinking value must be less than ${MaxSinkingValue}.`];
  return [true, ""];
};

export const validateSupportDistanceFromLeft = (supportType, value) => {
  if (!isDecimal(value)) return [false, "Distance from left must be a number."];
  if (value < 0) return [false, "Distance from left must be greater than 0."];
  return [true, ""];
};

export const validateSupports = (supports, beamTotalLength) => {
  let errorMessage = "";

  if (supports?.length === 0)
    return [false, "Please add at least one support."];

  const distanceFromLeftMap = {};
  const supportsAreValid = supports?.every((support, i) => {
    const distanceFromLeft = distanceFromLeftMap[support?.distanceFromLeft];

    if (distanceFromLeft) {
      errorMessage = `Support ${i + 1} is overlapping the previous support.`;
      return false;
    }

    if (+support?.distanceFromLeft > beamTotalLength) {
      errorMessage = `Support ${i + 1} is outside the beam.`;
      return false;
    }

    const sinkingValueIsValid = support?.sinking
      ? validateSupportSinkingValue(support.type, support.sinkingValue)[0]
      : true;

    const distanceFromLeftIsValid = validateSupportDistanceFromLeft(
      support.type,
      support.distanceFromLeft
    )[0];

    if (sinkingValueIsValid && distanceFromLeftIsValid) {
      distanceFromLeftMap[support?.distanceFromLeft] = true;
      return true;
    }

    if (!sinkingValueIsValid || !distanceFromLeftIsValid) {
      errorMessage = `Support ${i + 1} is invalid.`;
      return false;
    }
  });

  return [supportsAreValid, errorMessage];
};

export const validateLoadingDistanceFromLeft = (loadingType, value) => {
  if (!isDecimal(value)) return [false, "Distance from left must be a number."];
  if (value < 0) return [false, "Distance from left must be greater than 0."];
  return [true, ""];
};

export const validateLoadingDistanceFromTop = (loadingType, value) => {
  if (!isDecimal(value)) return [false, "Distance from top must be a number."];
  if (value < 0) return [false, "Distance from top must be greater than 0."];
  return [true, ""];
};

export const validateLoadingValue = (loadingType, value) => {
  if (!isDecimal(value)) return [false, "Value must be a number."];
  if (value <= 0) return [false, "Value must be greater than 0."];
  if (value > MaxSpanLength)
    return [false, `Value must be less than ${MaxLoadingValue}.`];
  return [true, ""];
};

export const validateLoadingSpan = (loadingType, value) => {
  if (!isDecimal(value)) return [false, "Value must be a number."];
  if (value <= 0) return [false, "Value must be greater than 0."];
  if (value > MaxSpanLength)
    return [false, `Value must be less than ${MaxSpanLength}.`];
  return [true, ""];
};

export const validateOpeningValue = (loadingType, value) => {
  // if (loadingType === loadingEnums.UNIFORM_DISTRIBUTED) return [true, ""];
  if (!isDecimal(value)) return [false, "Value must be a number."];
  if (value < 0) return [false, "Value must be greater than 0."];
  if (value > MaxSpanLength)
    return [false, `Value must be less than ${MaxLoadingValue}.`];
  return [true, ""];
};

export const validateClosingValue = (loadingType, value) => {
  // if (loadingType === loadingEnums.UNIFORM_DISTRIBUTED) return [true, ""];
  if (!isDecimal(value)) return [false, "Value must be a number."];
  if (value < 0) return [false, "Value must be greater than 0."];
  if (value > MaxSpanLength)
    return [false, `Value must be less than ${MaxLoadingValue}.`];
  return [true, ""];
};

export const validateLoadings = (loadings, beamTotalLength) => {
  let errorMessage = "";

  if (loadings?.length === 0)
    return [false, "Please add at least one loading."];

  const distanceFromLeftMap = {};

  const loadingsAreValid = loadings?.every((loading, i) => {
    const distanceFromLeft = distanceFromLeftMap[loading?.distanceFromLeft];

    if (distanceFromLeft) {
      errorMessage = `Loading ${i + 1} is overlapping the previous loading.`;
      return false;
    }

    if (
      +loading?.distanceFromLeft + +loading?.spanOfLoading >
      beamTotalLength
    ) {
      errorMessage = `Loading ${i + 1} is outside the beam.`;
      return false;
    }

    let isValid = false;

    if (loading?.type === loadingEnums?.single) {
      isValid =
        validateLoadingDistanceFromLeft(
          loading.type,
          loading.distanceFromLeft
        )[0] && validateLoadingValue(loading.type, loading.valueOfLoading)[0];
    } else if (loading?.type === loadingEnums?.uniform) {
      isValid =
        validateLoadingDistanceFromLeft(
          loading.type,
          loading.distanceFromLeft
        )[0] &&
        validateLoadingValue(loading.type, loading.valueOfLoading)[0] &&
        validateLoadingSpan(loading.type, loading.spanOfLoading)[0];
    } else if (loading?.type === loadingEnums?.varying) {
      isValid =
        validateLoadingDistanceFromLeft(
          loading.type,
          loading.distanceFromLeft
        )[0] &&
        validateOpeningValue(loading.type, loading.openingValue)[0] &&
        validateClosingValue(loading.type, loading.closingValue)[0] &&
        validateLoadingSpan(loading.type, loading.spanOfLoading)[0];
    }

    if (isValid) {
      distanceFromLeftMap[loading?.distanceFromLeft] = true;
      return true;
    }

    if (!isValid) {
      errorMessage = `Loading ${i + 1} is invalid.`;
      return false;
    }
  });

  return [loadingsAreValid, errorMessage];
};

export const validateColumn = (columnName = "left column", column) => {
  const { length, support, loading } = column;
  const { type: supportType, sinking, sinkingValue } = support;
  const {
    type: loadingType,
    distanceFromTop,
    valueOfLoading,
    spanOfLoading,
    openingValue,
    closingValue,
  } = loading;

  const [lengthIsValid, lengthErrorMessage] = validateSpanHeight(length);

  if (!lengthIsValid)
    return [
      false,
      `The ${columnName} height is invalid. ${lengthErrorMessage}`,
    ];

  const [sinkingValueIsValid, sinkingErrorMessage] =
    validateSupportSinkingValue(supportType, sinkingValue);

  if (sinking && !sinkingValueIsValid)
    return [
      false,
      `The ${columnName} column sinking value is invalid. ${sinkingErrorMessage}`,
    ];

  let isValid = true;
  if (loadingType !== loadingEnums?.none) {
    if (loadingType === loadingEnums?.single) {
      isValid =
        validateLoadingDistanceFromTop(loadingType, distanceFromTop)[0] &&
        validateLoadingValue(loadingType, valueOfLoading)[0];
    } else if (loadingType === loadingEnums?.uniform) {
      isValid =
        validateLoadingDistanceFromTop(loadingType, distanceFromTop)[0] &&
        validateLoadingValue(loadingType, valueOfLoading)[0] &&
        validateLoadingSpan(loadingType, spanOfLoading)[0];
    } else if (loadingType === loadingEnums?.varying) {
      isValid =
        validateLoadingDistanceFromTop(loadingType, distanceFromTop)[0] &&
        validateOpeningValue(loadingType, openingValue)[0] &&
        validateClosingValue(loadingType, closingValue)[0] &&
        validateLoadingSpan(loadingType, spanOfLoading)[0];
    }
  }

  if (!isValid) return [false, `The ${columnName} column loading is invalid.`];

  return [true, ""];
};
export const validateBeam = (beam) => {
  const { length, loading } = beam;
  const {
    type: loadingType,
    distanceFromLeft,
    valueOfLoading,
    spanOfLoading,
    openingValue,
    closingValue,
  } = loading;

  const [lengthIsValid, lengthErrorMessage] = validateSpanHeight(length);

  if (!lengthIsValid)
    return [false, `The beam length is invalid. ${lengthErrorMessage}`];

  let isValid = true;
  if (loadingType === loadingEnums?.single) {
    isValid =
      validateLoadingDistanceFromLeft(loadingType, distanceFromLeft)[0] &&
      validateLoadingValue(loadingType, valueOfLoading)[0];
  } else if (loadingType === loadingEnums?.uniform) {
    isValid =
      validateLoadingDistanceFromLeft(loadingType, distanceFromLeft)[0] &&
      validateLoadingValue(loadingType, valueOfLoading)[0] &&
      validateLoadingSpan(loadingType, spanOfLoading)[0];
  } else if (loadingType === loadingEnums?.varying) {
    isValid =
      validateLoadingDistanceFromLeft(loadingType, distanceFromLeft)[0] &&
      validateOpeningValue(loadingType, openingValue)[0] &&
      validateClosingValue(loadingType, closingValue)[0] &&
      validateLoadingSpan(loadingType, spanOfLoading)[0];
  }

  if (!isValid) return [false, `The beam loading is invalid.`];

  return [true, ""];
};