import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showSidebarOnMobile: false,
};

export const uiSlice = createSlice({
  name: "ui",
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

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
