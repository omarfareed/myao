import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { user: {}, isAuth: false, loadingUser: true },
  reducers: {
    AddUser(state, action) {
      state.user = action.payload;
      state.isAuth = true;
      state.loadingUser = false;
    },
    setAuth(state, action) {
      state.isAuth = action.payload;
    },
    setLoadingUser(state, action) {
      state.loadingUser = action.payload;
    },
  },
});

export default userSlice;
export const UserActions = userSlice.actions;
