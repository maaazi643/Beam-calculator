import React from "react";
import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";

export default function RoundedPlus({ className, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={twMerge(
        "group-hover:fill-primary fill-secondary transition-colors duration-200 ease-in-out",
        className
      )}
      {...props}
    >
      <path
        d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM17 13H13V17H11V13H7V11H11V7H13V11H17V13Z"
      />
    </svg>
  );
}

RoundedPlus.propTypes = {
  className: PropTypes.string,
};
