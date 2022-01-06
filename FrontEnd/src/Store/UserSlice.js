import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { user: {}, isAuth: false, loadingUser: true },
  reducers: {
    AddUser(state, action) {
      state.user = action.payload;
      if (state.user.founded_at) state.user.role = "marketer";
      else if (state.user.type) state.user.role = "admin";
      else state.user.role = "surfer";

      state.isAuth = true;
      state.loadingUser = false;
    },
    setAuth(state, action) {
      state.isAuth = action.payload;
    },
    setLoadingUser(state, action) {
      state.loadingUser = action.payload;
    },
    logout(state) {
      state.user = {};
      state.isAuth = false;
      state.loadingUser = false;
    },
  },
});

export default userSlice;
export const UserActions = userSlice.actions;
