
import { ICustomerPreference } from "./CustomerPreference.interface";
import { ILongLat } from "./longLat.interface";
export interface ICustomer {
    _id: string; //needed
    name?: string; //needed
    email?: string;
    dob?: Date;
    age?: number;
    customerImage?: string;
    phoneNumber?: string;
    password?: string;
    address?: string;
    currentLatLong: ILongLat; //needed
    doorwayLatLong?: ILongLat;
    uprn?: string;
    allOrderIdList?: string[];
    customerPreference: ICustomerPreference; // //needed //Tasty Tag Enums from Menu and category
    loyaltyPoints?: number;
  } 