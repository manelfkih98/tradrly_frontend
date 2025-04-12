import api from "../../config/api";
import PATHS from "../../path/apiPath";

import { setQCM, setLoading, setError } from "../slices/QcmSlice";

// Récupérer tous les QCM
export const fetchQcm = () => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await api.get(PATHS.QCM.ALL_QCM);
    dispatch(setQCM(response.data));
  } catch (error) {
    dispatch(setError(error.message));
  }
};


export const passerTest = (id) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await api.post(`${PATHS.QCM.PASSER_TEST}/${id}`);
   
    console.log("Test passé :", response.data);
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const getTest = (id) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await api.get(`${PATHS.QCM.TEST}/${id}`);
    console.log("Test récupéré :", response.data);
    
  } catch (error) {
    dispatch(setError(error.message));
  }
};


