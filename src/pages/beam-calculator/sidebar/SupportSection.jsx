import React from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { beamActions } from "../../../store/beam";
import PropertyWrapper from "../../../components/wrappers/PropertyWrapper";
import MemberIndicator from "../../../components/indicators/MemberIndicator";
import WrapperHeader from "../../../components/typography/WrapperHeader";
import WrapperParagraph from "../../../components/typography/WrapperParagraph";
import NumberInput from "../../../components/inputs/NumberInput";
import WrapperButton from "../../../components/buttons/WrapperButton";
import WrapperToggle from "../../../components/toggles/WrapperToggle";
import DeleteButton from "../../../components/buttons/DeleteButton";
import UpArrow from "../../../icons/UpArrow";
import Trash from "../../../icons/Trash";
import RoundedPlus from "../../../icons/RoundedPlus";
import { MetreUnit } from "../../../icons/units";
import {
  PinnedSupport,
  RollerSupport,
  FixedSupport,
} from "../../../icons/Properties";
import { createNewSupport, supportEnums } from "../../../store/beam-utils";
import {
  validateSupportSinkingValue,
  validateSupportDistanceFromLeft,
} from "../../../utils/validators";

const typeDropdownVariants = {
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

export default function SupportSection() {
  const dispatch = useDispatch();
  const {
    showSupportConfig,
    supports,
    beamPropertiesUndoStack,
    beamProperties,
  } = useSelector((state) => state.beam);

  const toggleShowSupportHandler = () => {
    dispatch(
      beamActions.set({ key: "showSupportConfig", value: !showSupportConfig })
    );
  };

  const addSupportHandler = () => {
    dispatch(
      beamActions.set({
        key: "supports",
        value: [...supports, createNewSupport()],
      })
    );
  };

  const applyLoadingHandler = () => {
    const newBeamProperties = { ...beamProperties };
    newBeamProperties.supports = supports;
    dispatch(
      beamActions.set([
        { key: "beamProperties", value: newBeamProperties },
        {
          key: "beamPropertiesUndoStack",
          value: [...beamPropertiesUndoStack, newBeamProperties],
        },
      ])
    );
  };

  return (
    <PropertyWrapper className="">
      <button
        onClick={toggleShowSupportHandler}
        className="inline-flex w-full items-center justify-between"
      >
        <WrapperHeader className="flex flex-row items-center gap-2">
          <span>Supports</span>
          <motion.span
            initial="hidden"
            animate={supports.length > 0 ? "visible" : "hidden"}
            variants={indicatorVariants}
          >
            <MemberIndicator number={supports.length} />
          </motion.span>{" "}
        </WrapperHeader>
        <UpArrow
          className={`transform transition-transform ${
            !showSupportConfig ? "rotate-180" : ""
          }`}
        />
      </button>
      <motion.div
        initial="hidden"
        animate={showSupportConfig ? "visible" : "hidden"}
        variants={typeDropdownVariants}
        className="space-y-[1rem] overflow-hidden"
      >
        <AnimatePresence>
          {supports.map((support) => (
            <motion.div
              key={support.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <SupportItem key={support.id} support={support} />
            </motion.div>
          ))}
        </AnimatePresence>
        <WrapperButton onClick={addSupportHandler}>
          <span>Add New Support</span>
          <RoundedPlus />
        </WrapperButton>
        <WrapperButton onClick={applyLoadingHandler}>Apply</WrapperButton>
      </motion.div>
    </PropertyWrapper>
  );
}

const supportPropTypes = PropTypes.shape({
  id: PropTypes.string.isRequired, // Assuming uuidv4() generates a string
  type: PropTypes.string.isRequired, // Replace with specific values if type has a fixed set of options
  sinking: PropTypes.bool.isRequired, // Indicates sinking status
  sinkingValue: PropTypes.number.isRequired, // Numeric value for sinking
  distanceFromLeft: PropTypes.number.isRequired, // Numeric distance
}).isRequired;

function SupportItem({ support }) {
  const dispatch = useDispatch();
  const { supports } = useSelector((state) => state.beam);

  const { type } = support;

  const isRollerSupport = type === supportEnums.roller;
  const isPinnedSupport = type === supportEnums.pinned;
  const isFixedSupport = type === supportEnums.fixed;

  const changeSupportType = (type) => {
    const newSupport = {
      ...support,
      type: type,
      sinking: false,
      sinkingValue: "",
      distanceFromLeft: "",
    };
    const newSupports = supports.map((s) =>
      s.id === support.id ? newSupport : s
    );
    dispatch(beamActions.set({ key: "supports", value: newSupports }));
  };

  return (
    <div className="space-y-[1rem] px-[0.5px] support-section">
      <WrapperParagraph>Support Type</WrapperParagraph>
      <div className="flex gap-x-[0.5rem]">
        <PinnedSupport
          active={isPinnedSupport}
          onClick={changeSupportType.bind(null, supportEnums.pinned)}
        />
        <RollerSupport
          active={isRollerSupport}
          onClick={changeSupportType.bind(null, supportEnums.roller)}
        />
        <FixedSupport
          active={isFixedSupport}
          onClick={changeSupportType.bind(null, supportEnums.fixed)}
        />
      </div>
      {isPinnedSupport && <PinnedSupportSettings support={support} />}
      {isRollerSupport && <RollerSupportSettings support={support} />}
      {isFixedSupport && <FixedSupportSettings support={support} />}
    </div>
  );
}

SupportItem.propTypes = supportPropTypes;

function PinnedSupportSettings({ support }) {
  const dispatch = useDispatch();
  const { supports } = useSelector((state) => state.beam);
  const { type, sinking, sinkingValue, distanceFromLeft } = support;
  const [sinkingValueIsValid, sinkingErrorMessage] =
    validateSupportSinkingValue(type, sinkingValue);
  const [distanceFromLeftIsValid, distanceFromLeftErrorMessage] =
    validateSupportDistanceFromLeft(type, distanceFromLeft);

  const sinkingChangeHandler = (sinkingValue) => {
    const newSupport = { ...support, sinkingValue: sinkingValue };
    const newSupports = supports.map((s) =>
      s.id === support.id ? newSupport : s
    );
    dispatch(beamActions.set({ key: "supports", value: newSupports }));
  };

  const distanceFromLeftChangeHandler = (distanceFromLeft) => {
    const newSupport = { ...support, distanceFromLeft: distanceFromLeft };
    const newSupports = supports.map((s) =>
      s.id === support.id ? newSupport : s
    );
    dispatch(beamActions.set({ key: "supports", value: newSupports }));
  };

  const setSinking = (value) => {
    sinkingChangeHandler("");
    const newSupport = { ...support, sinking: value };
    const newSupports = supports.map((s) =>
      s.id === support.id ? newSupport : s
    );
    dispatch(beamActions.set({ key: "supports", value: newSupports }));
  };

  const deleteSupportHandler = () => {
    const newSupports = supports.filter((s) => s.id !== support.id);
    dispatch(beamActions.set({ key: "supports", value: newSupports }));
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
      className="w-full"
      key="pinned-support"
    >
      <WrapperToggle
        checked={sinking}
        onChange={setSinking}
        className="mb-[1rem]"
      />

      <motion.div
        initial="hidden"
        animate={sinking ? "visible" : "hidden"}
        variants={configDropdownVariants}
      >
        <NumberInput
          Icon={MetreUnit}
          onChange={sinkingChangeHandler}
          value={sinkingValue}
          isValid={sinkingValueIsValid}
          errorMessage={sinkingErrorMessage}
        />
      </motion.div>
      <div className="space-y-[0.5rem] mb-[1rem]">
        <WrapperParagraph>Distance (from left)</WrapperParagraph>
        <NumberInput
          Icon={MetreUnit}
          onChange={distanceFromLeftChangeHandler}
          value={distanceFromLeft}
          isValid={distanceFromLeftIsValid}
          errorMessage={distanceFromLeftErrorMessage}
        />
      </div>
      <DeleteButton onClick={deleteSupportHandler}>
        <Trash />
      </DeleteButton>
    </motion.div>
  );
}

PinnedSupportSettings.propTypes = supportPropTypes;

function RollerSupportSettings({ support }) {
  const dispatch = useDispatch();
  const { supports } = useSelector((state) => state.beam);
  const { type, sinking, sinkingValue, distanceFromLeft } = support;
  const [sinkingValueIsValid, sinkingErrorMessage] =
    validateSupportSinkingValue(type, sinkingValue);
  const [distanceFromLeftIsValid, distanceFromLeftErrorMessage] =
    validateSupportDistanceFromLeft(type, distanceFromLeft);

  const sinkingChangeHandler = (sinkingValue) => {
    const newSupport = { ...support, sinkingValue: sinkingValue };
    const newSupports = supports.map((s) =>
      s.id === support.id ? newSupport : s
    );
    dispatch(beamActions.set({ key: "supports", value: newSupports }));
  };

  const distanceFromLeftChangeHandler = (distanceFromLeft) => {
    const newSupport = { ...support, distanceFromLeft: distanceFromLeft };
    const newSupports = supports.map((s) =>
      s.id === support.id ? newSupport : s
    );
    dispatch(beamActions.set({ key: "supports", value: newSupports }));
  };

  const setSinking = (value) => {
    sinkingChangeHandler("");
    const newSupport = { ...support, sinking: value };
    const newSupports = supports.map((s) =>
      s.id === support.id ? newSupport : s
    );
    dispatch(beamActions.set({ key: "supports", value: newSupports }));
  };

  const deleteSupportHandler = () => {
    const newSupports = supports.filter((s) => s.id !== support.id);
    dispatch(beamActions.set({ key: "supports", value: newSupports }));
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
      className="w-full"
      key="pinned-support"
    >
      <WrapperToggle
        checked={sinking}
        onChange={setSinking}
        className="mb-[1rem]"
      />
      <motion.div
        initial="hidden"
        animate={sinking ? "visible" : "hidden"}
        variants={configDropdownVariants}
      >
        <NumberInput
          Icon={MetreUnit}
          onChange={sinkingChangeHandler}
          value={sinkingValue}
          isValid={sinkingValueIsValid}
          errorMessage={sinkingErrorMessage}
        />
      </motion.div>
      <div className="space-y-[0.5rem] mb-[1rem]">
        <WrapperParagraph>Distance (from left)</WrapperParagraph>
        <NumberInput
          Icon={MetreUnit}
          onChange={distanceFromLeftChangeHandler}
          value={distanceFromLeft}
          isValid={distanceFromLeftIsValid}
          errorMessage={distanceFromLeftErrorMessage}
        />
      </div>
      <DeleteButton onClick={deleteSupportHandler}>
        <Trash />
      </DeleteButton>
    </motion.div>
  );
}

RollerSupportSettings.propTypes = supportPropTypes;

function FixedSupportSettings({ support }) {
  const dispatch = useDispatch();
  const { supports } = useSelector((state) => state.beam);
  const { type, sinking, sinkingValue, distanceFromLeft } = support;
  const [sinkingValueIsValid, sinkingErrorMessage] =
    validateSupportSinkingValue(type, sinkingValue);
  const [distanceFromLeftIsValid, distanceFromLeftErrorMessage] =
    validateSupportDistanceFromLeft(type, distanceFromLeft);

  const sinkingChangeHandler = (sinkingValue) => {
    const newSupport = { ...support, sinkingValue: sinkingValue };
    const newSupports = supports.map((s) =>
      s.id === support.id ? newSupport : s
    );
    dispatch(beamActions.set({ key: "supports", value: newSupports }));
  };

  const distanceFromLeftChangeHandler = (distanceFromLeft) => {
    const newSupport = { ...support, distanceFromLeft: distanceFromLeft };
    const newSupports = supports.map((s) =>
      s.id === support.id ? newSupport : s
    );
    dispatch(beamActions.set({ key: "supports", value: newSupports }));
  };

  const setSinking = (value) => {
    sinkingChangeHandler("");
    const newSupport = { ...support, sinking: value };
    const newSupports = supports.map((s) =>
      s.id === support.id ? newSupport : s
    );
    dispatch(beamActions.set({ key: "supports", value: newSupports }));
  };

  const deleteSupportHandler = () => {
    const newSupports = supports.filter((s) => s.id !== support.id);
    dispatch(beamActions.set({ key: "supports", value: newSupports }));
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
      className="w-full"
      key="pinned-support"
    >
      <WrapperToggle
        checked={sinking}
        onChange={setSinking}
        className="mb-[1rem]"
      />
      <motion.div
        initial="hidden"
        animate={sinking ? "visible" : "hidden"}
        variants={configDropdownVariants}
      >
        <NumberInput
          Icon={MetreUnit}
          onChange={sinkingChangeHandler}
          value={sinkingValue}
          isValid={sinkingValueIsValid}
          errorMessage={sinkingErrorMessage}
        />
      </motion.div>
      <div className="space-y-[0.5rem] mb-[1rem]">
        <WrapperParagraph>Distance (from left)</WrapperParagraph>
        <NumberInput
          Icon={MetreUnit}
          onChange={distanceFromLeftChangeHandler}
          value={distanceFromLeft}
          isValid={distanceFromLeftIsValid}
          errorMessage={distanceFromLeftErrorMessage}
        />
      </div>
      <DeleteButton onClick={deleteSupportHandler}>
        <Trash />
      </DeleteButton>
    </motion.div>
  );
}

FixedSupportSettings.propTypes = supportPropTypes;
