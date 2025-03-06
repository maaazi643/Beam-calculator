import { createSlice } from "@reduxjs/toolkit";
import {
  question1,
  question2,
  question3,
  question4,
  question5,
  question8,
  question9,
  question10,
  question11,
  question12,
  question13,
  questionErr1,
} from "../../questions";
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
    distanceFromTop: "",
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
    distanceFromLeft: "",
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
  // left column config
  showLeftSpanConfig: true,
  leftColumn: defaultColumn,
  // right column config
  showRightSpanConfig: false,
  rightColumn: defaultColumn,
  // beam config
  showBeamConfig: false,
  beam: defaultBeam,
  // activeSupportType: null,
  framePropertiesUndoStack: [],
  framePropertiesRedoStack: [],
  frameProperties: defaultFrameProperties,
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
      } else {
        const { key, value } = payload;
        state[key] = value;
      }
    },
  },
});

export const isBeamEmpty = (beam) => {
  return beam?.spans?.length === 0;
};

export const frameActions = frameSlice.actions;

export default frameSlice.reducer;
