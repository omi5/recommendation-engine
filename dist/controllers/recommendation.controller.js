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
exports.getRestaurantsForOnlineCustomer = void 0;
const external_service_1 = require("../services/external.service");
const recommenderUtil_1 = require("../utils/recommenderUtil");
// Based on Customer Longitude, Latitude, and Taste Profiles/Preferences
// returns list of restaurants sorted by their Current Kitchen Utilization rate,
// matching preferences and ratings. Gives higher preferences to Low Utilization 
// Restaurants, followed by Medium Utilization and lastly High Utilization
const getRestaurantsForOnlineCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customerObject = Object.assign({}, req.body); //customer data
        const hubs = yield (0, external_service_1.getAllHubsByCustomerLatLong)(customerObject.currentLatLong);
        //get all sorted restaurants
        const restaurants = (0, recommenderUtil_1.getSortedRestaurantsFromHubs)(hubs);
        let allRestaurantsMenus;
        let allRestaurantsRatings;
        let ids = [];
        if (restaurants)
            ids = restaurants === null || restaurants === void 0 ? void 0 : restaurants.map(item => item.restaurantId);
        //get menus and ratings for the restaurants
        if (ids) {
            allRestaurantsMenus = yield (0, external_service_1.getAllRestaurantsMenu)(ids);
            allRestaurantsRatings = yield (0, external_service_1.getAllRestaurantsRatings)(ids);
        }
        //get customer preference tags
        const customerPreferenceTags = (0, recommenderUtil_1.extractCustomerPreferenceTags)(customerObject);
        let finalSortedRestaurants = [];
        //For sorted restaurant and menu and rating
        if (restaurants && allRestaurantsMenus && allRestaurantsRatings) {
            finalSortedRestaurants = (0, recommenderUtil_1.sortRestaurantsByPreferenceAndRatings)(restaurants, allRestaurantsMenus, allRestaurantsRatings, customerPreferenceTags);
        }
        const responseData = finalSortedRestaurants.map(item => {
            return {
                restaurantId: item.restaurantId,
                name: item.restaurantName,
                rating: item.rating
            };
        });
        res.status(200).send(responseData);
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
});
exports.getRestaurantsForOnlineCustomer = getRestaurantsForOnlineCustomer;
