import { axiosInstance } from "../../config/axios";

export const logOut = async () => {
  try {
    const response = await axiosInstance.get("/users/logout");
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }
    console.log(response.data)
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    window.location.reload();
  } catch (error) {
    throw error; 
  }
};
