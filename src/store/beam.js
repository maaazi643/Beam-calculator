import { createSlice } from "@reduxjs/toolkit";
import { createNewSpan } from "./beam-utils";
import {
  question1,
  question2,
  question3,
  question4,
  question5,
} from "../../questions";

const initialState = {
  // spans config
  showSpanConfig: true,
  spans: [createNewSpan()],
  // loadings config
  showLoadingConfig: false,
  loadings: [],
  showSupportConfig: false,
  supports: [],
  activeSupportType: null,
  beamPropertiesUndoStack: [],
  beamPropertiesRedoStack: [],
  beamProperties: question3,
  // beamProperties: {
  //   spans: [],
  //   supports: [],
  //   loadings: [],
  // },
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

export const beamActions = beamSlice.actions;

export default beamSlice.reducer;
