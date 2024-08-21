import { Task } from "@/types/Task";
import { axiosInstance } from "../../config/axios";

export const changeStatus = async (id:string, from: string, to:string): Promise<Task[]> => {
  try {
    const response = await axiosInstance.patch(`/tasks/${id}/${from}/${to}`);

    if (response.status !== 200) {
      throw new Error(response.statusText);
    }
    console.log('response.data.data:' , response.data.data);
    return response.data.data;
  } catch (error) {
    throw error; 
  }
};
