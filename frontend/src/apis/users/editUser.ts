import { User } from "@/types/User";
import { axiosInstance } from "../../config/axios";

type EditUser = {
    id: number;
    name: string;
    email: string;
};

export const editUser = async (editUser: Partial<EditUser>): Promise<User[]> => {
  try {
    const response = await axiosInstance.patch("/users", editUser);
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }
    return response.data.data;
  } catch (error) {
    throw error; 
  }
};
