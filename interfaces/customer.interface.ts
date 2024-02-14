
import { ICustomerPreference } from "./CustomerPreference.interface";
import { ILongLat } from "./longLat.interface";
export interface ICustomer {
    _id?: string;
    name: string;
    email: string;
    dob: Date;
    age?: number;
    customerImage?: string;
    phoneNumber: string;
    password: string;
    address: string;
    currentLatLong?: ILongLat;
    doorwayLatLong?: ILongLat;
    uprn?: string;
    allOrderIdList: string[];
    customerPreference: ICustomerPreference; // Tasty Tag Enums from Menu and category
    loyaltyPoints?: number;
  } 