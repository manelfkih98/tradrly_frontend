import api from "../../config/api";
import PATHS from "../../path/apiPath";

import { setQuestions, setError, setLoading } from "../slices/questionSlice";

export const fetchQuestion = () => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await api.get(`${PATHS.QUESTION.ALL_QUESTION}`);
    dispatch(setQuestions(response.data.questionsFind));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const addQuestion = (question) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await api.post(`${PATHS.QUESTION.ADD_QUESTION}`, question);
    dispatch(fetchQuestion());
  } catch (error) {
    dispatch(setError(error.message));
  }
};
export const deleteQuestion = (id) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await api.delete(`${PATHS.QUESTION.DELETE_QUESTION}/${id}`);
    dispatch(fetchQuestion());
  } catch (error) {
    dispatch(setError(error.message));
  }
};
export const updateQuestion=(id,questionupdate)=>async (dispatch)=>
{
  dispatch(setLoading());
  try{
    const response= await api.put(`${PATHS.QUESTION.UPDATE_QUESTION}/${id}`,questionupdate);
    dispatch(fetchQuestion());
  }
  catch(error)
  {
    dispatch(setError(error.message));
  }
  }





