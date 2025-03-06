import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { frameActions } from "../../store/frame";
import { motion, AnimatePresence } from "framer-motion";
import PropertyWrapper from "../../components/wrappers/PropertyWrapper";
import WrapperHeader from "../../components/typography/WrapperHeader";
import WrapperParagraph from "../../components/typography/WrapperParagraph";
import NumberInput from "../../components/inputs/NumberInput";
import WrapperButton from "../../components/buttons/WrapperButton";
import UpArrow from "../../icons/UpArrow";
import {
  MetreUnit,
  EIUnit,
  NewtonUnit,
  NewtonPerMetreUnit,
} from "../../icons/units";
import { loadingEnums } from "../../store/beam-utils";
import {
  validateLoadingValue,
  validateSpanHeight,
  validateLoadingDistanceFromLeft,
  validateSpanFlexuralRigidity,
  validateClosingValue,
  validateOpeningValue,
  validateLoadingSpan,
  validateBeam,
} from "../../utils/validators";
import {
  SinglePointLoadButton,
  UniformDistributedLoadButton,
  UniformVaryingLoadButton,
} from "../../icons/Properties";
import { showNotification } from "./Sidebar";

const dropdownVariants = {
  hidden: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
  visible: {
    opacity: 1,
    height: "auto",
    transition: { duration: 0.3, ease: "easeInOut" },
    marginTop: 16,
    borderTop: "1px solid #D4D4D8",
    paddingTop: 16,
  },
};

export default function Beam() {
  const dispatch = useDispatch();
  const { showBeamConfig, beam, framePropertiesUndoStack, frameProperties } =
    useSelector((state) => state.frame);

  const toggleShowConfigHandler = () => {
    dispatch(
      frameActions.set({
        key: "showBeamConfig",
        value: !showBeamConfig,
      })
    );
  };

  const applySpanHandler = () => {
    const [isValid, errorMessage] = validateBeam("beam", beam);

    if (!isValid) {
      showNotification(errorMessage);
      return;
    }

    const newFrameProperties = { ...frameProperties, beam: beam };
    dispatch(
      frameActions.set([
        { key: "frameProperties", value: newFrameProperties },
        {
          key: "framePropertiesUndoStack",
          value: [...framePropertiesUndoStack, newFrameProperties],
        },
      ])
    );
  };

  return (
    <PropertyWrapper className="">
      <button
        onClick={toggleShowConfigHandler}
        className="inline-flex w-full items-center justify-between"
      >
        <WrapperHeader className="flex flex-row items-center gap-2">
          <span>Beam</span>
        </WrapperHeader>
        <UpArrow
          className={`transform transition-transform ${
            !showBeamConfig ? "rotate-180" : ""
          }`}
        />
      </button>
      <motion.div
        initial="hidden"
        animate={showBeamConfig ? "visible" : "hidden"}
        variants={dropdownVariants}
        className="space-y-[1rem] overflow-hidden px-1"
      >
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <BeamItem />
          </motion.div>
        </AnimatePresence>
        <WrapperButton onClick={applySpanHandler}>Apply</WrapperButton>
      </motion.div>
    </PropertyWrapper>
  );
}

function BeamItem() {
  const dispatch = useDispatch();
  const { beam } = useSelector((state) => state.frame);
  const { length, flexuralRigidity, loading } = beam;
  const { type: loadingType } = loading;
  const [lengthIsValid, lengthErrorMessage] = validateSpanHeight(length);
  const [flexuralRigidityIsValid, flexuralRigidityErrorMessage] =
    validateSpanFlexuralRigidity(flexuralRigidity);

  const isSinglePointLoad = loadingType === loadingEnums.single;
  const isUniformDistributedLoad = loadingType === loadingEnums.uniform;
  const isNonUniformDistributedLoad = loadingType === loadingEnums.varying;

  const lengthChangeHandler = (value) => {
    dispatch(
      frameActions?.set({
        key: "beam",
        value: { ...beam, length: value },
      })
    );
  };

  const flexuralRigidityChangeHandler = (value) => {
    dispatch(
      frameActions?.set({
        key: "beam",
        value: { ...beam, flexuralRigidity: value },
      })
    );
  };

  const changeLoadType = (value) => {
    const newLoading = { ...loading, type: value };
    dispatch(
      frameActions?.set({
        key: "beam",
        value: { ...beam, loading: newLoading },
      })
    );
  };

  return (
    <div className="space-y-[1rem] span-section">
      <div className="flex flex-row items-start gap-x-[1rem]">
        <div className="space-y-[0.5rem]">
          <WrapperParagraph>Length</WrapperParagraph>
          <NumberInput
            Icon={MetreUnit}
            placeholder=""
            onChange={lengthChangeHandler}
            value={length}
            isValid={lengthIsValid}
            errorMessage={lengthErrorMessage}
          />
        </div>
        <div className="space-y-[0.5rem]">
          <WrapperParagraph>EI</WrapperParagraph>
          <NumberInput
            Icon={EIUnit}
            placeholder=""
            onChange={flexuralRigidityChangeHandler}
            value={flexuralRigidity}
            isValid={flexuralRigidityIsValid}
            errorMessage={flexuralRigidityErrorMessage}
          />
        </div>
      </div>
      <WrapperParagraph>Loading Type</WrapperParagraph>
      <div className="flex gap-x-[0.5rem]">
        <SinglePointLoadButton
          active={isSinglePointLoad}
          onClick={changeLoadType.bind(null, loadingEnums.single)}
        />
        <UniformDistributedLoadButton
          active={isUniformDistributedLoad}
          onClick={changeLoadType.bind(null, loadingEnums.uniform)}
        />
        <UniformVaryingLoadButton
          active={isNonUniformDistributedLoad}
          onClick={changeLoadType.bind(null, loadingEnums.varying)}
        />
      </div>
      {isSinglePointLoad && <SinglePointLoadSettings />}
      {isUniformDistributedLoad && <UniformDistributedLoadSettings />}
      {isNonUniformDistributedLoad && <UniformVaryingLoadSettings />}
    </div>
  );
}

function SinglePointLoadSettings() {
  const dispatch = useDispatch();
  const { beam } = useSelector((state) => state.frame);
  const { loading } = beam;
  const { type, distanceFromLeft, valueOfLoading } = loading;

  const [distanceFromTopIsValid, distanceFromTopErrorMessage] =
    validateLoadingDistanceFromLeft(type, distanceFromLeft);
  const [valueOfLoadingIsValid, valueOfLoadingErrorMessage] =
    validateLoadingValue(type, valueOfLoading);

  const changeDistanceFromTop = (distanceFromLeft) => {
    const newLoad = { ...loading, distanceFromLeft: distanceFromLeft };
    dispatch(
      frameActions.set({
        key: "beam",
        value: { ...beam, loading: newLoad },
      })
    );
  };

  const changeValueOfLoading = (valueOfLoading) => {
    const newLoad = { ...loading, valueOfLoading: valueOfLoading };
    dispatch(
      frameActions.set({
        key: "beam",
        value: { ...beam, loading: newLoad },
      })
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }} // Animation on mount (fade in and slide down)
      animate={{ opacity: 1, y: 0 }} // Final state
      exit={{ opacity: 0, y: -10 }} // Animation on unmount (fade out and slide up)
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
      className="w-full space-y-[1rem] px-1 loading-section"
      key="single-point-load"
    >
      <div className="space-y-[0.5rem]">
        <WrapperParagraph>Distance (from left)</WrapperParagraph>
        <NumberInput
          Icon={MetreUnit}
          onChange={changeDistanceFromTop}
          value={distanceFromLeft}
          isValid={distanceFromTopIsValid}
          errorMessage={distanceFromTopErrorMessage}
        />
      </div>
      <div className="space-y-[0.5rem]">
        <WrapperParagraph>Value of Loading</WrapperParagraph>
        <NumberInput
          Icon={NewtonUnit}
          onChange={changeValueOfLoading}
          value={valueOfLoading}
          isValid={valueOfLoadingIsValid}
          errorMessage={valueOfLoadingErrorMessage}
        />
      </div>
    </motion.div>
  );
}

function UniformDistributedLoadSettings() {
  const dispatch = useDispatch();
  const { beam } = useSelector((state) => state.frame);
  const { loading } = beam;
  const { type, distanceFromLeft, spanOfLoading, valueOfLoading } = loading;

  const [distanceFromTopIsValid, distanceFromTopErrorMessage] =
    validateLoadingDistanceFromLeft(type, distanceFromLeft);
  const [spanOfLoadingIsValid, spanOfLoadingErrorMessage] = validateLoadingSpan(
    type,
    spanOfLoading
  );
  const [valueOfLoadingIsValid, valueOfLoadingErrorMessage] =
    validateLoadingValue(type, valueOfLoading);

  const changeDistanceFromTop = (distanceFromLeft) => {
    const newLoad = { ...loading, distanceFromLeft: distanceFromLeft };
    dispatch(
      frameActions.set({
        key: "beam",
        value: { ...beam, loading: newLoad },
      })
    );
  };

  const changeSpanOfLoading = (spanOfLoading) => {
    const newLoad = { ...loading, spanOfLoading: spanOfLoading };
    dispatch(
      frameActions.set({
        key: "beam",
        value: { ...beam, loading: newLoad },
      })
    );
  };

  const changeValueOfLoading = (valueOfLoading) => {
    const newLoad = { ...loading, valueOfLoading: valueOfLoading };
    dispatch(
      frameActions.set({
        key: "beam",
        value: { ...beam, loading: newLoad },
      })
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }} // Animation on mount (fade in and slide down)
      animate={{ opacity: 1, y: 0 }} // Final state
      exit={{ opacity: 0, y: -10 }} // Animation on unmount (fade out and slide up)
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
      className="w-full space-y-[1rem] px-1 loading-section"
      key="single-point-load"
    >
      <div className="space-y-[0.5rem]">
        <WrapperParagraph>Distance (from left)</WrapperParagraph>
        <NumberInput
          Icon={MetreUnit}
          onChange={changeDistanceFromTop}
          value={distanceFromLeft}
          isValid={distanceFromTopIsValid}
          errorMessage={distanceFromTopErrorMessage}
        />
      </div>
      <div className="space-y-[0.5rem]">
        <WrapperParagraph>Value of Loading</WrapperParagraph>
        <NumberInput
          Icon={NewtonUnit}
          onChange={changeValueOfLoading}
          value={valueOfLoading}
          isValid={valueOfLoadingIsValid}
          errorMessage={valueOfLoadingErrorMessage}
        />
      </div>
      <div className="space-y-[0.5rem]">
        <WrapperParagraph>Span of Loading</WrapperParagraph>
        <NumberInput
          Icon={MetreUnit}
          onChange={changeSpanOfLoading}
          value={spanOfLoading}
          isValid={spanOfLoadingIsValid}
          errorMessage={spanOfLoadingErrorMessage}
        />
      </div>
    </motion.div>
  );
}

function UniformVaryingLoadSettings() {
  const dispatch = useDispatch();
  const { beam } = useSelector((state) => state.frame);
  const { loading } = beam;
  const { type, distanceFromLeft, spanOfLoading, openingValue, closingValue } =
    loading;

  const [distanceFromTopIsValid, distanceFromTopErrorMessage] =
    validateLoadingDistanceFromLeft(type, distanceFromLeft);
  const [spanOfLoadingIsValid, spanOfLoadingErrorMessage] = validateLoadingSpan(
    type,
    spanOfLoading
  );
  const [openingValueIsValid, openingValueErrorMessage] = validateOpeningValue(
    type,
    openingValue
  );
  const [closingValueIsValid, closingValueErrorMessage] = validateClosingValue(
    type,
    closingValue
  );

  const changeDistanceFromTop = (distanceFromLeft) => {
    const newLoad = { ...loading, distanceFromLeft: distanceFromLeft };
    dispatch(frameActions.set({ key: "beam", value: newLoad }));
  };

  const changeSpanOfLoading = (spanOfLoading) => {
    const newLoad = { ...loading, spanOfLoading: spanOfLoading };
    dispatch(frameActions.set({ key: "beam", value: newLoad }));
  };

  const changeOpeningValue = (openingValue) => {
    const newLoad = { ...loading, openingValue: openingValue };
    dispatch(frameActions.set({ key: "beam", value: newLoad }));
  };

  const changeClosingValue = (closingValue) => {
    const newLoad = { ...loading, closingValue: closingValue };
    dispatch(frameActions.set({ key: "beam", value: newLoad }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }} // Animation on mount (fade in and slide down)
      animate={{ opacity: 1, y: 0 }} // Final state
      exit={{ opacity: 0, y: -10 }} // Animation on unmount (fade out and slide up)
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
      className="w-full space-y-[1rem] px-1 loading-section"
      key="single-point-load"
    >
      <div className="space-y-[0.5rem]">
        <WrapperParagraph>Distance (from left)</WrapperParagraph>
        <NumberInput
          Icon={MetreUnit}
          onChange={changeDistanceFromTop}
          value={distanceFromLeft}
          isValid={distanceFromTopIsValid}
          errorMessage={distanceFromTopErrorMessage}
        />
      </div>
      <div className="space-y-[0.5rem]">
        <WrapperParagraph>Opening Value</WrapperParagraph>
        <NumberInput
          Icon={NewtonPerMetreUnit}
          onChange={changeOpeningValue}
          value={openingValue}
          isValid={openingValueIsValid}
          errorMessage={openingValueErrorMessage}
        />
      </div>
      <div className="space-y-[0.5rem]">
        <WrapperParagraph>Closing Value</WrapperParagraph>
        <NumberInput
          Icon={NewtonPerMetreUnit}
          onChange={changeClosingValue}
          value={closingValue}
          isValid={closingValueIsValid}
          errorMessage={closingValueErrorMessage}
        />
      </div>
      <div className="space-y-[0.5rem]">
        <WrapperParagraph>Span of Loading</WrapperParagraph>
        <NumberInput
          Icon={MetreUnit}
          onChange={changeSpanOfLoading}
          value={spanOfLoading}
          isValid={spanOfLoadingIsValid}
          errorMessage={spanOfLoadingErrorMessage}
        />
      </div>
    </motion.div>
  );
}
