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
export const addTeam = (formData) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }

    const response = await api.post(`${PATHS.TEAM.ADD_TEAM}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

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
  try {
    const res = await api.put(`${PATHS.TEAM.UPDATE_TEAM}/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    dispatch({ type: "UPDATE_TEAM_SUCCESS", payload: res.data.data });
  } catch (error) {
    console.error("Erreur updateTeam :", error);
    // gère les erreurs avec un dispatch ou une notification si besoin
  }
};
export const fetchTeamById = (id) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await api.get(`${PATHS.TEAM.ALL_TEAM}/${id}`);
    dispatch(setTeams(response.data.teamMembers));
  } catch (error) {
    dispatch(setError(error.message));
  }
};
