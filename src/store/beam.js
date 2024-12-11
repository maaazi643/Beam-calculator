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
    spans: [
      {
        id: "91ecf04a-8fee-41ef-813e-981bfcddbe67",

        length: "13",

        flexuralRigidity: "1",
      },
    ],

    supports: [
      // {
      //   id: "c9077aec-184d-4468-8fa2-836630a00615",

      //   type: "fixed",

      //   sinking: false,

      //   sinkingValue: "",

      //   distanceFromLeft: "0",
      // },

      // {
      //   id: "ee67e63e-ba4a-46cd-92db-7a2fef94c304",

      //   type: "pinned",

      //   sinking: false,

      //   sinkingValue: "",

      //   distanceFromLeft: "0",
      // },
      {
        id: "ee67e63e-ba4a-46cd-92db-7a2fef94c304",

        type: "pinned",

        sinking: false,

        sinkingValue: "",

        distanceFromLeft: "0",
      },

      // {
      //   id: "fdf58ec7-f9b8-4c90-a84c-e4c8fa890057",

      //   type: "roller",

      //   sinking: false,

      //   sinkingValue: "",

      //   distanceFromLeft: "13",
      // },

      {
        id: "fed7e991-9085-4ee7-a3dc-f8853f6e94b2",

        type: "fixed",

        sinking: false,

        sinkingValue: "",

        distanceFromLeft: "13",
      },
    ],

    loadings: [
      {
        id: "a42a41f5-5ea5-4f07-9421-91291469c1e6",

        type: "single",

        distanceFromLeft: "2",

        valueOfLoading: "5",

        spanOfLoading: "",

        openingValue: "",

        closingValue: "",
      },

      {
        id: "d47b0c93-d63f-4255-b8c9-189316f1c7ff",

        type: "uniform",

        distanceFromLeft: "4",

        valueOfLoading: "6",

        spanOfLoading: "2",

        openingValue: "",

        closingValue: "",
      },

      {
        id: "ce05c2f8-a9ba-4ccd-b1db-d06a51b46ea8",

        type: "varying",

        distanceFromLeft: "10",

        valueOfLoading: "",

        spanOfLoading: "2",

        openingValue: "5",

        closingValue: "4",
      },
    ],
  },
  // beamProperties: {
  //   spans: [],
  //   supports: [],
  //   loadings: [],
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
