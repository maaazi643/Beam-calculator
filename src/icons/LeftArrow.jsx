import React from "react";
import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";

export default function LeftArrow({ className, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      className={twMerge("fill-secondary", className)}
    >
      <path
        d="M13.3333 7.83329H5.21996L8.94663 4.10663L7.99996 3.16663L2.66663 8.49996L7.99996 13.8333L8.93996 12.8933L5.21996 9.16663H13.3333V7.83329Z"
      />
    </svg>
  );
}

LeftArrow.propTypes = {
  className: PropTypes.string,
};
