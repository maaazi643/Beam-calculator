import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // spans config
  showSpanConfig: false,
  spans: [],
  // loadings config
  showLoadingsConfig: false,
  activeLoadingType: null,
  singlePointLoadDistanceFromLeft: "",
  singlePointLoadValueOfLoading: "",
  uniformDistributedLoadDistanceFromLeft: "",
  uniformDistributedLoadValueOfLoading: "",
  uniformDistributedLoadSpanOfLoading: "",
  uniformVaryingLoadDistanceFromLeft: "",
  uniformVaryingLoadOpeningValue: "",
  uniformVaryingLoadClosingSpan: "",
  uniformVaryingLoadSpanOfOpening: "",
  // supports config
  showSupportsConfig: false,
  activeSupportType: null,
  pinnedSupportSinking: false,
  pinnedSupportSinkingValue: "",
  pinnedSupportDistanceFromLeft: "",
  rollerSupportSinking: false,
  rollerSupportSinkingValue: "",
  rollerSupportDistanceFromLeft: "",
  fixedSupportSinking: false,
  fixedSupportSinkingValue: "",
  fixedSupportDistanceFromLeft: "",
  activeMember: { type: null, id: null },
  beamPropertiesHistory: [],
  beamProperties: {
    spans: [],
    supports: [],
    loadings: [],
  },
};

export const beamSlice = createSlice({
  name: "beam",
  initialState,
  reducers: {
    reset: () => {
      return initialState;
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
