import axios from "axios";
import api from "../../config/api";
import PATHS from "../../path/apiPath";
import {
  setPosts,
  setLoading,
  setError,
  setDemandes,
  setPostsJob,
  setPostsStage,
  setPostByConadi,
  setPostSuccess
} from "../slices/postsSlice";
import { updatePost  } from "../slices/postsSlice";


export const fetchPostsStage = () => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await api.get(`${PATHS.POST.ALL_POST_STAGE}`);
    dispatch(setPostsStage(response.data));
  } catch (error) {
    dispatch(setError(error.message));
  }
};
export const fetchPostsJob = () => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await api.get(`${PATHS.POST.ALL_POST_JOB}`);
    dispatch(setPostsJob(response.data));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const refuserStage = (id) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await api.post(`${PATHS.POST.REFUSER_POST}/${id}`);
    dispatch(fetchPostsStage());
  } catch (error) {
    dispatch(setError(error)); 
  }
};
export const refuserJob = (id) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await api.post(`${PATHS.POST.REFUSER_POST}/${id}`);
    dispatch(fetchPostsJob());
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
export const passerTestJob = (id) => async (dispatch) => {
 
  try {
    const response = await api.post(`${PATHS.QCM.PASSER_TEST}/${id}`);
    dispatch(fetchPostsJob());
   
    console.log("Test passé :", response.data);
  } catch (error) {
    dispatch(setError(error.message));
  }
};
export const passerTestStage = (id) => async (dispatch) => {
 
  try {
    const response = await api.post(`${PATHS.QCM.PASSER_TEST}/${id}`);
    dispatch(fetchPostsStage());
   
    console.log("Test passé :", response.data);
  } catch (error) {
    dispatch(setError(error.message));
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
export const postuler = (data) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await axios.post(PATHS.POST.POSTULER, data );
    console.log("Postulation réussie :", response.data);
  } catch (error) {
    dispatch(setError(error.message));
  }
};
export const postulerSansOffre = (data) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await axios.post(PATHS.POST.POST_SPONPONTANE, data );
    console.log("Postulation réussie :", response.data);
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const loginCondidat = async (email) => {
  try {
    const response = await api.post(PATHS.POST.LOGIN_CONADIDAT_ESPACE, { email });
    return response;
  } catch (error) {
    throw error;
  }
};
export const postByCondidat = (email) => {
  return async (dispatch) => {
    try {
      const response = await api.post(PATHS.POST.POST_CONDIDAT, { email });
      dispatch(setPostByConadi(response.data));
    } catch (error) {
      dispatch(setError(error.message));
    }
  };
};

export const update_cv = (idPost, formData) => {
  return async (dispatch) => {
    try {
      const response = await api.put(`${PATHS.POST.UPDATE_Post}/${idPost}`, formData); // no headers needed
      console.log("update_cv response:", response.data);
      dispatch(updatePost(response.data.postupdated));
      return response.data.postupdated;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Erreur lors de la mise à jour du CV";
      console.error("update_cv error:", error);
      dispatch(setError(errorMessage));
      throw { payload: errorMessage };
    }
  };
};

  export const get_cv = (filename) => {
    return async (dispatch) => {
      try {
        const response = await api.get(`${PATHS.POST.GET_CV}/${filename}`);
       
      } catch (error) {
        dispatch(setError(error.message));
      }
    };
  };
  