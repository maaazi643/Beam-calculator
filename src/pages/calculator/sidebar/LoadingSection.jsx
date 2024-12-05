import React, { useState } from "react";
import { motion } from "framer-motion";
import PropertyWrapper from "../../../components/wrappers/PropertyWrapper";
import WrapperHeader from "../../../components/typography/WrapperHeader";
import WrapperParagraph from "../../../components/typography/WrapperParagraph";
import UpArrow from "../../../icons/UpArrow";
import {
  SinglePointLoad,
  UniformDistributedLoad,
  NonUniformDistributedLoad
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
  },
};

export default function LoadingSection() {
  const [showConfig, setShowConfig] = useState(true);
  const [loadType, setLoadType] = useState(0);

  const toggleShowConfigHandler = () => {
    setShowConfig((previousConfig) => !previousConfig);
  };

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
            active={0 === loadType}
            onClick={() => setLoadType(0)}
          />
          <UniformDistributedLoad
            active={1 === loadType}
            onClick={() => setLoadType(1)}
          />
          <NonUniformDistributedLoad
            active={2 === loadType}
            onClick={() => setLoadType(2)}
          />
        </div>
        <WrapperParagraph>Distance (from left)</WrapperParagraph>
        <WrapperParagraph>Value of Loading</WrapperParagraph>
      </motion.div>
    </PropertyWrapper>
  );
}
