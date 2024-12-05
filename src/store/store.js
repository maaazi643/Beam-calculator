import { configureStore } from "@reduxjs/toolkit";
import calcReducer from "./calc";

export const store = configureStore({
  reducer: {
    calc: calcReducer,
  },
});
