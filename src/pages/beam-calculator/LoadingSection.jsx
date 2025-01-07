import React from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { beamActions } from "../../store/beam";
import PropertyWrapper from "../../components/wrappers/PropertyWrapper";
import MemberIndicator from "../../components/indicators/MemberIndicator";
import WrapperHeader from "../../components/typography/WrapperHeader";
import WrapperParagraph from "../../components/typography/WrapperParagraph";
import NumberInput from "../../components/inputs/NumberInput";
import WrapperButton from "../../components/buttons/WrapperButton";
import DeleteButton from "../../components/buttons/DeleteButton";
import UpArrow from "../../icons/UpArrow";
import Trash from "../../icons/Trash";
import RoundedPlus from "../../icons/RoundedPlus";
import { MetreUnit, NewtonUnit, NewtonPerMetreUnit } from "../../icons/units";
import {
  SinglePointLoadButton,
  UniformDistributedLoadButton,
  UniformVaryingLoadButton,
} from "../../icons/Properties";
import {
  createNewLoad,
  getBeamTotalLength,
  loadingEnums,
} from "../../store/beam-utils";
import {
  validateLoadingDistanceFromLeft,
  validateLoadingValue,
  validateLoadingSpan,
  validateOpeningValue,
  validateClosingValue,
  validateLoadings,
} from "../../utils/validators";
import { showNotification } from "./Sidebar";

const loadingDropdownVariants = {
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

const indicatorVariants = {
  hidden: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
  visible: {
    opacity: 1,
    height: "auto",
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

export default function LoadingSection() {
  const dispatch = useDispatch();
  const {
    showLoadingConfig,
    loadings,
    beamPropertiesUndoStack,
    beamProperties,
  } = useSelector((state) => state.beam);

  const toggleShowConfigHandler = () => {
    dispatch(
      beamActions.set({ key: "showLoadingConfig", value: !showLoadingConfig })
    );
  };

  const addLoadingHandler = () => {
    dispatch(
      beamActions.set({
        key: "loadings",
        value: [...loadings, createNewLoad()],
      })
    );
  };

  const applyLoadingsHandler = () => {
    const [loadingsAreValid, errorMessage] = validateLoadings(
      loadings,
      getBeamTotalLength(beamProperties)
    );

    if (!loadingsAreValid) {
      showNotification(errorMessage);
      return;
    }

    const newBeamProperties = { ...beamProperties };
    newBeamProperties.loadings = loadings;
    dispatch(
      beamActions.set({ key: "beamProperties", value: newBeamProperties })
    );
    dispatch(
      beamActions.set({
        key: "beamPropertiesUndoStack",
        value: [...beamPropertiesUndoStack, newBeamProperties],
      })
    );
  };

  return (
    <PropertyWrapper className="">
      <button
        onClick={toggleShowConfigHandler}
        className="inline-flex w-full items-center justify-between"
      >
        <WrapperHeader className="flex flex-row items-center gap-2">
          <span>Loadings</span>
          <motion.span
            initial="hidden"
            animate={loadings.length > 0 ? "visible" : "hidden"}
            variants={indicatorVariants}
          >
            <MemberIndicator number={loadings.length} />
          </motion.span>{" "}
        </WrapperHeader>
        <UpArrow
          className={`transform transition-transform ${
            !showLoadingConfig ? "rotate-180" : ""
          }`}
        />
      </button>
      <motion.div
        initial="hidden"
        animate={showLoadingConfig ? "visible" : "hidden"}
        variants={loadingDropdownVariants}
        className="space-y-[1rem] overflow-hidden"
      >
        <AnimatePresence>
          {loadings.map((load) => (
            <motion.div
              key={load.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <LoadingItem key={load.id} load={load} />
            </motion.div>
          ))}
        </AnimatePresence>
        <WrapperButton onClick={addLoadingHandler}>
          <span>Add New Load</span>
          <RoundedPlus />
        </WrapperButton>
        <WrapperButton onClick={applyLoadingsHandler}>Apply</WrapperButton>
      </motion.div>
    </PropertyWrapper>
  );
}

function LoadingItem({ load }) {
  const dispatch = useDispatch();
  const { loadings } = useSelector((state) => state.beam);

  const { type } = load;

  const isSinglePointLoad = type === loadingEnums.single;
  const isUniformDistributedLoad = type === loadingEnums.uniform;
  const isNonUniformDistributedLoad = type === loadingEnums.varying;

  const changeLoadType = (type) => {
    const newLoad = {
      ...load,
      type: type,
      distanceFromLeft: "",
      valueOfLoading: "",
      spanOfLoading: "",
      openingValue: "",
      closingValue: "",
    };
    const newSupports = loadings.map((s) => (s.id === load.id ? newLoad : s));
    dispatch(beamActions.set({ key: "loadings", value: newSupports }));
  };

  return (
    <div className="loading-section space-y-[1rem] px-[0.5px]">
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
      {isSinglePointLoad && <SinglePointLoadSettings load={load} />}
      {isUniformDistributedLoad && (
        <UniformDistributedLoadSettings load={load} />
      )}
      {isNonUniformDistributedLoad && (
        <UniformVaryingLoadSettings load={load} />
      )}
    </div>
  );
}

const loadingPropTypes = PropTypes.shape({
  id: PropTypes.string.isRequired, // Assuming uuidv4() generates a string
  type: PropTypes.string.isRequired, // Replace with specific allowed values if applicable
  distanceFromLeft: PropTypes.number.isRequired, // Numeric value for distance
  valueOfLoading: PropTypes.number.isRequired, // Value of the load
  spanOfLoading: PropTypes.number.isRequired, // Span affected by the load
  openingValue: PropTypes.number, // Optional: value at the start of the load
  closingValue: PropTypes.number, // Optional: value at the end of the load
}).isRequired;

LoadingItem.propTypes = loadingPropTypes;

function SinglePointLoadSettings({ load }) {
  const dispatch = useDispatch();
  const { loadings } = useSelector((state) => state.beam);
  const { type, distanceFromLeft, valueOfLoading } = load;

  const [distanceFromLeftIsValid, distanceFromLeftErrorMessage] =
    validateLoadingDistanceFromLeft(type, distanceFromLeft);
  const [valueOfLoadingIsValid, valueOfLoadingErrorMessage] =
    validateLoadingValue(type, valueOfLoading);

  const distanceFromLeftChangeHandler = (distanceFromLeft) => {
    const newLoad = { ...load, distanceFromLeft: distanceFromLeft };
    const newSupports = loadings.map((s) => (s.id === load.id ? newLoad : s));
    dispatch(beamActions.set({ key: "loadings", value: newSupports }));
  };

  const valueOfLoadingChangeHandler = (valueOfLoading) => {
    const newLoad = { ...load, valueOfLoading: valueOfLoading };
    const newSupports = loadings.map((s) => (s.id === load.id ? newLoad : s));
    dispatch(beamActions.set({ key: "loadings", value: newSupports }));
  };

  const deleteLoadHandler = () => {
    const newLoadings = loadings.filter((l) => l.id !== load.id);
    dispatch(beamActions.set({ key: "loadings", value: newLoadings }));
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
          onChange={distanceFromLeftChangeHandler}
          value={distanceFromLeft}
          isValid={distanceFromLeftIsValid}
          errorMessage={distanceFromLeftErrorMessage}
        />
      </div>
      <div className="space-y-[0.5rem]">
        <WrapperParagraph>Value of Loading</WrapperParagraph>
        <NumberInput
          Icon={NewtonUnit}
          onChange={valueOfLoadingChangeHandler}
          value={valueOfLoading}
          isValid={valueOfLoadingIsValid}
          errorMessage={valueOfLoadingErrorMessage}
        />
      </div>
      <DeleteButton onClick={deleteLoadHandler}>
        <Trash />
      </DeleteButton>
    </motion.div>
  );
}

SinglePointLoadSettings.propTypes = loadingPropTypes;

function UniformDistributedLoadSettings({ load }) {
  const dispatch = useDispatch();
  const { loadings } = useSelector((state) => state.beam);
  const { type, distanceFromLeft, valueOfLoading, spanOfLoading } = load;

  const [distanceFromLeftIsValid, distanceFromLeftErrorMessage] =
    validateLoadingDistanceFromLeft(type, distanceFromLeft);
  const [valueOfLoadingIsValid, valueOfLoadingErrorMessage] =
    validateLoadingValue(type, valueOfLoading);
  const [spanOfLoadingIsValid, spanOfLoadingErrorMessage] = validateLoadingSpan(
    type,
    spanOfLoading
  );

  const distanceFromLeftChangeHandler = (distanceFromLeft) => {
    const newLoad = { ...load, distanceFromLeft: distanceFromLeft };
    const newSupports = loadings.map((s) => (s.id === load.id ? newLoad : s));
    dispatch(beamActions.set({ key: "loadings", value: newSupports }));
  };

  const valueOfLoadingChangeHandler = (valueOfLoading) => {
    const newLoad = { ...load, valueOfLoading: valueOfLoading };
    const newSupports = loadings.map((s) => (s.id === load.id ? newLoad : s));
    dispatch(beamActions.set({ key: "loadings", value: newSupports }));
  };

  const spanOfLoadingChangeHandler = (spanOfLoading) => {
    const newLoad = { ...load, spanOfLoading: spanOfLoading };
    const newSupports = loadings.map((s) => (s.id === load.id ? newLoad : s));
    dispatch(beamActions.set({ key: "loadings", value: newSupports }));
  };

  const deleteLoadHandler = () => {
    const newLoadings = loadings.filter((l) => l.id !== load.id);
    dispatch(beamActions.set({ key: "loadings", value: newLoadings }));
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
      className="w-full space-y-[1rem] px-1"
      key="uniform-distributed-load"
    >
      <div className="space-y-[0.5rem]">
        <WrapperParagraph>Distance (from left)</WrapperParagraph>
        <NumberInput
          Icon={MetreUnit}
          onChange={distanceFromLeftChangeHandler}
          value={distanceFromLeft}
          isValid={distanceFromLeftIsValid}
          errorMessage={distanceFromLeftErrorMessage}
        />
      </div>
      <div className="space-y-[0.5rem]">
        <WrapperParagraph>Value of Loading</WrapperParagraph>
        <NumberInput
          Icon={NewtonPerMetreUnit}
          onChange={valueOfLoadingChangeHandler}
          value={valueOfLoading}
          isValid={valueOfLoadingIsValid}
          errorMessage={valueOfLoadingErrorMessage}
        />
      </div>
      <div className="space-y-[0.5rem]">
        <WrapperParagraph>Span of Loading</WrapperParagraph>
        <NumberInput
          Icon={MetreUnit}
          onChange={spanOfLoadingChangeHandler}
          value={spanOfLoading}
          isValid={spanOfLoadingIsValid}
          errorMessage={spanOfLoadingErrorMessage}
        />
      </div>
      <DeleteButton onClick={deleteLoadHandler}>
        <Trash />
      </DeleteButton>
    </motion.div>
  );
}

UniformDistributedLoadSettings.propTypes = loadingPropTypes;

function UniformVaryingLoadSettings({ load }) {
  const dispatch = useDispatch();
  const { loadings } = useSelector((state) => state.beam);
  const { type, distanceFromLeft, spanOfLoading, openingValue, closingValue } =
    load;

  const [distanceFromLeftIsValid, distanceFromLeftErrorMessage] =
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

  const distanceFromLeftChangeHandler = (distanceFromLeft) => {
    const newLoad = { ...load, distanceFromLeft: distanceFromLeft };
    const newSupports = loadings.map((s) => (s.id === load.id ? newLoad : s));
    dispatch(beamActions.set({ key: "loadings", value: newSupports }));
  };

  const openingValueChangeHandler = (openingValue) => {
    const newLoad = { ...load, openingValue: openingValue };
    const newSupports = loadings.map((s) => (s.id === load.id ? newLoad : s));
    dispatch(beamActions.set({ key: "loadings", value: newSupports }));
  };

  const closingValueChangeHandler = (closingValue) => {
    const newLoad = { ...load, closingValue: closingValue };
    const newSupports = loadings.map((s) => (s.id === load.id ? newLoad : s));
    dispatch(beamActions.set({ key: "loadings", value: newSupports }));
  };

  const spanOfLoadingChangeHandler = (spanOfLoading) => {
    const newLoad = { ...load, spanOfLoading: spanOfLoading };
    const newSupports = loadings.map((s) => (s.id === load.id ? newLoad : s));
    dispatch(beamActions.set({ key: "loadings", value: newSupports }));
  };

  const deleteLoadHandler = () => {
    const newLoadings = loadings.filter((l) => l.id !== load.id);
    dispatch(beamActions.set({ key: "loadings", value: newLoadings }));
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
      className="w-full space-y-[1rem] px-1"
      key="non-uniform-distributed-load"
    >
      <div className="space-y-[0.5rem]">
        <WrapperParagraph>Distance (from left)</WrapperParagraph>
        <NumberInput
          Icon={MetreUnit}
          onChange={distanceFromLeftChangeHandler}
          value={distanceFromLeft}
          isValid={distanceFromLeftIsValid}
          errorMessage={distanceFromLeftErrorMessage}
        />
      </div>
      <div className="space-y-[0.5rem]">
        <WrapperParagraph>Opening Value</WrapperParagraph>
        <NumberInput
          Icon={NewtonPerMetreUnit}
          onChange={openingValueChangeHandler}
          value={openingValue}
          isValid={openingValueIsValid}
          errorMessage={openingValueErrorMessage}
        />
      </div>
      <div className="space-y-[0.5rem]">
        <WrapperParagraph>Closing Value</WrapperParagraph>
        <NumberInput
          Icon={NewtonPerMetreUnit}
          onChange={closingValueChangeHandler}
          value={closingValue}
          isValid={closingValueIsValid}
          errorMessage={closingValueErrorMessage}
        />
      </div>
      <div className="space-y-[0.5rem]">
        <WrapperParagraph>Span of Loading</WrapperParagraph>
        <NumberInput
          Icon={MetreUnit}
          onChange={spanOfLoadingChangeHandler}
          value={spanOfLoading}
          isValid={spanOfLoadingIsValid}
          errorMessage={spanOfLoadingErrorMessage}
        />
      </div>
      <DeleteButton onClick={deleteLoadHandler}>
        <Trash />
      </DeleteButton>
    </motion.div>
  );
}

UniformVaryingLoadSettings.propTypes = loadingPropTypes;
