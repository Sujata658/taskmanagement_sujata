import { Tag } from "@/types/Tag";
import { axiosInstance } from "../../config/axios";

export const getAllTags = async (): Promise<Tag[]> => {
  try {
    const response = await axiosInstance.get("/tasks/i/tags");
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }
    // console.log(response.data.data)
    return response.data.data;
  } catch (error) {
    throw error; 
  }
};
