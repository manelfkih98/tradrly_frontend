import api from "../../config/api";
import PATHS from "../../path/apiPath";

const login = async (email, password) => {
  try {
 
    const response = await api.post(`${PATHS.AUTH.LOGIN}`, {
      email,      
      password, 
    });

   
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    if (response.data.fullName) {
      localStorage.setItem("fullName", response.data.fullName);
    }

    return response.data;
  } catch (error) {
   
    console.error("Erreur de connexion:", error.response?.data?.message || error.message);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
};

export default { login };
