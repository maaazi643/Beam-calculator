import { createSlice } from "@reduxjs/toolkit";
import { createNewSpan } from "./beam-utils";

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
