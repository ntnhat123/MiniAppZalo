import axiosClient from "lib/api/axiosClient";
import { apiRouter } from "lib/api/apiRouter";  
import axios from 'axios';
import { IUpdatePassword } from "model/UpdatePassword";

export const postUpdatePassword = async(OldPassword: string,NewPassword: string) => {
    const data = {OldPassword,NewPassword};
    const url = apiRouter.updatePassword;
    try{
        const res = await axiosClient.post<IUpdatePassword>(url,data);
        return res.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.code === 'ERR_NETWORK') {
            console.error('Network error:', error.message);
          }
        }
        throw error;
      }
}