import React from "react";
import PropTypes from "prop-types";

export default function UpArrow({ className, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      {...props}
    >
      <path d="M7 14.5L12 9.5L17 14.5H7Z" fill="#000" />
    </svg>
  );
}

UpArrow.propTypes = {
  className: PropTypes.string,
};
