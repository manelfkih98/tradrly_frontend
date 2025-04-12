import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tests: [],
    loading: false,
    error: null,
};

const testsSlice = createSlice({
    name: "tests",
    initialState,
    reducers: {
        setTests: (state, action) => {
            state.tests = action.payload
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

export const { setError, setLoading, setTests } = testsSlice.actions;
export default testsSlice.reducer;
