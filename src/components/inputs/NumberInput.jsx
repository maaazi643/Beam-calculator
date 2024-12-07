import React, { useState } from "react";
import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";
import { motion, AnimatePresence } from "framer-motion";

export default function NumberInput({
  className,
  Icon,
  value,
  onChange,
  errorMessage,
  isValid,
  ...props
}) {
  const [isBlurred, setIsBlurred] = useState(false);

  const changeHandler = (e) => {
    onChange?.(e.target.value);
  };

  const blurHandler = () => {
    setIsBlurred(true);
  };

  const canShowError = isBlurred && !isValid;

  return (
    <div className={twMerge("w-full", className)}>
      <div className="w-full relative">
        <input
          type="number"
          step="0.01"
          min="0"
          className={`w-full flex items-center gap-[0.8125rem] pl-[1.125rem] py-[0.8rem] border rounded-[0.4375rem] border-solid focus:ring-1 outline-none transition-colors ${
            canShowError
              ? "border-error focus:border-error focus:ring-error"
              : "border-[#D4D4D8] focus:border-[#CDCED9] focus:ring-[#CDCED9]"
          }`}
          placeholder="Enter a number"
          value={value}
          onChange={changeHandler}
          onBlur={blurHandler}
          {...props}
        />
        {Icon && (
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {<Icon className={canShowError ? "text-error" : ""} />}
          </span>
        )}
      </div>
      <AnimatePresence>
        {canShowError && (
          <motion.span
            className="mt-0.5 text-xs inline-block text-error"
            role="alert"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {errorMessage || "Invalid number"}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

NumberInput.propTypes = {
  className: PropTypes.string,
  Icon: PropTypes.func,
  value: PropTypes.string,
  onChange: PropTypes.func,
  isValid: PropTypes.bool,
  errorMessage: PropTypes.string,
};
