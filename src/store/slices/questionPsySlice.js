import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    questionsPsy: [],
    loading: false,
    error: null,
};

const questionPsysSlice = createSlice({
    name: "questionsPsy",
    initialState,
    reducers: {
        setQuestionsPsy: (state, action) => {
            state.questionsPsy = action.payload
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

export const { setError, setLoading, setQuestionsPsy } = questionPsysSlice.actions;
export default questionPsysSlice.reducer;
