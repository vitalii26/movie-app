import {
  loadStateFromStorage,
  saveStateToStorage,
} from "../../utils/storageHelper";
import { initApp } from "../initAppSlice";
import { signUp, initUsers, signIn } from "../registrationSlice";
import { initFavourites, toggleFavourite } from "../favouritesSlice";
import { initHistory, addToHistory } from "../historySlice";

export const localStorageMiddleware = (store) => (next) => (action) => {
  const { getState, dispatch } = store;

  next(action);

  if (initApp.match(action)) {
    const users = loadStateFromStorage("users");
    dispatch(initUsers(users));
  }

  if (signIn.match(action)) {
    const currentUserLogin = getState().registration.currentUser.login;

    const favourites = loadStateFromStorage("favourites");
    const currentUserFavourites = favourites?.[currentUserLogin];
    dispatch(initFavourites(currentUserFavourites));

    const history = loadStateFromStorage("history");
    const currentUserHistory = history?.[currentUserLogin];
    dispatch(initHistory(currentUserHistory));
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

  if (addToHistory.match(action)) {
    const storageHistory = loadStateFromStorage("history");
    const currentUserHistory = getState().history.movieList;
    const currentUserLogin = getState().registration.currentUser.login;

    if (currentUserLogin) {
      const newStorageHistory = {
        ...storageHistory,
        [currentUserLogin]: currentUserHistory,
      };
      saveStateToStorage("history", newStorageHistory);
    }
  }
};
