import { Task, TaskProps } from "@/types/Task";
import { axiosInstance } from "../../config/axios";
import { Response } from "@/types/Task";

export const createTask = async (taskProps: TaskProps): Promise<Response<Task>> => {
  try {
    console.log('createTask api....');
    const response = await axiosInstance.post("/tasks", taskProps);
    return response.data as Response<Task>;
  } catch (error) {
    throw error;
  }
};







