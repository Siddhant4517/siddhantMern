import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "../src/features/employeeSlice";

const store = configureStore({
  reducer: {
    employees: employeeReducer,
  },
});

export default store;
