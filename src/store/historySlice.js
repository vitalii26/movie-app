import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movieList: [],
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    initHistory: (state, action) => {
      state.movieList = action.payload || [];
    },
    checkAddToHistory: (state) => {
      return state;
    },
    addToHistory: (state, action) => {
      state.movieList = [action.payload, ...state.movieList];
    },
  },
});

export const { initHistory, checkAddToHistory, addToHistory } =
  historySlice.actions;
export default historySlice.reducer;
