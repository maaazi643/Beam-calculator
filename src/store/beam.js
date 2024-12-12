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
  //   spans: [
  //     {
  //       id: "4c3224d7-3f46-43f1-b91a-ec3fce894bb4",

  //       length: "13",

  //       flexuralRigidity: "1",
  //     },
  //   ],

  //   supports: [
  //     {
  //       id: "e1fb7217-fcbe-47f6-a17c-3d44ba53ae14",

  //       type: "fixed",

  //       sinking: false,

  //       sinkingValue: "",

  //       distanceFromLeft: "0",
  //     },

  //     {
  //       id: "da774b6c-219f-4b96-8df8-d5fdaebdbccc",

  //       type: "pinned",

  //       sinking: false,

  //       sinkingValue: "",

  //       distanceFromLeft: "4",
  //     },

  //     {
  //       id: "82657d81-b1ce-4ac5-a2cf-ecf5e7403cfd",

  //       type: "roller",

  //       sinking: false,

  //       sinkingValue: "",

  //       distanceFromLeft: "10",
  //     },

  //     {
  //       id: "01b07b83-0354-42b1-b572-51a3c2ad8b05",

  //       type: "fixed",

  //       sinking: false,

  //       sinkingValue: "",

  //       distanceFromLeft: "13",
  //     },
  //   ],

  //   loadings: [
  //           {
  //       id: "de5e4ab8-4209-4aed-a11c-b4aca1e9bac0",

  //       type: "uniform",

  //       distanceFromLeft: "1",

  //       valueOfLoading: "4",

  //       spanOfLoading: "2",

  //       openingValue: "",

  //       closingValue: "",
  //     },
  //     {
  //       id: "45506a5e-5a56-4868-8d89-152f3327d374",

  //       type: "single",

  //       distanceFromLeft: "4",

  //       valueOfLoading: "5",

  //       spanOfLoading: "",

  //       openingValue: "",

  //       closingValue: "",
  //     },

  //     {
  //       id: "9639ef17-45dc-4a4f-8029-5baddcabfbbc",

  //       type: "varying",

  //       distanceFromLeft: "8",

  //       valueOfLoading: "",

  //       spanOfLoading: "4",

  //       openingValue: "8",

  //       closingValue: "10",
  //     },
  //   ],
  // },
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
