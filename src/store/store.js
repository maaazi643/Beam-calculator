import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./ui";
import beamReducer from "./beam";
import frameReducer from "./frame";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    beam: beamReducer,
    frame: frameReducer,
  },
});
