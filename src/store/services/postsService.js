import api from "../../config/api";
import PATHS from "../../path/apiPath";
import {
  setPosts,
  setLoading,
  setError,
  setDemandes,
} from "../slices/postsSlice";

export const fetchPostsStage = () => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await api.get(`${PATHS.POST.ALL_POST_STAGE}`);
    dispatch(setPosts(response.data));
  } catch (error) {
    dispatch(setError(error.message));
  }
};
export const fetchPostsJob = () => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await api.get(`${PATHS.POST.ALL_POST_JOB}`);
    dispatch(setPosts(response.data));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const refuser = (id) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await api.post(`${PATHS.POST.REFUSER_POST}/${id}`);
    dispatch(fetchPostsStage());
  } catch (error) {
    dispatch(setError(error)); 
  }
};
 export const refuserDemande=(id)=> async (dispatch) =>
 {
  dispatch(setLoading());
  try{
    const response = await api.post(`${PATHS.POST.REFUSER_DEMANDE}/${id}`);
    dispatch(postWithoutOffre());
  }catch(error){
    dispatch(setError(error))
  }
 }
export const accepter = (id) => async (dispatch) => {
  try {
    const response = await api.post(`${PATHS.POST.ACCEPTER_POST}/${id}`);
  } catch (error) {
    dispatch(setError(error));
  }
};

export const accepterDemande = (id) => async (dispatch) => {
  try {
    const response = await api.post(`${PATHS.POST.ACCEPTER_DEMANDE}/${id}`);
  } catch (error) {
    dispatch(setError(error));
  }
};

export const postWithoutOffre = () => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await api.get(`${PATHS.POST.DEMANDE}`);
    dispatch(setDemandes(response.data));
  } catch (error) {
    dispatch(setError(error.message));
  }
};
 export const CandidatConnecter = (data) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await api.post(PATHS.POST.LOGIN_CANDIDAT, data);
    console.log("Connexion réussie :", response);
    return response.data.candidat;
  } catch (error) {
    dispatch(setError(error.response?.data?.message || error.message));
  }
};
export const markCompleted = (id) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await api.post(`${PATHS.POST.MARK_COMPLETED}/${id}`);
    console.log("Test marqué comme terminé :", response);
  } catch (error) {
    dispatch(setError(error.message));
  }
}
export const verifier = (id) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await api.get(`${PATHS.POST.VERIFIER}/${id}`);
    console.log("Test vérifié :", response);
  } catch (error) {
    dispatch(setError(error.message));
  }
};
