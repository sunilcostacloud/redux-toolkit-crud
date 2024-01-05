import { configureStore } from "@reduxjs/toolkit";
import counterReducder from "./features/counterSlice";
import todoReducer from "./features/todoSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducder,
    todo: todoReducer,
  },
});
