import { createSlice } from "@reduxjs/toolkit";
import { createNewSpan } from "./beam-utils";
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
  questionErr1
} from "../../questions";

const defaultBeamProperties = {
  spans: [],
  supports: [],
  loadings: [],
};

const initialState = {
  // spans config
  showSpanConfig: true,
  spans: [],
  // loadings config
  showLoadingConfig: false,
  loadings: [],
  showSupportConfig: false,
  supports: [],
  activeSupportType: null,
  beamPropertiesUndoStack: [],
  beamPropertiesRedoStack: [],
  beamProperties: defaultBeamProperties,
  // beamProperties: question1,
  // beamProperties: questionErr1,
  solutionAnalysis: {},
  solutionAnalysisErrorMessage: null,
  solutionIsLoading: false,
};

export const beamSlice = createSlice({
  name: "beam",
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

export const beamActions = beamSlice.actions;

export default beamSlice.reducer;
