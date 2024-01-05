import { configureStore } from "@reduxjs/toolkit";
import counterReducder from "./features/counterSlice";
import todoReducer from "./features/todoSlice";
import usersDataReducer from "./features/usersDataSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducder,
    todo: todoReducer,
    userData: usersDataReducer,
  },
});
