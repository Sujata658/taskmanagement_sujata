import { axiosInstance } from "@/config/axios";
export const getRule = async () => {
  try {
    const response = await axiosInstance.get(`/rules`);
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }
    return response.data.data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};
