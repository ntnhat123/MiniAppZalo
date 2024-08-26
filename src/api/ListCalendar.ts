// import axiosClient from "lib/api/axiosClient";
// import { apiRouter } from "lib/api/apiRouter";  
// import { ICalendar } from "model/Calendar";
// import { IListCalendar } from "model/IListCalendarUser";

// export const getListCalendarUser = async () => {

//     try{
//         const url = apiRouter.listCalendar;
//         return await axiosClient.get<IListCalendar[]>(url);
//     }catch(error){
//         throw error;
//     }
// }

import axiosClient from "lib/api/axiosClient";
import { apiRouter } from "lib/api/apiRouter";  
import { IListCalendar } from "model/IListCalendarUser";

export const getListCalendarUser = async (UserID: number) => {
    try {
        const url = apiRouter.listCalendar;
        const res = await axiosClient.get<IListCalendar[]>(`${url}/${UserID}`);
        return res;
    } catch (error) {
        throw error;
    }
}
