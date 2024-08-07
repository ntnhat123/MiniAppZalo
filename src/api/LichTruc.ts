import axiosClient from "lib/api/axiosClient";
import { apiRouter } from "lib/api/apiRouter";  
import { ILichTruc } from "model/LichTruc";

export const getLichTruc = async () => {
    try{
        const url = apiRouter.lichtruc;
        return await axiosClient.get<ILichTruc[]>(url);
    }catch(error){
        throw error;
    }
}