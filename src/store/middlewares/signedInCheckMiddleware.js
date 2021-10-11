import { toggleFavourite } from "../favouritesSlice";
import { checkAddToHistory, addToHistory } from "../historySlice";
import history from "../../utils/history";

export const signedInCheckMiddleware = (store) => (next) => (action) => {
  next(action);
  const { getState, dispatch } = store;
  const signedInRequiredActions = [toggleFavourite.type];

  const isSignedNow = getState().registration.signedIn;

  if (!isSignedNow && signedInRequiredActions.includes(action.type)) {
    next(action);
    history.push("/signin");
  }

  if (isSignedNow && checkAddToHistory.match(action)) {
    next(action);
    dispatch(addToHistory(action.payload));
  }
};
