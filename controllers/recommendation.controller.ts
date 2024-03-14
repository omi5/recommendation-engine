import { Request, Response } from "express";
import { ICustomer } from "../interfaces/customer.interface";
import { IHub } from "../interfaces/hub.interface";
import { IUtilizationData } from "../interfaces/utilizationData.interface";
import { IRestaurantMenu } from "../interfaces/restaurantMenu.interface";
import { IRestaurantRating } from "../interfaces/restaurantRating.interface";
import { IResponse } from "../interfaces/response.interface";
import { getAllHubsByCustomerLatLong, getAllRestaurantsMenu, getAllRestaurantsRatings } from "../services/external.service"
import { extractCustomerPreferenceTags, getSortedRestaurantsFromHubs, sortRestaurantsByPreferenceAndRatings } from "../utils/recommenderUtil";


// Based on Customer Longitude, Latitude, and Taste Profiles/Preferences
// returns list of restaurants sorted by their Current Kitchen Utilization rate,
// matching preferences and ratings. Gives higher preferences to Low Utilization 
// Restaurants, followed by Medium Utilization and lastly High Utilization
export const getRestaurantsForOnlineCustomer = async(req: Request, res: Response)=>{
    try {
        const customerObject:ICustomer = {...req.body}    //customer data

        const hubs:IHub[] = await getAllHubsByCustomerLatLong(customerObject.currentLatLong);

        //get all sorted restaurants
        const restaurants: IUtilizationData[] | undefined = getSortedRestaurantsFromHubs(hubs);
        
        let allRestaurantsMenus: IRestaurantMenu[] | undefined;
        let allRestaurantsRatings: IRestaurantRating[] | undefined;
        let ids:number[] = []

        if (restaurants) ids = restaurants?.map(item => item.restaurantId);
        
        //get menus and ratings for the restaurants
        if (ids) {
            allRestaurantsMenus = await getAllRestaurantsMenu(ids); 
            allRestaurantsRatings = await getAllRestaurantsRatings(ids);
        }
        
        //get customer preference tags
        const customerPreferenceTags: string[] = extractCustomerPreferenceTags(customerObject);
        
        let finalSortedRestaurants: IUtilizationData[] = []
        //For sorted restaurant and menu and rating
        if (restaurants && allRestaurantsMenus && allRestaurantsRatings) {
            finalSortedRestaurants = sortRestaurantsByPreferenceAndRatings(restaurants, allRestaurantsMenus, allRestaurantsRatings, customerPreferenceTags) 
        }

        const responseData: IResponse[] = finalSortedRestaurants.map(item => {
            return {
                restaurantId: item.restaurantId,
                name: item.restaurantName,
                rating: item.rating
            }
        })

        res.status(200).send(responseData);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: (error as Error).message});
    }
}
