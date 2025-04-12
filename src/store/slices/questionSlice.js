import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    questions: [],
    loading: false,
    error: null,
};

const questionsSlice = createSlice({
    name: "questions",
    initialState,
    reducers: {
        setQuestions: (state, action) => {
            state.questions = action.payload
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
        addQuestions: (state, action) => {
            state.questions.push(action.payload);
          },
    },
});

export const { setError, setLoading, setQuestions ,addQuestions} = questionsSlice.actions;
export default questionsSlice.reducer;
