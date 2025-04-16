import api from "../../config/api";
import {
  setProjects,
  setDepartments,
  setLoading,
  setError,
} from "../slices/projectsSlice";
export const fetchSolutions = () => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await api.get("project/allProject");
    dispatch(setProjects(response.data.projects));
    dispatch(setDepartments(response.data.dep));
  } catch (error) {
    dispatch(setError(error.message));
  }
};
export const deleteSolutions = (id) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await api.delete(`project/deleteProject/${id}`);
    await dispatch(fetchSolutions());
  } catch (error) {
    dispatch(setError(error.message));
  }
};
export const createSolution = (project) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await api.post("project/addProject", project
, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
    );
    dispatch(fetchSolutions());
  } catch (error) {
    dispatch(setError(error.message));
  }
}
export const updateSolution = (id, project) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await api.put(`project/updateProject/${id}`, project);
    dispatch(fetchSolutions());
  } catch (error) {
    dispatch(setError(error.message));
  } 
}
