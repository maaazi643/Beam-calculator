import React from "react";
import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";
import ControlButton from "../../../components/buttons/ControlButton";
import { Undo, Redo, Clear } from "../../../icons/controls";

export default function ControlBar({ className }) {
  return (
    <div
      className={twMerge(
        "bg-primary shadow-[0px_1px_3px_0px_rgba(0,0,0,0.10)] py-8 px-4 flex items-center justify-center gap-8",
        className
      )}
    >
      <ControlButton>
        <Undo />
        <span>Undo</span>
      </ControlButton>
      <ControlButton>
        <Redo />
        <span>Redo</span>
      </ControlButton>
      <ControlButton>
        <Clear />
        <span>Clear</span>
      </ControlButton>
    </div>
  );
}

ControlBar.propTypes = {
  className: PropTypes.string,
};
