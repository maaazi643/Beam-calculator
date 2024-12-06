import React, { useState } from "react";
import { motion } from "framer-motion";
import PropertyWrapper from "../../../components/wrappers/PropertyWrapper";
import WrapperHeader from "../../../components/typography/WrapperHeader";
import WrapperParagraph from "../../../components/typography/WrapperParagraph";
import NumberInput from "../../../components/inputs/NumberInput";
import WrapperButton from "../../../components/buttons/WrapperButton";
import UpArrow from "../../../icons/UpArrow";
import { MetreUnit } from "../../../icons/units";
import {
  SinglePointLoad,
  UniformDistributedLoad,
  NonUniformDistributedLoad,
} from "../../../icons/Properties";

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

export default function LoadingSection() {
  const [showConfig, setShowConfig] = useState(false);
  const [loadType, setLoadType] = useState(null);

  const toggleShowConfigHandler = () => {
    setShowConfig((previousConfig) => !previousConfig);
  };

  const isSinglePointLoad = loadType === 0;
  const isUniformDistributedLoad = loadType === 1;
  const isNonUniformDistributedLoad = loadType === 2;

  return (
    <PropertyWrapper className="">
      <button
        onClick={toggleShowConfigHandler}
        className="inline-flex w-full items-center justify-between"
      >
        <WrapperHeader>Loadings</WrapperHeader>
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
        className="space-y-[1rem] overflow-hidden"
      >
        <WrapperParagraph>Loading Type</WrapperParagraph>
        <div className="flex gap-x-[0.5rem]">
          <SinglePointLoad
            active={isSinglePointLoad}
            onClick={() => setLoadType(0)}
          />
          <UniformDistributedLoad
            active={isUniformDistributedLoad}
            onClick={() => setLoadType(1)}
          />
          <NonUniformDistributedLoad
            active={isNonUniformDistributedLoad}
            onClick={() => setLoadType(2)}
          />
        </div>
        {isSinglePointLoad && <SinglePointLoadSettings />}
        {isUniformDistributedLoad && <UniformDistributedLoadSettings />}
        {isNonUniformDistributedLoad && <NonUniformDistributedLoadSettings />}
      </motion.div>
    </PropertyWrapper>
  );
}

function SinglePointLoadSettings() {
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
      key="single-point-load"
    >
      <div className="space-y-[0.5rem]">
        <WrapperParagraph>Distance (from left)</WrapperParagraph>
        <NumberInput icon={<MetreUnit />} />
      </div>
      <div className="space-y-[0.5rem]">
        <WrapperParagraph>Value of Loading</WrapperParagraph>
        <NumberInput icon={<MetreUnit />} />
      </div>
      <WrapperButton>Apply</WrapperButton>
    </motion.div>
  );
}

function UniformDistributedLoadSettings() {
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
        <NumberInput icon={<MetreUnit />} />
      </div>
      <div className="space-y-[0.5rem]">
        <WrapperParagraph>Value of Loading</WrapperParagraph>
        <NumberInput icon={<MetreUnit />} />
      </div>
      <div className="space-y-[0.5rem]">
        <WrapperParagraph>Span of Loading</WrapperParagraph>
        <NumberInput icon={<MetreUnit />} />
      </div>
      <WrapperButton>Apply</WrapperButton>
    </motion.div>
  );
}

function NonUniformDistributedLoadSettings() {
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
        <NumberInput icon={<MetreUnit />} />
      </div>
      <div className="space-y-[0.5rem]">
        <WrapperParagraph>Opening Value</WrapperParagraph>
        <NumberInput icon={<MetreUnit />} />
      </div>
      <div className="space-y-[0.5rem]">
        <WrapperParagraph>Closing Value</WrapperParagraph>
        <NumberInput icon={<MetreUnit />} />
      </div>
      <div className="space-y-[0.5rem]">
        <WrapperParagraph>Span of Loading</WrapperParagraph>
        <NumberInput icon={<MetreUnit />} />
      </div>
      <WrapperButton>Apply</WrapperButton>
    </motion.div>
  );
}
