export const getFrameAnalysis = (frame) => {
  let { leftColumn, rightColumn, beam } = frame;
  leftColumn = {
    ...leftColumn,
    length: +leftColumn.length,
    flexuralRigidity: +leftColumn.flexuralRigidity,
    support: {
      ...[leftColumn.support],
      sinkingValue: +leftColumn.support.sinkingValue,
    },
    loading: {
      ...[leftColumn.loading],
      distanceFromTop: +leftColumn.loading.distanceFromTop,
      valueOfLoading: +leftColumn.loading.valueOfLoading,
      spanOfLoading: +leftColumn.loading.spanOfLoading,
      openingValue: +leftColumn.loading.openingValue,
      closingValue: +leftColumn.loading.closingValue,
    },
  };

  rightColumn = {
    ...rightColumn,
    length: +rightColumn.length,
    flexuralRigidity: +rightColumn.flexuralRigidity,
    support: {
      ...[rightColumn.support],
      sinkingValue: +rightColumn.support.sinkingValue,
    },
    loading: {
      ...[rightColumn.loading],
      distanceFromTop: +rightColumn.loading.distanceFromTop,
      valueOfLoading: +rightColumn.loading.valueOfLoading,
      spanOfLoading: +rightColumn.loading.spanOfLoading,
      openingValue: +rightColumn.loading.openingValue,
      closingValue: +rightColumn.loading.closingValue,
    },
  };

  beam = {
    ...beam,
    length: +beam.length,
    flexuralRigidity: +beam.flexuralRigidity,
    loading: {
      ...[beam.loading],
      distanceFromLeft: +beam.loading.distanceFromLeft,
      distanceFromRight: +beam.loading.distanceFromRight,
      valueOfLoading: +beam.loading.valueOfLoading,
      spanOfLoading: +beam.loading.spanOfLoading,
      openingValue: +beam.loading.openingValue,
      closingValue: +beam.loading.closingValue,
    },
  };

  return {};
};
