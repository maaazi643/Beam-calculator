import React from "react";
import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";
import { useSelector, useDispatch } from "react-redux";
import { beamActions } from "../../../store/beam";
import ControlButton from "../../../components/buttons/ControlButton";
import { Undo, Redo, Clear } from "../../../icons/controls";

export default function ControlBar({ className }) {
  const dispatch = useDispatch();
  const { beamPropertiesUndoStack, beamPropertiesRedoStack } = useSelector(
    (state) => state.beam
  );

  const undoHandler = () => {
    const newBeamPropertiesRedoStack = [...beamPropertiesRedoStack];
    const newBeamPropertiesUndoStack = [...beamPropertiesUndoStack];

    const poppedItem = newBeamPropertiesUndoStack.pop();
    if (poppedItem) {
      newBeamPropertiesRedoStack.push(poppedItem);
      const newBeamProperties = newBeamPropertiesUndoStack?.at(-1);
      const { spans, loadings, supports } = newBeamProperties;
      dispatch(
        beamActions.set([
          { key: "showSpanConfig", value: spans?.length > 0 },
          { key: "spans", value: spans },
          { key: "showLoadingConfig", value: loadings?.length > 0 },
          { key: "loadings", value: loadings },
          { key: "showSupportConfig", value: supports?.length > 0 },
          { key: "supports", value: loadings },
          { key: "beamProperties", value: newBeamProperties },
          { key: "beamPropertiesRedoStack", value: newBeamPropertiesRedoStack },
          { key: "beamPropertiesUndoStack", value: newBeamPropertiesUndoStack },
        ])
      );
    }
  };

  const redoHandler = () => {
    const newBeamPropertiesRedoStack = [...beamPropertiesRedoStack];
    const newBeamPropertiesUndoStack = [...beamPropertiesUndoStack];

    const poppedItem = newBeamPropertiesRedoStack.pop();

    if (poppedItem) {
      newBeamPropertiesUndoStack.push(poppedItem);
      const newBeamProperties = poppedItem;
      const { spans, loadings, supports } = newBeamProperties;

      dispatch(
        beamActions.set([
          { key: "showSpanConfig", value: spans?.length > 0 },
          { key: "spans", value: spans },
          { key: "showLoadingConfig", value: loadings?.length > 0 },
          { key: "loadings", value: loadings },
          { key: "showSupportConfig", value: supports?.length > 0 },
          { key: "supports", value: loadings },
          { key: "beamProperties", value: newBeamProperties },
          { key: "beamPropertiesRedoStack", value: newBeamPropertiesRedoStack },
          { key: "beamPropertiesUndoStack", value: newBeamPropertiesUndoStack },
        ])
      );
    }
  };

  const clearHandler = () => {
    dispatch(beamActions.reset());
  };

  return (
    <div
      className={twMerge(
        "bg-primary shadow-[0px_1px_3px_0px_rgba(0,0,0,0.10)] py-8 px-4 flex items-center justify-center gap-8",
        className
      )}
    >
      <ControlButton onClick={undoHandler}>
        <Undo />
        <span>Undo</span>
      </ControlButton>
      <ControlButton onClick={redoHandler}>
        <Redo />
        <span>Redo</span>
      </ControlButton>
      <ControlButton onClick={clearHandler}>
        <Clear />
        <span>Clear</span>
      </ControlButton>
    </div>
  );
}

ControlBar.propTypes = {
  className: PropTypes.string,
};
