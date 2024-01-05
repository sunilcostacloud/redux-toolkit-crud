import { configureStore } from "@reduxjs/toolkit";
import counterReducder from "./features/counterSlice";
import todoReducer from "./features/todoSlice";
import usersDataReducer from "./features/usersDataSlice";
import { usersApi } from "./api/usersApiSlice";
import employeeTableReducer from "./features/employeeTableSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducder,
    todo: todoReducer,
    userData: usersDataReducer,
    [usersApi.reducerPath]: usersApi.reducer,
    employees: employeeTableReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersApi.middleware),
  devTools: true,
});
