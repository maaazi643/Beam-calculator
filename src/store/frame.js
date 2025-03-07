import { createSlice, current } from "@reduxjs/toolkit";
import { question1 , question2} from "../../frame-question";
import { supportEnums, loadingEnums } from "./beam-utils";

const defaultColumn = {
  length: "",
  flexuralRigidity: "0",
  support: {
    type: supportEnums.fixed,
    sinking: false,
    sinkingValue: "",
  },
  loading: {
    type: loadingEnums.none,
    distanceFromTop: "0",
    valueOfLoading: "",
    spanOfLoading: "",
    openingValue: "",
    closingValue: "",
  },
};

const defaultBeam = {
  length: "",
  flexuralRigidity: "0",
  loading: {
    type: loadingEnums.single,
    distanceFromLeft: "0",
    valueOfLoading: "",
    spanOfLoading: "",
    openingValue: "",
    closingValue: "",
  },
};

const defaultFrameProperties = {
  leftColumn: defaultColumn,
  beam: defaultBeam,
  rightColumn: defaultColumn,
};

const initialState = {
  // beam config
  showBeamConfig: true,
  beam: defaultBeam,
  // left column config
  showLeftSpanConfig: false,
  leftColumn: defaultColumn,
  // right column config
  showRightSpanConfig: false,
  rightColumn: defaultColumn,
  // activeSupportType: null,
  framePropertiesUndoStack: [],
  framePropertiesRedoStack: [],
  frameProperties: defaultFrameProperties,
  // frameProperties: question1,
  // frameProperties: question2,
  solutionAnalysis: {},
  solutionAnalysisErrorMessage: null,
  solutionIsLoading: false,
};

export const frameSlice = createSlice({
  name: "frame",
  initialState,
  reducers: {
    reset: () => {
      const newInitialState = { ...initialState };
      newInitialState.spans = [];
      return newInitialState;
    },
    set: (state, { payload }) => {
      if (Array.isArray(payload)) {
        payload.forEach(({ key, value }) => {
          state[key] = value;
        });

        const t = current(state);
        console.log(t);
      } else {
        const { key, value } = payload;
        state[key] = value;
      }
    },
  },
});

export const isFrameEmpty = (frame) => {
  const {beam, leftColumn, rightColumn} = frame
  console.log(beam, leftColumn, rightColumn)
  return +beam.length == '0'
  // return +beam.length == '0' && +leftColumn.length == '0' && +rightColumn.length == '0'
};

export const frameActions = frameSlice.actions;

export default frameSlice.reducer;
