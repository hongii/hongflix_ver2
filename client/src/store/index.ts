import { createSlice, configureStore, combineReducers } from "@reduxjs/toolkit";
import { User } from "../types/User";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export interface userState {
  authenticated: boolean;
  userInfo: User | undefined;
  accessToken: string;
}

const initialUserState: userState = {
  authenticated: false,
  userInfo: undefined,
  accessToken: "",
};

/* 현재 로그인 시도 또는 완료한 유저 정보 */
const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    login: (state, action) => {
      state.authenticated = true;
      state.userInfo = action.payload.userWithoutPassword;
      state.accessToken = action.payload.accessToken;
    },

    logout: (state) => {
      state.authenticated = false;
      state.userInfo = undefined;
      state.accessToken = "";
    },

    refreshAccessTk: (state, action) => {
      state.accessToken = action.payload.accessToken;
    },
  },
});

/* 로컬 스토리지에 저장할 인증 정보 */
const userAuthSlice = createSlice({
  name: "userAuth",
  initialState: { authenticated: false },
  reducers: {
    login: (state) => {
      state.authenticated = true;
    },

    logout: (state) => {
      state.authenticated = false;
    },
  },
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["userAuth"],
};

const reducers = combineReducers({
  user: userSlice.reducer,
  userAuth: userAuthSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const userActions = userSlice.actions;
export const userAuthActions = userAuthSlice.actions;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
