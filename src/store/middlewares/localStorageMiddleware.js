import {
  loadStateFromStorage,
  saveStateToStorage,
} from "../../utils/storageHelper";
import { initApp } from "../initAppSlice";
import { signUp, initUsers } from "../registrationSlice";

export const localStorageMiddleware = (store) => (next) => (action) => {
  const { getState, dispatch } = store;

  next(action);

  if (initApp.match(action)) {
    const users = loadStateFromStorage("users");
    dispatch(initUsers(users));
  }

  if (signUp.match(action)) {
    const users = getState().registration.users;
    saveStateToStorage("users", users);
  }
};
