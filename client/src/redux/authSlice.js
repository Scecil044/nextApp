import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isError: false,
  user: null
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginPendingState: state => {
      state.isLoading = true;
      state.isError = false;
    },
    loginFulfilledState: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.user = action.payload;
    },
    loginRejectedState: (state, action) => {
      state.isLoading = false;
      state.isError = true;
    },
    logoutUser: state => {
      state.user = null;
      state.isLoading = false;
      state.isError = false;
    }
  }
});

export const { loginPendingState, loginFulfilledState, loginRejectedState, logoutUser } = authSlice.actions;

export default authSlice.reducer;
