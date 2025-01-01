import React from "react";
import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";

export default function BigHeader({ className, children }) {
  return (
    <h1
      className={twMerge(
        "text-secondary text-xl sm:text-[2rem] not-italic font-extrabold leading-[150%] font-inter",
        className
      )}
    >
      {children}
    </h1>
  )
}

BigHeader.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};
