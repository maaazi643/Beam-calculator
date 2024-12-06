import React from "react";
import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";

export default function SolveButton({ children, onClick, ...props }) {
  return (
    <button
      className={twMerge(
        "bg-secondary w-full flex justify-center items-center rounded text-primary text-center text-sm not-italic font-semibold leading-[133%] px-4 py-[0.6875rem] transition-all duration-200 ease-in-out transform active:scale-95 outline-none "
      )}
      onClick={onClick}
      type="submit"
      {...props}
    >
      {children || "Solve"}
    </button>
  );
}

SolveButton.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
};
