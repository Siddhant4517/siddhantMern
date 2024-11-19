import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axios"; // Ensure this is configured to point to your backend API

// Thunks for API calls
export const fetchEmployees = createAsyncThunk(
  "employees/fetchEmployees",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/employees");
      return response.data; // Array of employees
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addEmployee = createAsyncThunk(
  "employees/addEmployee",
  async (employee, { rejectWithValue }) => {
    try {
      const response = await api.post("/employees", employee);
      return response.data; // Newly created employee
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateEmployee = createAsyncThunk(
  "employees/updateEmployee",
  async ({ id, employee }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/employees/${id}`, employee);
      return response.data; // Updated employee
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const incrementSalary = createAsyncThunk(
  "employees/incrementSalary",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/employees/${id}/addSalary/5000`);
      return response.data; // Employee with updated salary
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteEmployee = createAsyncThunk(
  "employees/deleteEmployee",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/employees/${id}`);
      return id; // Return the deleted employee's ID
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Slice
const employeeSlice = createSlice({
  name: "employees",
  initialState: {
    list: [], // Employee list
    status: "idle", // Loading status
    error: null, // Error message
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch employees
      .addCase(fetchEmployees.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.list = action.payload; // Populate the list with fetched employees
        state.status = "succeeded";
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // Error message
      })
      // Add new employee
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.list.push(action.payload); // Add the new employee to the list
      })
      .addCase(addEmployee.rejected, (state, action) => {
        state.error = action.payload; // Handle error
      })
      // Update employee
      .addCase(updateEmployee.fulfilled, (state, action) => {
        const index = state.list.findIndex((e) => e._id === action.payload._id);
        if (index !== -1) state.list[index] = action.payload; // Update the employee in the list
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.error = action.payload; // Handle error
      })
      // Increment salary
      .addCase(incrementSalary.fulfilled, (state, action) => {
        const index = state.list.findIndex((e) => e._id === action.payload._id);
        if (index !== -1) state.list[index].salary = action.payload.salary; // Update salary
      })
      .addCase(incrementSalary.rejected, (state, action) => {
        state.error = action.payload; // Handle error
      })
      // Delete employee
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.list = state.list.filter((e) => e._id !== action.payload); // Remove the deleted employee
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.error = action.payload; // Handle error
      });
  },
});

export default employeeSlice.reducer;
