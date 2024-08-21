import { axiosInstance } from "../../config/axios";
import { Task } from "@/types/Task";
import { getAllTasks } from "../tasks/getAllTasks";
import { Tag } from "@/types/Tag";


export const getTasksByTag = async (query: string): Promise<Task[]> => {
  try {
    if (!query) {
      const response = await getAllTasks();
      return response;
    }

    const response = await axiosInstance.get(`/tasks/i/tags/search/${query}`);
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }

    const tagsWithTasks: Tag[] = response.data.data;
    const allTasks: Task[] = tagsWithTasks.flatMap((tag) => tag.tasks);

    return allTasks;
  } catch (error) {
    throw error;
  }
};
