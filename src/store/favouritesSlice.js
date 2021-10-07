import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movieList: {},
};

const favouritesSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    initFavourites(state, action) {
      state.movieList = action.payload || {};
    },
    toggleFavourite(state, action) {
      const { id, movie } = action.payload;

      if (!state.movieList?.[id]) {
        state.movieList[id] = movie;
      } else {
        delete state.movieList[id];
      }
    },
  },
});

export const { initFavourites, toggleFavourite } = favouritesSlice.actions;
export default favouritesSlice.reducer;
