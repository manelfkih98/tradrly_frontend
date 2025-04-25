// dashboardSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dashboardData: null,
  postByOffreStage: null,
  postByOffreJob: null,
  loading: false,
  error: null,
};

const dashboardSlice = createSlice({  
  name: 'dashboard',
  initialState,
  reducers: {
    setDashboardData: (state, action) => {
      state.dashboardData = action.payload;
      state.loading = false;
      state.error = null;
    },
    setPostByOffreStage: (state, action) => {
      state.postByOffreStage = action.payload; 
      state.loading = false;
      state.error = null;
    },
    setPostByOffreJob: (state, action) => {
      state.postByOffreJob = action.payload; 
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
  },
});

export const { setDashboardData, setLoading, setError,setPostByOffreJob,setPostByOffreStage} = dashboardSlice.actions;
export default dashboardSlice.reducer;
