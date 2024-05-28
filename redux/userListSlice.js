import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userList: [],
  isLoading: false,
  error: "",
};

const userListSlice = createSlice({
  name: "userList",
  initialState,
  reducers: {
    userAdd: (state, { payload }) => {
      state.isLoading = false;
      state.userList = [payload, ...state.userList];
      state.error = "";
    },
    userFail: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    userListClear: (state) => {
      state.isLoading = false;
      state.error = "";
      state.userList = [];
    },
  },
});

export const { userAdd, userFail, userListClear } = userListSlice.actions;

export default userListSlice.reducer;
