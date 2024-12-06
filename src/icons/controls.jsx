import React from "react";
import PropTypes from "prop-types";

export const Undo = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M12.265 8.5C9.61501 8.5 7.21501 9.49 5.36501 11.1L1.76501 7.5V16.5H10.765L7.14501 12.88C8.53501 11.72 10.305 11 12.265 11C15.805 11 18.815 13.31 19.865 16.5L22.235 15.72C20.845 11.53 16.915 8.5 12.265 8.5Z"
        fill="#7B7B7B"
      />
    </svg>
  );
}

Undo.propTypes = {
  className: PropTypes.string,
};

export const Redo = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M18.63 11.1C16.78 9.49 14.38 8.5 11.73 8.5C7.08002 8.5 3.15002 11.53 1.77002 15.72L4.13002 16.5C5.18002 13.31 8.18002 11 11.73 11C13.68 11 15.46 11.72 16.85 12.88L13.23 16.5H22.23V7.5L18.63 11.1Z"
        fill="#7B7B7B"
      />
    </svg>
  );
}

Redo.propTypes = {
  className: PropTypes.string,
};


export const Clear = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
        fill="#7B7B7B"
      />
    </svg>
  );
}

Clear.propTypes = {
  className: PropTypes.string,
};