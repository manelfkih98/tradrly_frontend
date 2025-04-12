import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    offres: [],
    loading: false,     
    error: null,
  };
  
  const offreSlice = createSlice({
    name: "offres",
    initialState,
    reducers: {
      setOffres: (state, action) => {
        state.offres = action.payload;
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
      addOffre: (state, action) => {
        state.offres.push(action.payload);
      },
    },
  });
  
  export const { setOffres, setLoading, setError } = offreSlice.actions;
  
  export default offreSlice.reducer;