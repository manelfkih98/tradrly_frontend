

import api from "../../config/api";
import PATHS from "../../path/apiPath";
import { setDashboardData, setPostByOffreJob,setPostByOffreStage, setLoading, setError } from "../slices/dashboardSlice";

export const fetchDashboardData = () => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await api.get(PATHS.DASHBOARD.GET_DASHBOARD);
    dispatch(setDashboardData(response.data));
  } catch (error) {
    dispatch(setError(error.message));
  }
}

export const fetchPostByOffreStage = () => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await api.get(PATHS.DASHBOARD.GET_POST_OFFRE);
    dispatch(setPostByOffreStage(response.data));
  
  } catch (error) {
    dispatch(setError(error.message));
  }
}
export const fetchPostByOffreJob = () => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await api.get(PATHS.DASHBOARD.GET_POST_JOB);
    dispatch(setPostByOffreJob(response.data));
  
  } catch (error) {
    dispatch(setError(error.message));
  }
}
