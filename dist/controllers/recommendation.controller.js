"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRestaurantsForMarketplace = void 0;
const external_service_1 = require("../services/external.service");
const getRestaurantsForMarketplace = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customerObject = Object.assign({}, req.body); //customer data
        const hubs = yield (0, external_service_1.getAllHubsByCustomerLatLong)(customerObject.currentLatLong);
        // console.log('hubs are: ', hubs);
        //get all sorted restaurants
        const restaurants = getSortedRestaurantsFromHubs(hubs);
        console.log('All restaurants are: ', restaurants);
        let allRestaurantsMenus;
        let allRestaurantsRatings;
        let ids = [];
        if (restaurants) {
            ids = restaurants === null || restaurants === void 0 ? void 0 : restaurants.map(item => item.restaurantId);
        }
        //get menus and ratings for the restaurants
        if (ids) {
            allRestaurantsMenus = yield (0, external_service_1.getAllRestaurantsMenu)(ids);
            allRestaurantsRatings = yield (0, external_service_1.getAllRestaurantsRatings)(ids); //Currently all ratings are 0
        }
        // console.log('Restaurant ratings are: ', allRestaurantsRatings);
        // console.log('Restaurant menu are: ', allRestaurantsMenus);
        let customerPreference = [];
        if (customerObject.customerPreference.tastyTags.length > 3) {
            for (let i = 0; i < customerObject.customerPreference.tastyTags.length; i++) {
                if (i < 3) {
                    customerPreference.push(customerObject.customerPreference.tastyTags[i]);
                }
            }
        }
        else {
            customerPreference = [...customerObject.customerPreference.tastyTags];
        }
        console.log("Customer preference is: ", customerPreference);
        let finalSortedRestaurants = [];
        //For sorted restaurant and menu and rating
        if (restaurants && allRestaurantsMenus && allRestaurantsRatings) {
            finalSortedRestaurants = sortRestaurantsByPreferenceAndRatings(restaurants, allRestaurantsMenus, allRestaurantsRatings, customerPreference);
        }
        const responseData = finalSortedRestaurants.map(item => {
            return {
                restaurantId: item.restaurantId,
                name: item.restaurantName,
                rating: item.rating
            };
        });
        res.status(200).send(responseData);
        // // res.status(200).send(allRestaurantsMenus);
        // res.status(200).send(hubs);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getRestaurantsForMarketplace = getRestaurantsForMarketplace;
const sortRestaurantsByPreferenceAndRatings = (restaurantsData, restaurantMenus, restaurantRatings, customerTags) => {
    let LuArray = [];
    let MuArray = [];
    let HuArray = [];
    restaurantsData.forEach(restaurant => {
        if (restaurant.level === 'LU')
            LuArray.push(restaurant);
        else if (restaurant.level === 'MU')
            MuArray.push(restaurant);
        else
            HuArray.push(restaurant);
    });
    let tagsObj = {};
    let restaurantsWithTagArr = [];
    restaurantMenus.forEach(restaurant => {
        restaurant.items.forEach(item => {
            for (let i = 0; i < item.itemProfileTastyTags.length; i++) {
                for (let j = 0; j < customerTags.length; j++) {
                    if (item.itemProfileTastyTags[i] === customerTags[j]) {
                        if (customerTags[j] in tagsObj)
                            tagsObj[customerTags[j]]++;
                        else
                            tagsObj[customerTags[j]] = 1;
                    }
                }
            }
        });
        let sortedTagsObj = {};
        let sortedTagsArray = Object.entries(tagsObj);
        tagsObj = {};
        // Sort the array based on the values in descending order
        sortedTagsArray.sort((a, b) => b[1] - a[1]);
        let addFlag = true;
        // Convert the sorted array back to an object
        sortedTagsArray.forEach(([key, value]) => {
            sortedTagsObj[key] = value;
            if (addFlag) {
                tagsObj[key] = value;
                restaurantsWithTagArr.push({
                    restaurantId: restaurant.restaurantId,
                    tag: tagsObj
                });
                addFlag = false;
                tagsObj = {};
            }
        });
        // console.log(`Restaurant with Tags is `, restaurantsWithTagArr);
    });
    LuArray = divideSortAndMergeArr(LuArray, restaurantsWithTagArr, customerTags, restaurantRatings);
    MuArray = divideSortAndMergeArr(MuArray, restaurantsWithTagArr, customerTags, restaurantRatings);
    HuArray = divideSortAndMergeArr(HuArray, restaurantsWithTagArr, customerTags, restaurantRatings);
    const rankedRestaurants = LuArray.concat(MuArray, HuArray);
    return rankedRestaurants;
};
const divideSortAndMergeArr = (restaurantArr, restaurantWithTagsArr, customerTags, restaurantRatings) => {
    let tagOneArr = [];
    let tagTwoArr = [];
    let tagThreeArr = [];
    restaurantArr.forEach(restaurant => {
        for (let i = 0; i < restaurantWithTagsArr.length; i++) {
            if (restaurant.restaurantId === restaurantWithTagsArr[i].restaurantId) {
                if (customerTags[0] in restaurantWithTagsArr[i].tag) {
                    tagOneArr.push(restaurant);
                }
                else if (customerTags[1] in restaurantWithTagsArr[i].tag) {
                    tagTwoArr.push(restaurant);
                }
                else
                    tagThreeArr.push(restaurant);
            }
        }
    });
    const tagMap = new Map();
    restaurantWithTagsArr.forEach(({ restaurantId, tag }) => {
        const tagValue = Object.values(tag)[0];
        tagMap.set(restaurantId, tagValue);
    });
    tagOneArr = sorterHelperByTags(tagOneArr, tagMap);
    tagTwoArr = sorterHelperByTags(tagTwoArr, tagMap);
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
};
const sorterHelperByTags = (resArr, tagMap) => {
    resArr.sort((a, b) => {
        const tagValueA = tagMap.get(a.restaurantId) || 0;
        const tagValueB = tagMap.get(b.restaurantId) || 0;
        return tagValueB - tagValueA;
    });
    return resArr;
};
const sorterHelperByRatings = (resArr, ratingMap) => {
    resArr.sort((a, b) => {
        const ratingA = ratingMap.get(a.restaurantId) || 0;
        const ratingB = ratingMap.get(b.restaurantId) || 0;
        return ratingB - ratingA;
    });
    return resArr;
};
const getSortedRestaurantsFromHubs = (hubObject) => {
    try {
        const hubsArray = [];
        const LuArray = [];
        const MuArray = [];
        const HuArray = [];
        //insert all LU hubs
        hubObject.forEach((hub) => {
            if (hub.status === 'LU') {
                hubsArray.push(hub);
            }
        });
        //insert all MU hubs, as no LU hubs present
        if (hubsArray.length === 0) {
            hubObject.forEach((hub) => {
                if (hub.status === 'MU') {
                    hubsArray.push(hub);
                }
            });
        }
        //insert all HU hubs, as no LU or MU hubs present
        if (hubsArray.length === 0) {
            hubObject.forEach((hub) => {
                hubsArray.push(hub);
            });
        }
        //Add all restaurants to a single array, and sort it by LU, MU, HU
        hubsArray.forEach((hub) => {
            hub.restaurants.forEach((restaurant) => {
                if (restaurant.level === 'LU') {
                    LuArray.unshift(restaurant);
                }
                else if (restaurant.level === 'MU') {
                    MuArray.push(restaurant);
                }
                else {
                    HuArray.push(restaurant);
                }
            });
        });
        const sortedRestaurantByUtilizationType = LuArray.concat(MuArray, HuArray);
        return sortedRestaurantByUtilizationType;
    }
    catch (error) {
        console.log(error);
    }
};
