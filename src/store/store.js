import { configureStore } from "@reduxjs/toolkit";
import beamReducer from "./beam";

export const store = configureStore({
  reducer: {
    beam: beamReducer,
  },
});
