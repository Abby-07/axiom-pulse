import { configureStore } from "@reduxjs/toolkit";
import pulseReducer from "./pulseSlice";

export const store = configureStore({
  reducer: {
    pulse: pulseReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;