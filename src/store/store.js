import { configureStore } from "@reduxjs/toolkit";
import departmentsReducer from "./slices/departmentsSlice"; 
import projectsreducer from "./slices/projectsSlice";
import offresreducer from "./slices/offreSlice";
import questionreducer from "./slices/questionSlice"
import postsSlice from "./slices/postsSlice"
import QcmSlice from "./slices/QcmSlice"
import testsSlice from "./slices/testSlice"
import teamsSlice from "./slices/teamSlice"
import contactSlice from "./slices/contactSlice";
import dashboardSlice from "./slices/dashboardSlice";
import questionPsysSlice from "./slices/questionPsySlice";
 import entretienSlice from "./slices/entretientSlice"; 
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
    contacts: contactSlice,
    dashboard:dashboardSlice,
    questionsPsy: questionPsysSlice, 
    entretiens: entretienSlice,
    
    
   
  },
});

export default store;
