import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/authSlice";
import activateSlice from "../features/activateSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    activate: activateSlice,
  },
  devTools: true,
});
