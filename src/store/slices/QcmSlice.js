import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  QCM: [],
  loading: false,
  error: null,
};

const QcmSlice = createSlice({
  name: "QCMs",
  initialState,
  reducers: {
    setQCM: (state, action) => {
      state.QCM = action.payload;
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
  },
});

export const { setQCM, setLoading, setError } = QcmSlice.actions;

export default QcmSlice.reducer;
