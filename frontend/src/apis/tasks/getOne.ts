import { Task } from "@/types/Task";
import { axiosInstance } from "../../config/axios";

export const getOneTask = async (taskId:string): Promise<Task> => {
  try {
    const response = await axiosInstance.get(`/tasks/one/${taskId}`);
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }
    return response.data.data;
  } catch (error) {
    throw error; 
  }
};
