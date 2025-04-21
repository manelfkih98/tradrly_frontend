// src/services/offreService.js
import api from "../../config/api";
import PATHS from "../../path/apiPath";

import { setOffres, setLoading, setError,setOffreJobActive,setOffreStageActive } from "../slices/offreSlice";

export const fetchOffresStage = () => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await api.get(PATHS.OFFRE.ALL_STAGE);
    dispatch(setOffres(response.data));
  } catch (error) {
    dispatch(setError(error.message));
  }
};
export const fetchOffresStageActive = () => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await api.get(PATHS.OFFRE.OFFRE_STAGE_ACTIVE);
    dispatch(setOffreStageActive(response.data));
  } catch (error) {
    dispatch(setError(error.message));
  }
};
export const fetchOffresEmploiActive = () => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await api.get(PATHS.OFFRE.OFFRE_JOB_ACTIVE);
    dispatch(setOffreJobActive(response.data));
  } catch (error) {
    dispatch(setError(error.message));
  }
};
export const fetchOffresEmploi = () => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await api.get(PATHS.OFFRE.ALL_JOB);
    dispatch(setOffres(response.data));
  } catch (error) {
    dispatch(setError(error.message));
  }
};
export const createOffreStage = (offre) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await api.post(PATHS.OFFRE.ADD_STAGE, offre);
    dispatch(fetchOffresStage());
  } catch (error) {
    dispatch(setError(error.message));
  }
};
export const createOffreJob = (offre) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await api.post(PATHS.OFFRE.ADD_JOB, offre);
    dispatch(fetchOffresEmploi());
  } catch (error) {
    dispatch(setError(error.message));
  }
};
export const updateOffreStage = (id, offre) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await api.put(`${PATHS.OFFRE.UPDATE_OFFRE_STAGE}/${id}`, offre);
    dispatch(fetchOffresStage());
  } catch (error) {
    dispatch(setError(error.message));
  }
};
export const updateOffreEmploi = (id, offre) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await api.put(`${PATHS.OFFRE.UPDATE_OFFRE_STAGE}/${id}`, offre);
    dispatch(fetchOffresEmploi());
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const deactivateOffreStage = (id) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await api.put(`${PATHS.OFFRE.DEACTIVE_OFFRE}/${id}`);
    dispatch(fetchOffresStage());
  } catch (error) {
    dispatch(setError(error.message));
  }
};
export const deactivateOffreEmploi = (id) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await api.put(`${PATHS.OFFRE.DEACTIVE_OFFRE}/${id}`);
    dispatch(fetchOffresEmploi());
  } catch (error) {
    dispatch(setError(error.message));
  }
};
export const activateOffreEmploi = (id) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await api.put(`${PATHS.OFFRE.ACTIVE_OFFRE}/${id}`);
    dispatch(fetchOffresEmploi());
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const activateOffreStage = (id) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await api.put(`${PATHS.OFFRE.ACTIVE_OFFRE}/${id}`);
    dispatch(fetchOffresStage());
  } catch (error) {
    dispatch(setError(error.message));
  }
};
