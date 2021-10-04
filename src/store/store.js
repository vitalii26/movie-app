import { configureStore } from "@reduxjs/toolkit";
import { moviesApiSlice } from "./api/moviesApiSlice";
import { localStorageMiddleware } from "./middlewares/localStorageMiddleware";
import initAppReducer from "./initAppSlice";
import registrationReducer from "./registrationSlice";

export const store = configureStore({
  reducer: {
    init: initAppReducer,
    registration: registrationReducer,
    [moviesApiSlice.reducerPath]: moviesApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(moviesApiSlice.middleware)
      .concat(localStorageMiddleware),
});
