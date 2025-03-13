import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import {
  BeamIcon,
  SinglePointLoadIcon,
  UniformDistributedLoadIcon,
  VaryingDistributedLoadIcon,
  PinnedSupportIcon,
  RollerSupportIcon,
  FixedSupportIcon,
  DimensionMark,
  FlexuralRigidityMark,
  LoadingMark,
  FullDimensionMark,
} from "../../icons/Properties";
import { AnimatePresence, motion } from "framer-motion";
import {
  getLoadPositionAndDimension,
  loadingEnums,
  getSupportPositionAndDimension,
  supportEnums,
  getDimensionMarkings,
  getFlexuralRigidityMarkings,
  getLoadMarkings,
  getBeamTotalLength,
} from "../../store/beam-utils";
import { beamActions } from "../../store/beam";

import { isBeamEmpty } from "../../store/beam";

const LoadIcon = ({ load, beam, beamPixelLength }) => {
  const dim = getLoadPositionAndDimension(beam, load.id, beamPixelLength);
  const { top, left, width, height } = dim;
  if (load.type === loadingEnums.single) {
    return (
      <SinglePointLoadIcon
        key={load.id}
        width={`${width}%`}
        height={`${height}%`}
        style={{
          position: "absolute",
          left: `${left}%`,
          top: `${top}%`,
        }}
        valueOfLoading={load?.valueOfLoading}
      />
    );
  }
  if (load.type === loadingEnums.uniform) {
    return (
      <UniformDistributedLoadIcon
        key={load.id}
        width={`${width}%`}
        height={`${height}%`}
        style={{
          position: "absolute",
          left: `${left}%`,
          top: `${top}%`,
        }}
      />
    );
  }
  if (load.type === loadingEnums.varying) {
    return (
      <VaryingDistributedLoadIcon
        key={load.id}
        width={`${width}%`}
        height={`${height}%`}
        style={{
          position: "absolute",
          left: `${left}%`,
          top: `${top}%`,
        }}
        bigToSmall={+load?.openingValue > +load?.closingValue}
        triangular={+load?.openingValue === 0 || +load?.closingValue === 0}
      />
    );
  }
};

LoadIcon.propTypes = {
  load: PropTypes.object.isRequired,
  beam: PropTypes.object.isRequired,
  beamPixelLength: PropTypes.number.isRequired,
};

const SupportIcon = ({ support, beam, beamPixelLength }) => {
  const dim = getSupportPositionAndDimension(beam, support.id, beamPixelLength);
  const { top, left } = dim;

  if (support.type === supportEnums.pinned) {
    return (
      <PinnedSupportIcon
        key={support.id}
        style={{
          position: "absolute",
          left: `${left}%`,
          top: `${top}%`,
        }}
      />
    );
  }
  if (support.type === supportEnums.roller) {
    return (
      <RollerSupportIcon
        key={support.id}
        style={{
          position: "absolute",
          left: `${left}%`,
          top: `${top}%`,
        }}
      />
    );
  }
  if (support.type === supportEnums.fixed) {
    return (
      <FixedSupportIcon
        atStart={support.distanceFromLeft == 0}
        key={support.id}
        style={{
          position: "absolute",
          left: `${left}%`,
          top: `${top}%`,
        }}
      />
    );
  }
};

SupportIcon.propTypes = {
  support: PropTypes.object.isRequired,
  beam: PropTypes.object.isRequired,
  beamPixelLength: PropTypes.number.isRequired,
};

const DimensionMarkings = ({ beam }) => {
  let markings = getDimensionMarkings(beam);

  return markings?.map((mark, i) => (
    <DimensionMark
      key={i}
      style={{
        top: "75%",
        width: `${mark?.spacingInPercentage}%`,
        left: `${mark?.leftInPercentage}%`,
      }}
      mark={mark}
    />
  ));
};

DimensionMarkings.propTypes = {
  beam: PropTypes.object,
};

const FlexuralRigidityMarkings = ({ beam }) => {
  let markings = getFlexuralRigidityMarkings(beam);

  return markings?.map((mark, i) => (
    <FlexuralRigidityMark
      key={i}
      style={{
        top: "51%",
        width: `${mark?.spacingInPercentage}%`,
        left: `${mark?.leftInPercentage}%`,
      }}
      flexuralRigidity={mark?.flexuralRigidity}
    />
  ));
};

FlexuralRigidityMarkings.propTypes = {
  beam: PropTypes.object,
};

const LoadMarkings = ({ beam }) => {
  let markings = getLoadMarkings(beam);
  markings = markings?.filter((mark) => mark?.load > 0);

  return markings?.map((mark, i) => (
    <LoadingMark
      key={i}
      style={{
        top: "12%",
        left: `${mark?.leftInPercentage}%`,
      }}
      load={mark?.load}
      unit={mark?.type == loadingEnums.single ? "N" : "N/m"}
    />
  ));
};

LoadMarkings.propTypes = {
  beam: PropTypes.object,
};

const BeamFullDimensionMarking = ({ beam }) => {
  const fullWidth = getBeamTotalLength(beam);

  return <FullDimensionMark width={fullWidth} style={{ top: "95%" }} />;
};

BeamFullDimensionMarking.propTypes = {
  beam: PropTypes.object,
};

export default function QuestionPage() {
  const dispatch = useDispatch();
  const { beamProperties, beamPixelLength } = useSelector(
    (state) => state.beam
  );
  const canShowBeam = beamProperties.spans.length > 0;
  const containerHeight = 325;
  const canShowBeamFullWidthDimensions = beamProperties?.spans?.length >= 1;

  const setBeamPixelLength = (length) => {
    dispatch(beamActions.set({ key: "beamPixelLength", value: length }));
  };

  const showBeamImage = isBeamEmpty(beamProperties);

  if (showBeamImage) {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center">
        <p className="text-xl font-medium text-black text-center">
          Please Input your values.
        </p>
      </div>
    );
  }

  return (
    <AnimatePresence>
      {canShowBeam && (
        <motion.div
          className="w-full relative min-w-[800px] sm:min-w-0"
          style={{ height: containerHeight }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <BeamIcon
            className="absolute top-1/2"
            setBeamPixelLength={setBeamPixelLength}
          />
          {beamProperties?.loadings?.map((load) => (
            <LoadIcon
              load={load}
              beam={beamProperties}
              beamPixelLength={beamPixelLength}
              key={load.id}
            />
          ))}
          {beamProperties?.supports?.map((support) => (
            <SupportIcon
              support={support}
              beam={beamProperties}
              beamPixelLength={beamPixelLength}
              key={support.id}
            />
          ))}
          <DimensionMarkings beam={beamProperties} />
          <FlexuralRigidityMarkings beam={beamProperties} />
          <LoadMarkings beam={beamProperties} />
          {canShowBeamFullWidthDimensions && (
            <BeamFullDimensionMarking beam={beamProperties} />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
