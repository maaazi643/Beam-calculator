import React from "react";
import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";

const UnitWrapper = ({ children, className }) => {
  return (
    <span
      className={twMerge(
        "text-[#9E9E9E] text-sm not-italic font-semibold leading-[133%]",
        className
      )}
    >
      {children}
    </span>
  );
};

UnitWrapper.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export const MetreUnit = ({ className }) => {
  return <UnitWrapper className={className}>m</UnitWrapper>;
};

MetreUnit.propTypes = {
  className: PropTypes.string,
};

export const NewtonUnit = ({ className }) => {
  return <UnitWrapper className={className}>N</UnitWrapper>;
};

NewtonUnit.propTypes = {
  className: PropTypes.string,
};

export const KiloNewtonUnit = ({ className }) => {
  return <UnitWrapper className={className}>kN</UnitWrapper>;
};

KiloNewtonUnit.propTypes = {
  className: PropTypes.string,
};

export const EIUnit = ({ className }) => {
  return <UnitWrapper className={className}>EI</UnitWrapper>;
};

EIUnit.propTypes = {  
  className: PropTypes.string,
};