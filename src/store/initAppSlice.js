import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  init: false,
};

const initAppSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    initApp(state) {
      state.init = true;
    },
  },
});

export const { initApp } = initAppSlice.actions;

export default initAppSlice.reducer;
