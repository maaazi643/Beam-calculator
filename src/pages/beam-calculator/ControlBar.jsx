import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";
import { useSelector, useDispatch } from "react-redux";
import { beamActions } from "../../store/beam";
import ControlButton from "../../components/buttons/ControlButton";
import { Undo, Redo, Clear } from "../../icons/controls";
import Trash from "../../icons/Trash";

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
          { key: "supports", value: supports },
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
          { key: "supports", value: supports },
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
        "bg-[#7B3F00] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.10)] py-5 px-4 flex items-center justify-center gap-8 mt-10 rounded-[10px]",
        className
      )}
    >
      <ControlButton onClick={undoHandler}>
        <Undo />
        <span className="text-white">Move a step back</span>
      </ControlButton>
      <ControlButton onClick={redoHandler}>
        <Redo />
        <span className="text-white">Try Again</span>
      </ControlButton>
      <ControlButton onClick={clearHandler}>
        <Trash />
        <span className="text-white">Delete</span>
      </ControlButton>
    </div>
  );
}

ControlBar.propTypes = {
  className: PropTypes.string,
};
