import {
  loadStateFromStorage,
  saveStateToStorage,
} from "../../utils/storageHelper";
import { initApp } from "../initAppSlice";
import { signUp, initUsers, signIn } from "../registrationSlice";
import { initFavourites, toggleFavourite } from "../favouritesSlice";

export const localStorageMiddleware = (store) => (next) => (action) => {
  const { getState, dispatch } = store;

  next(action);

  if (initApp.match(action)) {
    const users = loadStateFromStorage("users");
    dispatch(initUsers(users));
  }

  if (signIn.match(action)) {
    const favourites = loadStateFromStorage("favourites");
    const currentUserLogin = getState().registration.currentUser.login;
    const currentUserFavourites = favourites?.[currentUserLogin];
    dispatch(initFavourites(currentUserFavourites));
  }

  if (signUp.match(action)) {
    const users = getState().registration.users;
    saveStateToStorage("users", users);
  }

  if (toggleFavourite.match(action)) {
    const storageFavourites = loadStateFromStorage("favourites");
    const currentUserFavouriteMovies = getState().favourites.movieList;
    const currentUserLogin = getState().registration.currentUser.login;

    if (currentUserLogin) {
      const newStorageFavourites = {
        ...storageFavourites,
        [currentUserLogin]: currentUserFavouriteMovies,
      };
      saveStateToStorage("favourites", newStorageFavourites);
    }
  }
};
