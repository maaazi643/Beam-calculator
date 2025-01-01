import { configureStore } from "@reduxjs/toolkit";
import beamReducer from "./beam";
import uiReducer from "./ui";

export const store = configureStore({
  reducer: {
    beam: beamReducer,
    ui: uiReducer,
  },
});
