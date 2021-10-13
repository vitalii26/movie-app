import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import memoize from "lodash.memoize";

const initialState = {
  movieList: [],
};

const favouritesSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    initFavourites(state, action) {
      state.movieList = action.payload || [];
    },
    toggleFavourite(state, action) {
      const id = action.payload;

      if (!state.movieList.includes(id)) {
        state.movieList.push(id);
      } else {
        state.movieList = state.movieList.filter((movie) => movie !== id);
      }
    },
  },
});

export const { initFavourites, toggleFavourite } = favouritesSlice.actions;
export default favouritesSlice.reducer;

export const selectFavouriteMovies = (state) => state.favourites.movieList;
export const selectIsMovieFavourite = createSelector(
  [selectFavouriteMovies],
  (movieList) => memoize((id) => movieList.includes(+id))
);
