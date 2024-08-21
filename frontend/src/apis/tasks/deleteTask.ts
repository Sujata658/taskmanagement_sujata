import { axiosInstance } from "../../config/axios";

export const deleteTask = async (id:string) => {
  try {
    const response = await axiosInstance.delete(`/tasks/${id}`);

    if (response.status !== 200) {
      throw new Error(response.statusText);
    }
    // console.log('response.data.data:' , response.data);
    return response.data;
  } catch (error) {
    throw error; 
  }
};
