import axiosClient from "lib/api/axiosClient";
import { apiRouter } from "lib/api/apiRouter";  
import { IAddressPayload } from "interface/IAddress";

export const getAddress = async () => {
    const url = apiRouter.address;
    return await axiosClient.get(url)
}