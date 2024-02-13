import { IOrder } from "./order.interface";
import { ILongLat } from "./longLat.interface";
import { IRiderStates } from "./riderState.interface";
export interface IRider {
    _id: string;
    name: string;
    riderImage: string;
    phoneNumber: string;
    email: string;
    password: string;
    vehicleType: string; // Enum [Car, Bike, Cycle]
    onlineStatus: boolean;
    riderRating: number;
    currentOrderList: IOrder[];
    currentFirstOrderRoute: ILongLat[];
    currentLatLong: ILongLat;
    currentBagCapacity: string; //Length X Width X Height
    riderStates: IRiderStates;
    travelTime: number;
  }