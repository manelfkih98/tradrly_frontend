import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts_stage: [],
  posts_job: [],
  demandes: [],
  post_by_conadi: [],
  loading: false,
  error: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPostsJob: (state, action) => {
      state.posts_job = action.payload;
      state.loading = false;
      state.error = null;
    },
    setPostsStage: (state, action) => {
      state.posts_stage = action.payload;
      state.loading = false;
      state.error = null;
    },
    setDemandes: (state, action) => {
      state.demandes = action.payload;
      state.loading = false;
      state.error = null;
    },
    setPostByConadi: (state, action) => {
      state.post_by_conadi = action.payload;
      state.loading = false;
      state.error = null;
    },
    updatePost: (state, action) => {
      const updatedPost = action.payload;
      const index = state.post_by_conadi.findIndex((post) => post._id === updatedPost._id);
      if (index !== -1) {
        state.post_by_conadi[index] = updatedPost;
      } else {
        state.post_by_conadi.push(updatedPost);
      }
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

export const {
  setError,
  setLoading,
  setPostsJob,
  setPostsStage,
  setDemandes,
  setPostByConadi,
  updatePost,
} = postsSlice.actions;

export default postsSlice.reducer;