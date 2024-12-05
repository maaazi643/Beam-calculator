import React from "react";
import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";

export default function PropertyWrapper({ className, children }) {
  return (
    <div
      className={twMerge(
        "shadow-[0px_1px_3px_0px_rgba(0,0,0,0.10)] p-6 rounded-lg bg-tertiary",
        className
      )}
    >
      {children}
    </div>
  );
}

PropertyWrapper.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};
