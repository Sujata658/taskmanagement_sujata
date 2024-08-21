import { Tag } from "@/types/Tag";
import { axiosInstance } from "../../config/axios";

export const createTag = async (taskId:string, tag: Partial<Tag>): Promise<Tag[]> => {
  try {
    const response = await axiosInstance.post(`/tasks/${taskId}/tags`, tag);
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }
    return response.data.data;
  } catch (error) {
    throw error; 
  }
};
