import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "redux";
import userSlice from "@redux/userSlice";
import loginSlice from "@redux/loginSlice";
import userListSlice from "@redux/userListSlice";
import archaeologicalDataSlice from "@redux/archaeologicalDataSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducer = combineReducers({
  userInfo: userSlice,
  loginStatus: loginSlice,
  allUserList: userListSlice,
  archaeologicalDataList: archaeologicalDataSlice,
});

const persistedReducer = persistReducer(persistConfig, reducer);
const store = configureStore({
  reducer: persistedReducer,
});

export default store;
