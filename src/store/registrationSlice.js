import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signedIn: false,
  users: {},
  currentUser: {},
};

const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    initUsers(state, action) {
      state.users = { ...action.payload };
    },
    signIn(state, action) {
      const { login, password } = action.payload;

      if (state.users[login] && state.users[login].password === password) {
        state.signedIn = true;
        state.currentUser = state.users[login];
      }
    },
    signOut(state) {
      state.signedIn = false;
      state.currentUser = {};
    },
    signUp(state, action) {
      const { login } = action.payload;

      if (!state.users[login]) {
        state.users[login] = action.payload;
      }
    },
  },
});

export const { initUsers, signIn, signOut, signUp } = registrationSlice.actions;
export default registrationSlice.reducer;

export const signedInSelector = (state) => state.registration.signedIn;
