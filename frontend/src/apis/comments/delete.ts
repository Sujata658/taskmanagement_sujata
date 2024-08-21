import { Task } from "@/types/Task";
import { axiosInstance } from "../../config/axios";
import { Response } from "@/types/Task";

export const deleteComment = async (taskId: string,commentId:string): Promise<Response<Task>> => {
  try {
    console.log('createTask api....');
    const response = await axiosInstance.delete(`/tasks/${taskId}/comments/${commentId}`);

    console.log('response:', response)
    return response.data as Response<Task>;
  } catch (error) {
    throw error;
  }
};