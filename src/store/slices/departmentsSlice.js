import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  departments: [],
  loading: false,
  error: null,
};

const departmentsSlice = createSlice({
  name: "departments",
  initialState,
  reducers: {
    setDepartments: (state, action) => {
      state.departments = action.payload;
      state.loading = false;
      state.error = null;
    },

    setLoading: (state) => {
      state.loading = true;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    addDepartment: (state, action) => {
      state.departments.push(action.payload);  
    },
  },
});

export const { setDepartments, setLoading, setError, addDepartment } = departmentsSlice.actions;
export default departmentsSlice.reducer;
