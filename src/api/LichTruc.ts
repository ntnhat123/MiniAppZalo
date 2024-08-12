import axiosClient from "lib/api/axiosClient";
import { apiRouter } from "lib/api/apiRouter";  
import { ILichTruc } from "model/LichTruc";
import { ILogCalendar } from "model/LogCalendar";

export const getLichTruc = async () => {
    try{
        const url = apiRouter.lichtruc;
        return await axiosClient.get<ILichTruc[]>(url);
    }catch(error){
        throw error;
    }
}

export const postLogCalendar = async (lichTruc: ILogCalendar) => {
    try {
        const url = apiRouter.themghichu;
        return await axiosClient.post<ILogCalendar>(url, lichTruc);
    } catch (error) {
        throw error;
    }
}