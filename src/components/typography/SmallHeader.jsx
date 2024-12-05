import React from "react";
import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";

export default function SmallHeader({ className, children }) {
  return (
    <h3
      className={twMerge(
        "text-secondary text-xl not-italic font-extrabold leading-[normal] font-inter",
        className
      )}
    >
      {children}
    </h3>
  );
}

SmallHeader.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};
