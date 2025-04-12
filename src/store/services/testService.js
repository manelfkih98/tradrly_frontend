
import api from "../../config/api";
import PATHS from "../../path/apiPath";
import { setTests, setLoading, setError } from "../slices/testSlice";

export const fetchTest = (id) => async (dispatch) => {
  dispatch(setLoading());

  try {
    const response = await api.get(`${PATHS.QCM.TEST}/${id}`);
    console.log("API call:", `${PATHS.QCM.TEST}/${id}`);
    dispatch(setTests(response.data));
  } catch (error) {
    dispatch(setError(error.message));
  }
};
export const updateResultat = (id, resultatQcm) => async (dispatch) => {
    dispatch(setLoading());
    try {
      const response = await api.put(`${PATHS.QCM.UPDATERESULTAT}/${id}`, {
        resultatQcm,
      });
      console.log("Résultat mis à jour :", response.data);
    } catch (error) {
      dispatch(setError(error.message));
    }
  };





  




