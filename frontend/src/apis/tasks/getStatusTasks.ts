import { axiosInstance } from "../../config/axios";
import { Task } from "@/types/Task";

export const getStatusTasks = async (status: string): Promise<Task[]> => {
  try {
    const response = await axiosInstance.get(`/tasks/${status}`);
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }
    return response.data.data;
  } catch (error) {
    throw error; 
  }
};
