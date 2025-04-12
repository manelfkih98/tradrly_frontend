import api from "../../config/api";
import PATHS from "../../path/apiPath";
import { setLoading, setError, setTeams } from "../slices/teamSlice";
export const fetchTeam = () => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await api.get(`${PATHS.TEAM.ALL_TEAM}`);
    console.log("API call:", `${PATHS.TEAM.ALL_TEAM}`);
    dispatch(setTeams(response.data.teamMembers));
  } catch (error) {
    dispatch(setError(error.message));
  }
};
export const addTeam = (data) => async (dispatch) => {
  dispatch(setLoading());
    console.log("data", data);
  try {
    const response = await api.post(`${PATHS.TEAM.ADD_TEAM}`, data);
    
    dispatch(fetchTeam());
  } catch (error) {
    dispatch(setError(error.message));
  }
};
export const deleteTeam = (id) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await api.delete(`${PATHS.TEAM.DELETE_TEAM}/${id}`);
    dispatch(fetchTeam());
  } catch (error) {
    dispatch(setError(error.message));
  }
};
export const updateTeam = (id, data) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await api.post(`${PATHS.TEAM.UPDATE_TEAM}/${id}`, data);
    dispatch(fetchTeam());
  } catch (error) {
    dispatch(setError(error.message));
  }
};