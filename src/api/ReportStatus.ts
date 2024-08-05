import axiosClient from "lib/api/axiosClient";
import { apiRouter } from "lib/api/apiRouter";  
import { IReportStatus } from "model/ReportStatus";

export const getReportStatus = async () => {
    try{
        const url = apiRouter.ReportStatus;
        return await axiosClient.get<IReportStatus[]>(url);
    }catch(error){
        throw error;
    }
}