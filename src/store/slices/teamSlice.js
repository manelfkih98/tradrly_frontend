import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  teams: [],
  loading: false,
  error: null,
};
 const teamSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {
    setTeams: (state, action) => {
      state.teams = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  }
});
export const { setTeams, setLoading, setError } = teamSlice.actions;
export default teamSlice.reducer;
