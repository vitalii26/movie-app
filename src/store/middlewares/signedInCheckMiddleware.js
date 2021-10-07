import { toggleFavourite } from "../favouritesSlice";
import history from "../../utils/history";

export const signedInCheckMiddleware = (store) => (next) => (action) => {
  next(action);
  const { getState } = store;
  const signedInRequiredActions = [toggleFavourite.type];

  const isSignedNow = getState().registration.signedIn;

  if (!isSignedNow && signedInRequiredActions.includes(action.type)) {
    next(action);
    history.push("/signin");
  }
};
