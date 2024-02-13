import { IRestaurantUtilizationData } from './restaurantUtilizationData.interface';
export interface IUtilizationData extends IRestaurantUtilizationData {
  utilizationType: string;
  coordinates: number[];
  totalOrders?: number;
}