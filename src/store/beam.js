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
  beamPropertiesUndoStack: [],
  beamPropertiesRedoStack: [],
  beamProperties: {
    spans: [],
    supports: [],
    loadings: [],
  },
  // beamProperties: {
  //   spans: [
  //     {
  //       id: "840b36f7-a9da-4b4f-a10e-81b78e036d3a",

  //       length: "4",

  //       flexuralRigidity: "2",
  //     },

  //     {
  //       id: "061ca704-fbc3-432b-9b88-52f3c4b87966",

  //       length: "3",

  //       flexuralRigidity: "1.5",
  //     },

  //     {
  //       id: "78e582cb-b303-4300-9e4b-a29791a2c916",

  //       length: "5",

  //       flexuralRigidity: "2.01",
  //     },
  //   ],

  //   supports: [
  //     {
  //       id: "5db9cbdf-d05e-4aa5-bb37-8166ddef3a8f",

  //       type: "fixed",

  //       sinking: false,

  //       sinkingValue: "",

  //       distanceFromLeft: "0",
  //     },

  //     {
  //       id: "312c8a57-f834-4734-841a-b32143cb68ae",

  //       type: "pinned",

  //       sinking: false,

  //       sinkingValue: "",

  //       distanceFromLeft: "4",
  //     },

  //     {
  //       id: "e19ac78b-7563-4784-afe9-aac71d0eb082",

  //       type: "pinned",

  //       sinking: false,

  //       sinkingValue: "",

  //       distanceFromLeft: "7",
  //     },

  //     {
  //       id: "bc029858-6e3f-4c01-90be-1d57be11648b",

  //       type: "pinned",

  //       sinking: false,

  //       sinkingValue: "",

  //       distanceFromLeft: "12",
  //     },
  //   ],

  //   loadings: [
  //     {
  //       id: "18fcd1de-374b-41c3-9653-2307c31919a5",

  //       type: "single",

  //       distanceFromLeft: "2",

  //       valueOfLoading: "24",

  //       spanOfLoading: "",

  //       openingValue: "",

  //       closingValue: "",
  //     },

  //     {
  //       id: "fd4e96c0-4a9e-48a7-8199-6682140387f1",

  //       type: "uniform",

  //       distanceFromLeft: "4",

  //       valueOfLoading: "12",

  //       spanOfLoading: "3",

  //       openingValue: "",

  //       closingValue: "",
  //     },

  //     {
  //       id: "042c1bf5-b2b2-487d-bc5d-c70dee4456f3",

  //       type: "single",

  //       distanceFromLeft: "10",

  //       valueOfLoading: "25",

  //       spanOfLoading: "",

  //       openingValue: "",

  //       closingValue: "",
  //     },
  //   ],
  // },
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
