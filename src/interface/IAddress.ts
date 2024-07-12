import { IAddress } from "model/Address";

export interface IAddressPayload{
    message: string;
    data: IAddress[];
    status: boolean;
}