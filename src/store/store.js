import { configureStore } from "@reduxjs/toolkit";
import { moviesApiSlice } from "./api/moviesApiSlice";
import { localStorageMiddleware } from "./middlewares/localStorageMiddleware";
import { signedInCheckMiddleware } from "./middlewares/signedInCheckMiddleware";
import initAppReducer from "./initAppSlice";
import registrationReducer from "./registrationSlice";
import favouritesReducer from "./favouritesSlice";
import historyReducer from "./historySlice";

export const store = configureStore({
  reducer: {
    init: initAppReducer,
    registration: registrationReducer,
    favourites: favouritesReducer,
    history: historyReducer,
    [moviesApiSlice.reducerPath]: moviesApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(moviesApiSlice.middleware)
      .concat(localStorageMiddleware)
      .concat(signedInCheckMiddleware),
});
