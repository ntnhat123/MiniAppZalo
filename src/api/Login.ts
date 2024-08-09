import axiosClient from "lib/api/axiosClient";
import { apiRouter } from "lib/api/apiRouter";  
import { ILogin } from "model/Login";
import axios from 'axios';

export const postLogin = async(UserName: string,PassWord: string) => {
    const data = {UserName,PassWord};
    const url = apiRouter.login;
    try{
        const res = await axiosClient.post<ILogin>(url,data);
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