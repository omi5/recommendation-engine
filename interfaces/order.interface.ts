import { ILongLat } from './longLat.interface';
import {IItem} from './item.interface'
// MAIN IN THE FILE
export interface IOrder {
  _id?: string;
  riderId: string;
  customerId: string;
  restaurantId: number;
  orderItems: IItem[];
  orderTemperatureType: string; //Enum[Hot, Cold]
  totalOrderPrice: number;
  orderPlacingTime: Date;
  orderCompletingTime: Date;
  orderRoute: ILongLat[]; //array of arrays(coordinates geojson)
  deliveryPoint: ILongLat; //[lon, lat]
}