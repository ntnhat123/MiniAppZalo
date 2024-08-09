import axiosClient from "lib/api/axiosClient";
import { apiRouter } from "lib/api/apiRouter";  
import { IRole } from "model/Role";

export const postRole = async (valueRole: IRole) => {
    try{
        const url = apiRouter.role;
        return await axiosClient.post<IRole[]>(url,valueRole);
    }catch(error){
        throw error;
    }
}
