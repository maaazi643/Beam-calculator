import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { beamActions } from "../../store/beam";
import { motion, AnimatePresence } from "framer-motion";
import PropertyWrapper from "../../components/wrappers/PropertyWrapper";
import MemberIndicator from "../../components/indicators/MemberIndicator";
import WrapperHeader from "../../components/typography/WrapperHeader";
import WrapperParagraph from "../../components/typography/WrapperParagraph";
import NumberInput from "../../components/inputs/NumberInput";
import WrapperButton from "../../components/buttons/WrapperButton";
import DeleteButton from "../../components/buttons/DeleteButton";
import UpArrow from "../../icons/UpArrow";
import Trash from "../../icons/Trash";
import { MetreUnit, EIUnit } from "../../icons/units";
import RoundedPlus from "../../icons/RoundedPlus";
import { createNewSpan } from "../../store/beam-utils";
import {
  validateSpanLength,
  validateSpanFlexuralRigidity,
  validateSpans,
} from "../../utils/validators";
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

export default function SpanSection() {
  const dispatch = useDispatch();
  const { showSpanConfig, spans, beamPropertiesUndoStack, beamProperties } =
    useSelector((state) => state.beam);

  const toggleShowConfigHandler = () => {
    dispatch(
      beamActions.set({ key: "showSpanConfig", value: !showSpanConfig })
    );
  };

  const addSpanHandler = () => {
    dispatch(
      beamActions.set({ key: "spans", value: [...spans, createNewSpan()] })
    );
  };

  const applySpanHandler = () => {
    const [spansAreValid, errorMessage] = validateSpans(spans)

    if (!spansAreValid) {
      showNotification(errorMessage);
      return;
    }

    const newBeamProperties = { ...beamProperties };
    newBeamProperties.spans = spans;
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
        onClick={toggleShowConfigHandler}
        className="inline-flex w-full items-center justify-between"
      >
        <WrapperHeader className="flex flex-row items-center gap-2">
          <span>Spans</span>
          <motion.span
            initial="hidden"
            animate={spans.length > 0 ? "visible" : "hidden"}
            variants={indicatorVariants}
          >
            <MemberIndicator number={spans.length} />
          </motion.span>
        </WrapperHeader>
        <UpArrow
          className={`transform transition-transform ${
            !showSpanConfig ? "rotate-180" : ""
          }`}
        />
      </button>
      <motion.div
        initial="hidden"
        animate={showSpanConfig ? "visible" : "hidden"}
        variants={dropdownVariants}
        className="space-y-[1rem] overflow-hidden px-1"
      >
        <AnimatePresence>
          {spans.map((span) => (
            <motion.div
              key={span.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <SpanItem key={span.id} span={span} />
            </motion.div>
          ))}
        </AnimatePresence>
        <WrapperButton onClick={addSpanHandler}>
          <span>Add New Span</span>
          <RoundedPlus />
        </WrapperButton>
        <WrapperButton onClick={applySpanHandler}>Apply</WrapperButton>
      </motion.div>
    </PropertyWrapper>
  );
}

function SpanItem({ span }) {
  const dispatch = useDispatch();
  const { spans } = useSelector((state) => state.beam);
  const [lengthIsValid, lengthErrorMessage] = validateSpanLength(span.length);
  const [flexuralRigidityIsValid, flexuralRigidityErrorMessage] =
    validateSpanFlexuralRigidity(span.flexuralRigidity);

  const lengthChangeHandler = (length) => {
    const newSpans = [...spans];
    const spanIndex = newSpans.findIndex((s) => s.id === span.id);
    newSpans[spanIndex] = { ...span, length: length };
    dispatch(beamActions.set({ key: "spans", value: newSpans }));
  };

  const flexuralRigidityChangeHandler = (flexuralRigidity) => {
    const newSpans = [...spans];
    const spanIndex = newSpans.findIndex((s) => s.id === span.id);
    newSpans[spanIndex] = { ...span, flexuralRigidity: flexuralRigidity };
    dispatch(beamActions.set({ key: "spans", value: newSpans }));
  };

  const deleteSpanHandler = () => {
    const newSpans = spans.filter((s) => s.id !== span.id);
    dispatch(beamActions.set({ key: "spans", value: newSpans }));
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
            value={span.length}
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
            value={span.flexuralRigidity}
            isValid={flexuralRigidityIsValid}
            errorMessage={flexuralRigidityErrorMessage}
          />
        </div>
      </div>
      <DeleteButton onClick={deleteSpanHandler}>
        <Trash />
      </DeleteButton>
    </div>
  );
}

SpanItem.propTypes = {
  span: PropTypes.object,
};
