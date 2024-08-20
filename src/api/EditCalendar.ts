import axiosClient from "lib/api/axiosClient";
import { apiRouter } from "lib/api/apiRouter";  
import { IListCalendar } from "model/IListCalendarUser";

export const getListCalendarUser = async (LogID: number) => {
    try {
        const url = apiRouter.editCalendar;
        const res = await axiosClient.get<IListCalendar[]>(`${url}/${LogID}`);
        return res;
    } catch (error) {
        throw error;
    }
}