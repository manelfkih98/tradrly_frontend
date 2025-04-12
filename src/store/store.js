import { configureStore } from "@reduxjs/toolkit";
import departmentsReducer from "./slices/departmentsSlice"; 
import projectsreducer from "./slices/projectsSlice";
import offresreducer from "./slices/offreSlice";
import questionreducer from "./slices/questionSlice"
import postsSlice from "./slices/postsSlice"
import QcmSlice from "./slices/QcmSlice"
import testsSlice from "./slices/testSlice"
import teamsSlice from "./slices/teamSlice"
const store = configureStore({
  reducer: {
    departments: departmentsReducer,
    projects:projectsreducer,
    offres:offresreducer,
    questions:questionreducer,
    posts:postsSlice,
    Qcms:QcmSlice,
    tests:testsSlice,
    teams:teamsSlice,
    
   
  },
});

export default store;
