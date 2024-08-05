import axiosClient from "lib/api/axiosClient";
import { apiRouter } from "lib/api/apiRouter";  
import { ICategoryTask } from "model/CategoryTask";

export const getCategoryTask = async () => {
    try{
        const url = apiRouter.CategoryTask;
        return await axiosClient.get<ICategoryTask[]>(url);
    }catch(error){
        throw error;
    }
}