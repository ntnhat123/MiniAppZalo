import axiosClient from "lib/api/axiosClient";
import { apiRouter } from "lib/api/apiRouter";  
import { IEditCalendar } from "model/IEditCalendar";

export const getEditCalendarUser = async (LogID: number) => {
    try {
        const url = apiRouter.editCalendar;
        const res = await axiosClient.get<IEditCalendar[]>(`${url}/${LogID}`);
        return res;
    } catch (error) {
        throw error;
    }
}