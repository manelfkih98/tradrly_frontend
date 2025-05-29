import { createSlice } from '@reduxjs/toolkit';
import { set } from 'react-hook-form';

const initialState = {
  entretien: [],
    entretienByDay: [],
  loading: false,
  error: null,
};

const entretienSlice = createSlice({
  name: 'entretien',
  initialState,
  reducers: {
    setEntretien: (state, action) => {
      state.entretien = action.payload;
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
    addEntretien: (state, action) => {
      state.entretien.push(action.payload);
    },
    setEntretienByday: (state, action) => {
        state.entretienByDay = action.payload;
        state.loading = false;
        state.error = null;
    },
  },
});

export const { setEntretien, setLoading, setError, addEntretien ,setEntretienByday} = entretienSlice.actions;
export default entretienSlice.reducer;