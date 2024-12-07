import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";

const PropertyWrapper = forwardRef(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={twMerge(
        "shadow-[0px_1px_3px_0px_rgba(0,0,0,0.10)] p-6 rounded-lg bg-tertiary",
        className
      )}
    >
      {children}
    </div>
  );
});

PropertyWrapper.displayName = "PropertyWrapper";

PropertyWrapper.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default PropertyWrapper;
