import api from "../../config/api";
import PATHS from "../../path/apiPath";
import { setContacts, setLoading, setError } from "../slices/contactSlice";
 export const fetchContact = () => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await api.get(PATHS.CONTACT.GET_CONTACT);
    dispatch(setContacts(response.data));
  } catch (error) {
    dispatch(setError(error.message));
  }
}
export const createContact = (contact) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await api.post(PATHS.CONTACT.ADD_CONTACT, contact); 
    dispatch(fetchContact());
    console.log(response.data); 
  } catch (error) {
    dispatch(setError(error.message)); 
  }
};