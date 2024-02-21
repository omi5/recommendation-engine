import { Request, Response } from "express";
import { ICustomer } from "../interfaces/customer.interface";
import { getAllHubsByCustomerLatLong, getAllRestaurantsMenu, getAllRestaurantsRatings } from "../services/external.service"
import { IHub } from "../interfaces/hub.interface";
import { IUtilizationData } from "../interfaces/utilizationData.interface";
import { IRestaurantMenu } from "../interfaces/restaurantMenu.interface";
import { IRestaurantRating } from "../interfaces/restaurantRating.interface";

interface RestaurantTags {
    restaurantId: number;
    tag: { [key: string] : number };
}

interface IResponse {
    restaurantId: number;
    name: string;
    rating: number;
}

export const getRestaurantsForMarketplace = async(req: Request, res: Response)=>{
    try {
        const customerObject:ICustomer = {...req.body}    //customer data

        const hubs:IHub[] = await getAllHubsByCustomerLatLong(customerObject.currentLatLong);

        //get all sorted restaurants
        const restaurants: IUtilizationData[] | undefined = getSortedRestaurantsFromHubs(hubs);
        let allRestaurantsMenus: IRestaurantMenu[] | undefined;
        let allRestaurantsRatings: IRestaurantRating[] | undefined;
        let ids:number[] = []
        if (restaurants) {
            ids = restaurants?.map(item => item.restaurantId);
        }
        //get menus and ratings for the restaurants
        if (ids) {
            allRestaurantsMenus = await getAllRestaurantsMenu(ids); 
            allRestaurantsRatings = await getAllRestaurantsRatings(ids);    //Currently all ratings are 0
        }
        // console.log('Restaurant ratings are: ', allRestaurantsRatings);
        // console.log('Restaurant menu are: ', allRestaurantsMenus);
        
        let customerPreference: string[] = [] 
        if (customerObject.customerPreference.tastyTags.length > 3) { 
            for (let i = 0; i < customerObject.customerPreference.tastyTags.length; i++) {
                if (i < 3) {
                    customerPreference.push(customerObject.customerPreference.tastyTags[i]);
                }    
            }
        } else {
            customerPreference = [...customerObject.customerPreference.tastyTags];
        }
        
        let finalSortedRestaurants: IUtilizationData[] = []
        //For sorted restaurant and menu and rating
        if (restaurants && allRestaurantsMenus && allRestaurantsRatings) {
            finalSortedRestaurants = sortRestaurantsByPreferenceAndRatings(restaurants, allRestaurantsMenus, allRestaurantsRatings,customerPreference) 
        }

        console.log('Sorted restaurants are: ', restaurants);

        const responseData: IResponse[] = finalSortedRestaurants.map(item => {
            return {
                restaurantId: item.restaurantId,
                name: item.restaurantName,
                rating: item.rating
            }
        })

        res.status(200).send(responseData);
        // // res.status(200).send(allRestaurantsMenus);
    } catch (error) {
        console.log(error);
    }
}

const sortRestaurantsByPreferenceAndRatings = (restaurantsData:IUtilizationData[] ,restaurantMenus:IRestaurantMenu[], restaurantRatings: IRestaurantRating[], customerTags: string[]) => {
    
   let LuArray:IUtilizationData[] = [];
   let MuArray:IUtilizationData[] = [];
   let HuArray:IUtilizationData[] = [];

   restaurantsData.forEach(restaurant => {
    if (restaurant.level === 'LU') LuArray.push(restaurant);
    else if(restaurant.level === 'MU') MuArray.push(restaurant);
    else HuArray.push(restaurant);
   })

   let tagsObj: { [key: string]: number } = {}
   let restaurantsWithTagArr: RestaurantTags[] = [];
   restaurantMenus.forEach(restaurant => {
    restaurant.items.forEach(item => {
        for (let i = 0; i < item.itemProfileTastyTags.length; i++) {
            for (let j = 0; j < customerTags.length; j++) {
                if (item.itemProfileTastyTags[i] === customerTags[j]) {
                    if (customerTags[j] in tagsObj) tagsObj[customerTags[j]]++;
                    else tagsObj[customerTags[j]] = 1;
                }
            }
        }
    });
    
    let sortedTagsObj: { [key: string]: number } = {};
    let sortedTagsArray = Object.entries(tagsObj);
    tagsObj = {};
    // Sort the array based on the values in descending order
    sortedTagsArray.sort((a, b) => b[1] - a[1]);

    let addFlag = true;
    // Convert the sorted array back to an object
    sortedTagsArray.forEach(([key, value]) => {
        sortedTagsObj[key] = value;
        if (addFlag) {
            tagsObj[key] = value
            restaurantsWithTagArr.push({
                restaurantId: restaurant.restaurantId,
                tag: tagsObj 
            })
            addFlag = false;
            tagsObj = {};
        }
    });
   })

   LuArray = divideSortAndMergeArr(LuArray, restaurantsWithTagArr, customerTags, restaurantRatings);
   MuArray = divideSortAndMergeArr(MuArray, restaurantsWithTagArr, customerTags, restaurantRatings);
   HuArray = divideSortAndMergeArr(HuArray, restaurantsWithTagArr, customerTags, restaurantRatings);

   const rankedRestaurants = LuArray.concat(MuArray, HuArray);

   return rankedRestaurants;
}

const divideSortAndMergeArr = (restaurantArr:IUtilizationData[], restaurantWithTagsArr:RestaurantTags[], customerTags: string[], restaurantRatings: IRestaurantRating[]) => {
    
    let tagOneArr:IUtilizationData[] = [];
    let tagTwoArr:IUtilizationData[] = [];
    let tagThreeArr:IUtilizationData[] = [];

    restaurantArr.forEach(restaurant => {
        for (let i = 0; i < restaurantWithTagsArr.length; i++) {
            if (restaurant.restaurantId === restaurantWithTagsArr[i].restaurantId ) {
                if (customerTags[0] in restaurantWithTagsArr[i].tag) {
                    tagOneArr.push(restaurant);
                }
                else if (customerTags[1] in restaurantWithTagsArr[i].tag) {
                    tagTwoArr.push(restaurant);
                }
                else tagThreeArr.push(restaurant);
            }
        }
    })

    const tagMap = new Map();
    restaurantWithTagsArr.forEach(({ restaurantId, tag }) => {
        const tagValue = Object.values(tag)[0];
        tagMap.set(restaurantId, tagValue);
    });

    tagOneArr = sorterHelperByTags(tagOneArr,tagMap);
    tagTwoArr = sorterHelperByTags(tagTwoArr,tagMap);
    tagThreeArr = sorterHelperByTags(tagThreeArr, tagMap);

    const ratingMap = new Map();
    restaurantRatings.forEach(({ restaurantId, rating }) => {
        ratingMap.set(restaurantId, rating);
    });


    tagOneArr = sorterHelperByRatings(tagOneArr, ratingMap);
    tagTwoArr = sorterHelperByRatings(tagTwoArr, ratingMap);
    tagThreeArr = sorterHelperByRatings(tagThreeArr, ratingMap);

    //Merge LU, MU, HU Sorted Arrays
    restaurantArr = tagOneArr.concat(tagTwoArr, tagThreeArr);
    
    return restaurantArr;
}


const sorterHelperByTags = (resArr:IUtilizationData[], tagMap: any) => {
    resArr.sort((a, b) => {
        const tagValueA = tagMap.get(a.restaurantId) || 0;
        const tagValueB = tagMap.get(b.restaurantId) || 0;
        return tagValueB - tagValueA;
    });
    return resArr;
}

const sorterHelperByRatings = (resArr:IUtilizationData[], ratingMap: any) => {
    resArr.sort((a, b) => {
        const ratingA = ratingMap.get(a.restaurantId) || 0;
        const ratingB = ratingMap.get(b.restaurantId) || 0;
        return ratingB - ratingA;
    });
    return resArr;
}


const getSortedRestaurantsFromHubs = (hubObject: IHub[])=>{
    try {
        const hubsArray:IHub[] = [];
        const LuArray:IUtilizationData[] = [];
        const MuArray:IUtilizationData[] = [];
        const HuArray:IUtilizationData[] = [];
    
        //insert all LU hubs
        hubObject.forEach((hub:IHub) =>{
            if(hub.status === 'LU'){
                hubsArray.push(hub);
            }
        })

        //insert all MU hubs, as no LU hubs present
        if (hubsArray.length === 0) {
            hubObject.forEach((hub:IHub) =>{
                if(hub.status === 'MU'){
                    hubsArray.push(hub);
                }
            })
        }

        //insert all HU hubs, as no LU or MU hubs present
        if (hubsArray.length === 0) {
            hubObject.forEach((hub:IHub) =>{
                hubsArray.push(hub);
            })  
        }  

        //Add all restaurants to a single array, and sort it by LU, MU, HU
        hubsArray.forEach((hub:IHub)=>{
            hub.restaurants.forEach((restaurant:IUtilizationData)=>{
                if(restaurant.level === 'LU'){
                    LuArray.unshift(restaurant);
                 }
                 else if(restaurant.level === 'MU'){
                    MuArray.push(restaurant);
                 }
                 else{
                    HuArray.push(restaurant);
                 }
            })
        })

        const sortedRestaurantByUtilizationType: IUtilizationData[] = LuArray.concat(MuArray,HuArray);
        
        return sortedRestaurantByUtilizationType;
        
    } catch (error) {
        console.log(error);
    }
}