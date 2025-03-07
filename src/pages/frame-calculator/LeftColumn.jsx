import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { frameActions } from "../../store/frame";
import { motion, AnimatePresence } from "framer-motion";
import PropertyWrapper from "../../components/wrappers/PropertyWrapper";
import WrapperHeader from "../../components/typography/WrapperHeader";
import WrapperParagraph from "../../components/typography/WrapperParagraph";
import NumberInput from "../../components/inputs/NumberInput";
import WrapperButton from "../../components/buttons/WrapperButton";
import WrapperToggle from "../../components/toggles/WrapperToggle";
import UpArrow from "../../icons/UpArrow";
import {
  MetreUnit,
  EIUnit,
  NewtonUnit,
  NewtonPerMetreUnit,
} from "../../icons/units";
import { supportEnums, loadingEnums } from "../../store/beam-utils";
import {
  validateLoadingValue,
  validateSpanHeight,
  validateLoadingDistanceFromTop,
  validateSpanFlexuralRigidity,
  validateSupportSinkingValue,
  validateClosingValue,
  validateOpeningValue,
  validateLoadingSpan,
  validateColumn,
} from "../../utils/validators";
import {
  PinnedSupportButton,
  RollerSupportButton,
  FixedSupportButton,
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

const configDropdownVariants = {
  hidden: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
  visible: {
    opacity: 1,
    height: "auto",
    transition: { duration: 0.3, ease: "easeInOut" },
    marginBottom: 16,
  },
};

export default function LeftColumn() {
  const dispatch = useDispatch();
  const {
    showLeftSpanConfig,
    leftColumn,
    framePropertiesUndoStack,
    frameProperties,
  } = useSelector((state) => state.frame);

  const toggleShowConfigHandler = () => {
    dispatch(
      frameActions.set({
        key: "showLeftSpanConfig",
        value: !showLeftSpanConfig,
      })
    );
  };

  const applySpanHandler = () => {
    console.log(leftColumn);
    const [isValid, errorMessage] = validateColumn("left column", leftColumn);

    if (!isValid) {
      showNotification(errorMessage);
      return;
    }

    const newFrameProperties = { ...frameProperties, leftColumn: leftColumn };
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
          <span>Left Column</span>
        </WrapperHeader>
        <UpArrow
          className={`transform transition-transform ${
            !showLeftSpanConfig ? "rotate-180" : ""
          }`}
        />
      </button>
      <motion.div
        initial="hidden"
        animate={showLeftSpanConfig ? "visible" : "hidden"}
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
            <LeftItem />
          </motion.div>
        </AnimatePresence>
        <WrapperButton onClick={applySpanHandler}>Apply</WrapperButton>
      </motion.div>
    </PropertyWrapper>
  );
}

function LeftItem() {
  const dispatch = useDispatch();
  const { leftColumn } = useSelector((state) => state.frame);
  const { length, flexuralRigidity, support, loading } = leftColumn;
  const { type: supportType, sinking, sinkingValue } = support;
  const { type: loadingType } = loading;
  const [lengthIsValid, lengthErrorMessage] = validateSpanHeight(length);
  const [flexuralRigidityIsValid, flexuralRigidityErrorMessage] =
    validateSpanFlexuralRigidity(flexuralRigidity);
  const [sinkingValueIsValid, sinkingErrorMessage] =
    validateSupportSinkingValue(supportType, sinkingValue);

  const isRollerSupport = supportType === supportEnums.roller;
  const isPinnedSupport = supportType === supportEnums.pinned;
  const isFixedSupport = supportType === supportEnums.fixed;

  const noLoad = loadingType !== loadingEnums.none;
  const isSinglePointLoad = loadingType === loadingEnums.single;
  const isUniformDistributedLoad = loadingType === loadingEnums.uniform;
  const isNonUniformDistributedLoad = loadingType === loadingEnums.varying;

  const lengthChangeHandler = (value) => {
    dispatch(
      frameActions?.set({
        key: "leftColumn",
        value: { ...leftColumn, length: value },
      })
    );
  };

  const flexuralRigidityChangeHandler = (value) => {
    dispatch(
      frameActions?.set({
        key: "leftColumn",
        value: { ...leftColumn, flexuralRigidity: value },
      })
    );
  };

  const changeSupportType = (value) => {
    const newSupport = { ...support, type: value, sinkingValue: "" };
    dispatch(
      frameActions?.set({
        key: "leftColumn",
        value: { ...leftColumn, support: newSupport },
      })
    );
  };

  const changeLoadType = (value) => {
    const newLoading = { ...loading, type: value };
    dispatch(
      frameActions?.set({
        key: "leftColumn",
        value: { ...leftColumn, loading: newLoading },
      })
    );
  };

  const changeSinking = (value) => {
    const newSinking = { ...support, sinking: value, sinkingValue: "" };
    dispatch(
      frameActions?.set({
        key: "leftColumn",
        value: { ...leftColumn, support: newSinking },
      })
    );
  };

  const changeSinkingValue = (value) => {
    const newSinking = { ...support, sinkingValue: value };
    dispatch(
      frameActions?.set({
        key: "leftColumn",
        value: { ...leftColumn, support: newSinking },
      })
    );
  };

  const changeDistanceFromTop = (distanceFromTop) => {
    const newLoad = { ...loading, distanceFromTop: distanceFromTop };
    dispatch(
      frameActions.set({
        key: "leftColumn",
        value: { ...leftColumn, loading: newLoad },
      })
    );
  };

  const changeSpanOfLoading = (spanOfLoading) => {
    const newLoad = { ...loading, spanOfLoading: spanOfLoading };
    dispatch(
      frameActions.set({
        key: "leftColumn",
        value: { ...leftColumn, loading: newLoad },
      })
    );
  };

  useEffect(() => {
    if(loadingType != loadingEnums.single){
      changeDistanceFromTop(0);
      changeSpanOfLoading(length);
    }
  }, [loadingType, length])

  return (
    <div className="space-y-[1rem] span-section">
      <div className="flex flex-row items-start gap-x-[1rem]">
        <div className="space-y-[0.5rem]">
          <WrapperParagraph>Height</WrapperParagraph>
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
      <WrapperParagraph>Support Type</WrapperParagraph>
      <div className="flex gap-x-[0.5rem]">
        <PinnedSupportButton
          active={isPinnedSupport}
          onClick={changeSupportType.bind(null, supportEnums.pinned)}
        />
        <RollerSupportButton
          active={isRollerSupport}
          onClick={changeSupportType.bind(null, supportEnums.roller)}
        />
        <FixedSupportButton
          active={isFixedSupport}
          onClick={changeSupportType.bind(null, supportEnums.fixed)}
        />
      </div>
      <WrapperToggle
        checked={sinking}
        onChange={changeSinking}
        className="mb-[1rem]"
      />
      <motion.div
        initial="hidden"
        animate={sinking ? "visible" : "hidden"}
        variants={configDropdownVariants}
      >
        <NumberInput
          Icon={MetreUnit}
          onChange={changeSinkingValue}
          value={sinkingValue}
          isValid={sinkingValueIsValid}
          errorMessage={sinkingErrorMessage}
        />
      </motion.div>
      <WrapperToggle
        text="Loading"
        checked={noLoad}
        onChange={changeLoadType.bind(
          null,
          noLoad ? loadingEnums.none : loadingEnums.single
        )}
        className="mb-[1rem]"
      />
      <motion.div
        initial="hidden"
        animate={noLoad ? "visible" : "hidden"}
        variants={configDropdownVariants}
        className="space-y-[1rem]"
      >
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
      </motion.div>
    </div>
  );
}

function SinglePointLoadSettings() {
  const dispatch = useDispatch();
  const { leftColumn } = useSelector((state) => state.frame);
  const { loading } = leftColumn;
  const { type, distanceFromTop, valueOfLoading } = loading;

  const [distanceFromTopIsValid, distanceFromTopErrorMessage] =
    validateLoadingDistanceFromTop(type, distanceFromTop);
  const [valueOfLoadingIsValid, valueOfLoadingErrorMessage] =
    validateLoadingValue(type, valueOfLoading);

  const changeDistanceFromTop = (distanceFromTop) => {
    const newLoad = { ...loading, distanceFromTop: distanceFromTop };
    dispatch(
      frameActions.set({
        key: "leftColumn",
        value: { ...leftColumn, loading: newLoad },
      })
    );
  };

  const changeValueOfLoading = (valueOfLoading) => {
    const newLoad = { ...loading, valueOfLoading: valueOfLoading };
    dispatch(
      frameActions.set({
        key: "leftColumn",
        value: { ...leftColumn, loading: newLoad },
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
        <WrapperParagraph>Distance (from top)</WrapperParagraph>
        <NumberInput
          Icon={MetreUnit}
          onChange={changeDistanceFromTop}
          value={distanceFromTop}
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
  const { leftColumn } = useSelector((state) => state.frame);
  const { loading, length } = leftColumn;
  const { type, distanceFromTop, spanOfLoading, valueOfLoading } = loading;

  const [distanceFromTopIsValid, distanceFromTopErrorMessage] =
    validateLoadingDistanceFromTop(type, distanceFromTop);
  const [spanOfLoadingIsValid, spanOfLoadingErrorMessage] = validateLoadingSpan(
    type,
    spanOfLoading
  );
  const [valueOfLoadingIsValid, valueOfLoadingErrorMessage] =
    validateLoadingValue(type, valueOfLoading);

  const changeDistanceFromTop = (distanceFromTop) => {
    const newLoad = { ...loading, distanceFromTop: distanceFromTop };
    dispatch(
      frameActions.set({
        key: "leftColumn",
        value: { ...leftColumn, loading: newLoad },
      })
    );
  };

  const changeSpanOfLoading = (spanOfLoading) => {
    const newLoad = { ...loading, spanOfLoading: spanOfLoading };
    dispatch(
      frameActions.set({
        key: "leftColumn",
        value: { ...leftColumn, loading: newLoad },
      })
    );
  };

  const changeValueOfLoading = (valueOfLoading) => {
    const newLoad = { ...loading, valueOfLoading: valueOfLoading };
    dispatch(
      frameActions.set({
        key: "leftColumn",
        value: { ...leftColumn, loading: newLoad },
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
        <WrapperParagraph>Distance (from top)</WrapperParagraph>
        <NumberInput
          Icon={MetreUnit}
          onChange={changeDistanceFromTop}
          value={distanceFromTop || "0"}
          isValid={distanceFromTopIsValid}
          errorMessage={distanceFromTopErrorMessage}
          disabled={true}
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
          value={spanOfLoading || "0"}
          isValid={spanOfLoadingIsValid}
          errorMessage={spanOfLoadingErrorMessage}
          disabled={true}
        />
      </div>
    </motion.div>
  );
}

function UniformVaryingLoadSettings() {
  const dispatch = useDispatch();
  const { leftColumn } = useSelector((state) => state.frame);
  const { loading } = leftColumn;
  const { type, distanceFromTop, spanOfLoading, openingValue, closingValue } =
    loading;

  const [distanceFromTopIsValid, distanceFromTopErrorMessage] =
    validateLoadingDistanceFromTop(type, distanceFromTop);
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

  const changeDistanceFromTop = (distanceFromTop) => {
    const newLoad = { ...loading, distanceFromTop: distanceFromTop };
    dispatch(frameActions.set({ key: "leftColumn", value: newLoad }));
  };

  const changeSpanOfLoading = (spanOfLoading) => {
    const newLoad = { ...loading, spanOfLoading: spanOfLoading };
    dispatch(frameActions.set({ key: "leftColumn", value: newLoad }));
  };

  const changeOpeningValue = (openingValue) => {
    const newLoad = { ...loading, openingValue: openingValue };
    dispatch(frameActions.set({ key: "leftColumn", value: newLoad }));
  };

  const changeClosingValue = (closingValue) => {
    const newLoad = { ...loading, closingValue: closingValue };
    dispatch(frameActions.set({ key: "leftColumn", value: newLoad }));
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
        <WrapperParagraph>Distance (from top)</WrapperParagraph>
        <NumberInput
          Icon={MetreUnit}
          onChange={changeDistanceFromTop}
          value={distanceFromTop || "0"}
          isValid={distanceFromTopIsValid}
          errorMessage={distanceFromTopErrorMessage}
          disabled={true}
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
          value={spanOfLoading || "0"}
          isValid={spanOfLoadingIsValid}
          errorMessage={spanOfLoadingErrorMessage}
          disabled={true}
        />
      </div>
    </motion.div>
  );
}
