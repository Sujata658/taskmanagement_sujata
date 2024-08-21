import { Task } from "@/types/Task";
import { axiosInstance } from "../../config/axios";

export const getAllTasks = async (): Promise<Task[]> => {
  try {
    const response = await axiosInstance.get("/tasks");
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }
    return response.data.data;
  } catch (error) {
    throw error; 
  }
};
