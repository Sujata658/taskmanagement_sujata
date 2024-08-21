import { axiosInstance } from "@/config/axios";
import { Category } from "@/types/Rules";

const updateRule = async (rules: Category):Promise<Category> => {
  try {
    const response = await axiosInstance.patch(`/rules`, {rules: rules})
    // console.log(response.data.rules)
    return response.data;
  } catch (error) {
    throw error;
  }
  
};

export default updateRule;