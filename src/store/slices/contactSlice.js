import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  contacts: [],
  loading: false,
  error: null,
};
const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setContacts: (state, action) => {
      state.contacts = action.payload;
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
export const {setContacts, setLoading, setError} = contactSlice.actions;
export default contactSlice.reducer;