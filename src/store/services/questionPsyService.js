import api from "../../config/api";
import PATHS from "../../path/apiPath";

import { setQuestionsPsy, setError, setLoading } from "../slices/questionPsySlice";

export const fetchQuestionPsy = () => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await api.get(`${PATHS.QUESTIONPSY.ALL_QUESTION}`);
    dispatch(setQuestionsPsy(response.data.questionsFind));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const addQuestionPsy = (question) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await api.post(`${PATHS.QUESTIONPSY.ADD_QUESTION}`, question);
    dispatch(fetchQuestionPsy());
  } catch (error) {
    dispatch(setError(error.message));
  }
};
export const deleteQuestionPsy = (id) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await api.delete(`${PATHS.QUESTIONPSY.DELETE_QUESTION}/${id}`);
    dispatch(fetchQuestionPsy());
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const updateQuestionPsy=(id,questionupdate)=>async (dispatch)=>
{
  dispatch(setLoading());
  try{
    const response= await api.put(`${PATHS.QUESTIONPSY.UPDATE_QUESTION}/${id}`,questionupdate);
    dispatch(fetchQuestionPsy());
  }
  catch(error)
  {
    dispatch(setError(error.message));
  }
  }





