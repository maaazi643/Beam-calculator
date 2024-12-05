import React from "react";
import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";

export default function WrapperHeader({ className, children }) {
  return (
    <h3
      className={twMerge(
        "text-secondary text-base not-italic font-semibold leading-[normal] font-inter",
        className
      )}
    >
      {children}
    </h3>
  );
}

WrapperHeader.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};
