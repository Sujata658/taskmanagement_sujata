import { Task } from "@/types/Task";
import { axiosInstance } from "../../config/axios";
import { Response } from "@/types/Task";

export interface CommentProps {
  content: string;
}


export const createComment = async (taskId: string, commentProps: CommentProps): Promise<Response<Task>> => {
  try {
    console.log('createTask api....');
    const response = await axiosInstance.post(`/tasks/${taskId}/comments`, commentProps);
    return response.data as Response<Task>;
  } catch (error) {
    throw error;
  }
};







