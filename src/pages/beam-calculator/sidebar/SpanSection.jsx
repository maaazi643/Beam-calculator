import React, { useState } from "react";
import { motion } from "framer-motion";
import PropertyWrapper from "../../../components/wrappers/PropertyWrapper";
import WrapperHeader from "../../../components/typography/WrapperHeader";
import WrapperParagraph from "../../../components/typography/WrapperParagraph";
import NumberInput from "../../../components/inputs/NumberInput";
import WrapperButton from "../../../components/buttons/WrapperButton";
import UpArrow from "../../../icons/UpArrow";
import { MetreUnit, EIUnit } from "../../../icons/units";
import RoundedPlus from "../../../icons/RoundedPlus";

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

export default function SpanSection() {
  const [showConfig, setShowConfig] = useState(false);

  const toggleShowConfigHandler = () => {
    setShowConfig((previousConfig) => !previousConfig);
  };

  return (
    <PropertyWrapper className="">
      <button
        onClick={toggleShowConfigHandler}
        className="inline-flex w-full items-center justify-between"
      >
        <WrapperHeader>Spans</WrapperHeader>
        <UpArrow
          className={`transform transition-transform ${
            showConfig ? "rotate-180" : ""
          }`}
        />
      </button>
      <motion.div
        initial="hidden"
        animate={showConfig ? "visible" : "hidden"}
        variants={dropdownVariants}
        className="space-y-[1rem] overflow-hidden px-1"
      >
        <div className="flex flex-row gap-x-[1rem]">
          <div className="space-y-[0.5rem]">
            <WrapperParagraph>Length</WrapperParagraph>
            <NumberInput icon={<MetreUnit />} placeholder="" />
          </div>
          <div className="space-y-[0.5rem]">
            <WrapperParagraph>EI</WrapperParagraph>
            <NumberInput icon={<EIUnit />} placeholder="" />
          </div>
        </div>
        <WrapperButton>
          <span>Add New Span</span>
          <RoundedPlus />
        </WrapperButton>
        <WrapperButton>Apply</WrapperButton>
      </motion.div>
    </PropertyWrapper>
  );
}
