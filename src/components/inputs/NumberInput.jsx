import React from "react";
import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";

export default function NumberInput({ className, icon, ...props }) {
  return (
    <div className={twMerge("relative w-full", className)}>
      <input
        type="number"
        step="0.01"
        min="0"
        className={`w-full flex items-center gap-[0.8125rem] pl-[1.125rem] py-[0.8rem] border border-[#D4D4D8] rounded-[0.4375rem] border-solid focus:border-[#CDCED9] focus:ring-1 focus:ring-[#CDCED9] outline-none transition-colors`}
        placeholder="Enter a number"
        {...props}
      />
      {icon && (
        <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
          {icon}
        </span>
      )}
    </div>
  );
}

NumberInput.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.node,
};
