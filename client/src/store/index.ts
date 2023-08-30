import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { userSlice } from "../slices/userSlice";
import { userAuthSlice } from "../slices/userAuthSlice";

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

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
