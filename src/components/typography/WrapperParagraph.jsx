import React from "react";
import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";

export default function WrapperParagraph({ className, children }) {
  return (
    <h3
      className={twMerge(
        "text-secondary text-sm not-italic font-semibold leading-[normal] font-inter",
        className
      )}
    >
      {children}
    </h3>
  );
}

WrapperParagraph.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};
