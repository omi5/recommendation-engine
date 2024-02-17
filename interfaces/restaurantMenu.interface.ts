import { IItem } from "./item.interface";

export interface IRestaurantMenu {
    restaurantId: number;
    // items: IItem[];
    items: {
        _id: string;
        itemName: string;
        itemProfileTastyTags: string[]
    }[];
}