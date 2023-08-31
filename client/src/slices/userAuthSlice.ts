import { createSlice } from "@reduxjs/toolkit";

/* 로컬 스토리지에 저장할 인증 정보 */
export const userAuthSlice = createSlice({
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

export const userAuthActions = userAuthSlice.actions;
export default userAuthSlice.reducer;
