import { configureStore } from "@reduxjs/toolkit";
import employeeTableReducer from "./features/employeeTableSlice";
import counterReducder from "./features/counterSlice";
import todoReducer from "./features/todoSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducder,
    todo: todoReducer,
    employees: employeeTableReducer,
  },
});
