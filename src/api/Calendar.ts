import axiosClient from "lib/api/axiosClient";
import { apiRouter } from "lib/api/apiRouter";  

export const getCalendar = async () => {
    try{
        const url = apiRouter.calendar;
        return await axiosClient.get(url);
    }catch(error){
        throw error;
    }
}