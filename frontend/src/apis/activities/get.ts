import { axiosInstance } from "@/config/axios";
import { Activity } from "@/types/Activity";

export const getActivities = async (): Promise<Activity[]> => {
  try {
    const response = await axiosInstance.get(`/activities`);

    return response.data.data;
  } catch (error) {
    throw new Error((error as any).response.data?.message || 'Failed to fetch activities');
  }
};
