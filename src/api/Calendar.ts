import axiosClient from "lib/api/axiosClient";
import { apiRouter } from "lib/api/apiRouter";  
import { ICalendar } from "model/Calendar";

export const getCalendar = async () => {
    try{
        const url = apiRouter.calendar;
        return await axiosClient.get<ICalendar[]>(url);
    }catch(error){
        throw error;
    }
}