import { Task, TaskProps } from "@/types/Task";
import { axiosInstance } from "../../config/axios";
import { Response } from "@/types/Task";

export const updateTask = async (taskId: string, taskProps: Partial<TaskProps>): Promise<Response<Task>> => {
  try {
    console.log('editTask api....');
    const response = await axiosInstance.patch(`/tasks/${taskId}`, taskProps);
    // console.log('editTask api response....', response.data);
    return response.data as Response<Task>;
  } catch (error) {
    throw error;
  }
};
