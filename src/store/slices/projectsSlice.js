import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: [],
  loading: false,
  error: null,
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setProjects: (state, action) => {
      state.projects = action.payload;
      state.loading = false;
      state.error = null;
    },
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
    addProject: (state, action) => {
      state.projects.push(action.payload);
    },
  },
});

export const { setProjects, setDepartments, setLoading, setError, addProject } = projectsSlice.actions;
export default projectsSlice.reducer;
