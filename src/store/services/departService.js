import api from "../../config/api"
import PATHS from "../../path/apiPath";

import { setDepartments, setLoading, setError } from "../slices/departmentsSlice";

export const fetchDepartments = () => async (dispatch) => {
  dispatch(setLoading());
  try {
    console.log(PATHS.DEPARTEMENT.ALL)
    const response = await api.get(PATHS.DEPARTEMENT.ALL);
    dispatch(setDepartments(response.data));
  } catch (error) {
    dispatch(setError(error.message));
  }
};
export const createDepartment = (department) => async (dispatch) => {
    dispatch(setLoading());
    try {
      const response = await api.post(PATHS.DEPARTEMENT.ADD, department); 
      dispatch(fetchDepartments());
      console.log(response.data); 
    } catch (error) {
      dispatch(setError(error.message)); 
    }
  };
  
export const deleteDepartments = (id) => async (dispatch) => {
    dispatch(setLoading());
    try {
      await api.delete(`${PATHS.DEPARTEMENT.DELETE}/${id}`); 
      await dispatch(fetchDepartments()); 
    } catch (error) {
      dispatch(setError(error.message));
    }
  };
   
  export const updateDepartment = (id, department) => async (dispatch) => {
    dispatch(setLoading()); 
    try {
      const response = await api.put(`${PATHS.DEPARTEMENT.UPDATE}/${id}`, department);
  
     
      dispatch({
        type: "UPDATE_DEPARTMENT_SUCCESS",
        payload: response.data, 
      });
  
      dispatch(fetchDepartments()); 
    } catch (error) {
      dispatch(setError(error.message)); 
    }
  };
  