import { createSlice } from "@reduxjs/toolkit";
import { User } from "../types/User";

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
export const userSlice = createSlice({
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

export const userActions = userSlice.actions;
