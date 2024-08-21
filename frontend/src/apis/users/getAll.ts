import { User } from "@/types/User";
import { axiosInstance } from "../../config/axios";

export const getAllUsers = async (): Promise<User[]> => {
  try {
    const response = await axiosInstance.get("/users");
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }
    return response.data.data;
  } catch (error) {
    throw error; 
  }
};
