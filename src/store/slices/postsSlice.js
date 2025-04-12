import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  demandes:[],
  loading: false,
  error:null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
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
    setDemandes:(state,action)=>{
      state.demandes = action.payload;
      state.loading = false;
      state.error = null;
  
    }
      
  },
});
export const { setError, setLoading, setPosts,setDemandes } = postsSlice.actions;
export default postsSlice.reducer;
