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
exports.getAllHubsNearbyCustomer = void 0;
const getAllHubsNearbyCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hubObject = req.body; //customer data
        console.log('Hub Object is: ', hubObject);
        const hubsArray = [];
        const luArray = [];
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
            hub.restaurants.forEach((el) => {
                if (el.utilizationType === 'LU') {
                    luArray.unshift(el);
                }
                else if (el.utilizationType === 'MU') {
                    MuArray.push(el);
                }
                else {
                    HuArray.push(el);
                }
            });
        });
        // console.log('LU Array is: ', sortedRestaurantByUtilizationType);
        // console.log('MU Array is: ', MuArray);
        // console.log('HU Array is: ', HuArray);
        const sortedRestaurantByUtilizationType = luArray.concat(MuArray, HuArray);
        // console.log('Sorted restarants: ',sortedRestaurantByUtilizationType);
        res.status(200).send(sortedRestaurantByUtilizationType);
        // const sortHubs = await sortByHubIncludeLu(hubObject);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getAllHubsNearbyCustomer = getAllHubsNearbyCustomer;
