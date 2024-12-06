import React, { useState } from "react";
import { motion } from "framer-motion";
import PropertyWrapper from "../../../components/wrappers/PropertyWrapper";
import WrapperHeader from "../../../components/typography/WrapperHeader";
import WrapperParagraph from "../../../components/typography/WrapperParagraph";
import NumberInput from "../../../components/inputs/NumberInput";
import WrapperButton from "../../../components/buttons/WrapperButton";
import WrapperToggle from "../../../components/toggles/WrapperToggle";
import UpArrow from "../../../icons/UpArrow";
import { MetreUnit } from "../../../icons/units";
import {
  PinnedSupport,
  RollerSupport,
  FixedSupport,
} from "../../../icons/Properties";

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

export default function SupportSection() {
  const [showConfig, setShowConfig] = useState(false);
  const [supportType, setSupportType] = useState(null);

  const toggleShowConfigHandler = () => {
    setShowConfig((previousConfig) => !previousConfig);
  };

  const isRollerSupport = supportType === 1;
  const isPinnedSupport = supportType === 0;
  const isFixedSupport = supportType === 2;

  return (
    <PropertyWrapper className="">
      <button
        onClick={toggleShowConfigHandler}
        className="inline-flex w-full items-center justify-between"
      >
        <WrapperHeader>Supports</WrapperHeader>
        <UpArrow
          className={`transform transition-transform ${
            showConfig ? "rotate-180" : ""
          }`}
        />
      </button>
      <motion.div
        initial="hidden"
        animate={showConfig ? "visible" : "hidden"}
        variants={typeDropdownVariants}
        className="space-y-[1rem] overflow-hidden"
      >
        <WrapperParagraph>Support Type</WrapperParagraph>
        <div className="flex gap-x-[0.5rem]">
          <PinnedSupport
            active={isPinnedSupport}
            onClick={() => setSupportType(0)}
          />
          <RollerSupport
            active={isRollerSupport}
            onClick={() => setSupportType(1)}
          />
          <FixedSupport
            active={isFixedSupport}
            onClick={() => setSupportType(2)}
          />
        </div>
        {isPinnedSupport && <PinnedSupportSettings />}
        {isRollerSupport && <RollerSupportSettings />}
        {isFixedSupport && <FixedSupportSettings />}
      </motion.div>
    </PropertyWrapper>
  );
}

function PinnedSupportSettings() {
  const [showSinking, setShowSinking] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }} // Animation on mount (fade in and slide down)
      animate={{ opacity: 1, y: 0 }} // Final state
      exit={{ opacity: 0, y: -10 }} // Animation on unmount (fade out and slide up)
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
      className="w-full px-1"
      key="pinned-support"
    >
      <WrapperToggle
        checked={showSinking}
        onChange={setShowSinking}
        className="mb-[1rem]"
      />
      <motion.div
        initial="hidden"
        animate={showSinking ? "visible" : "hidden"}
        variants={configDropdownVariants}
      >
        <NumberInput Icon={MetreUnit} />
      </motion.div>
      <div className="space-y-[0.5rem] mb-[1rem]">
        <WrapperParagraph>Distance (from left)</WrapperParagraph>
        <NumberInput Icon={MetreUnit} />
      </div>
      <WrapperButton>Apply</WrapperButton>
    </motion.div>
  );
}

function RollerSupportSettings() {
  const [showSinking, setShowSinking] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }} // Animation on mount (fade in and slide down)
      animate={{ opacity: 1, y: 0 }} // Final state
      exit={{ opacity: 0, y: -10 }} // Animation on unmount (fade out and slide up)
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
      className="w-full px-1"
      key="roller-support"
    >
      <WrapperToggle
        checked={showSinking}
        onChange={setShowSinking}
        className="mb-[1rem]"
      />
      <motion.div
        initial="hidden"
        animate={showSinking ? "visible" : "hidden"}
        variants={configDropdownVariants}
      >
        <NumberInput Icon={MetreUnit} />
      </motion.div>
      <div className="space-y-[0.5rem] mb-[1rem]">
        <WrapperParagraph>Distance (from left)</WrapperParagraph>
        <NumberInput Icon={MetreUnit} />
      </div>
      <WrapperButton>Apply</WrapperButton>
    </motion.div>
  );
}

function FixedSupportSettings() {
  const [showSinking, setShowSinking] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }} // Animation on mount (fade in and slide down)
      animate={{ opacity: 1, y: 0 }} // Final state
      exit={{ opacity: 0, y: -10 }} // Animation on unmount (fade out and slide up)
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
      className="w-full px-1"
      key="fixed-support"
    >
      <WrapperToggle
        checked={showSinking}
        onChange={setShowSinking}
        className="mb-[1rem]"
      />
      <motion.div
        initial="hidden"
        animate={showSinking ? "visible" : "hidden"}
        variants={configDropdownVariants}
      >
        <NumberInput Icon={MetreUnit} />
      </motion.div>
      <div className="space-y-[0.5rem] mb-[1rem]">
        <WrapperParagraph>Distance (from left)</WrapperParagraph>
        <NumberInput Icon={MetreUnit} />
      </div>
      <WrapperButton>Apply</WrapperButton>
    </motion.div>
  );
}
