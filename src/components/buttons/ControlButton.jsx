import React from "react";
import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";

export default function ControlButton({ className, children, onClick }) {
  return (
    <button
      className={twMerge(
        "text-secondary text-sm not-italic font-semibold leading-[133%] flex items-center font-inter gap-x-2 transition-all duration-200 ease-in-out transform active:scale-95 outline-none focus:outline-none",
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

ControlButton.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
};
