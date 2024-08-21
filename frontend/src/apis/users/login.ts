import { axiosInstance } from "../../config/axios";
import {LoginData} from "@/types/LoginUser";


export const loginapi = async (loginData: LoginData): Promise<any> => {
  try {
    console.log('Login api....');
    const response = await axiosInstance.post("/auth/login", loginData,{
      withCredentials: true
    });
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }
    console.log(response.data.data)
    return response.data;
  } catch (error) {
    throw error;
  }
};








