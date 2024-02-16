import { IItem } from "./item.interface";

export interface IRestaurantMenu {
    restaurantId: number;
    items: IItem[];
}