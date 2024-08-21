import { SignUpData } from "@/types/LoginUser";
import { axiosInstance } from "../../config/axios";

export const signupapi = async (signUpData: SignUpData) => {
  try {
    console.log('SignUp api....');
    const response = await axiosInstance.post("/auth/signup", signUpData);
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }
    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    return [];
  }
};
