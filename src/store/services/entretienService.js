
import api from "../../config/api";
import PATHS from "../../path/apiPath";
import { setEntretien, setLoading, setError,setEntretienByday } from "../slices/entretientSlice";

// Récupérer tous les entretiens
export const fetchEntretien = () => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await api.get(PATHS.ENTRETIEN.ALL_ENTRETIEN);
    dispatch(setEntretien(response.data));
  } catch (error) {
    dispatch(setError(error.message));
  }
};
// Ajouter un entretien
export const addEntretien = (entretien) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await api.post(PATHS.ENTRETIEN.ADD_ENTRETIEN, entretien);
    dispatch(fetchEntretien());
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const refuserEntretien = (postId) => async (dispatch) => {
    dispatch(setLoading());
    try {
      const response = await api.post(`${PATHS.ENTRETIEN.REFURE_ENTRETIEN}/${postId}`);
      dispatch(fetchEntretien());
    } catch (error) {
      dispatch(setError(error.message));
    }
  };
export const fetchEntretienByDay = (date) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await api.get(`${PATHS.ENTRETIEN.ENTRETIENT_DAYS}`);
    dispatch(setEntretienByday(response.data));
  } catch (error) {
    dispatch(setError(error.message));
  }
}

  