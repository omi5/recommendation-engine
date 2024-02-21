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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllRestaurantsRatings = exports.getAllRestaurantsMenu = exports.getAllHubsByCustomerLatLong = void 0;
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importDefault(require("fs"));
const util_1 = require("util");
const config_1 = __importDefault(require("../config"));
const hubDataFilePath = 'jsons/hub-data.json';
const ratingsDataFilePath = 'jsons/ratings-data.json';
const readFileAsync = (0, util_1.promisify)(fs_1.default.readFile);
function getAllHubsByCustomerLatLong(coordinates) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // const data = await readFileAsync(hubDataFilePath, 'utf8');
            // const jsonData = JSON.parse(data);
            // return jsonData;
            // config.RIDER_HUB_URL
            // 'http://localhost:5000'
            const res = yield axios_1.default.get(config_1.default.RIDER_HUB_URL + `/hub/get-hubs-for-customer/longitude/${coordinates.longitude}/latitude/${coordinates.latitude}`);
            // console.log('res is ', res.data);
            return res.data;
        }
        catch (error) {
            throw new Error("Error getting hubs from Hubs server.");
        }
    });
}
exports.getAllHubsByCustomerLatLong = getAllHubsByCustomerLatLong;
// export async function getAllRestaurantsMenu (restaurantDatas: IUtilizationData[]) {
function getAllRestaurantsMenu(ids) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield axios_1.default.post('https://bento-menu-omi5.koyeb.app/menuItem/get-menu-for-recommendation', { ids });
            return res.data;
        }
        catch (error) {
            console.log(error);
            throw new Error("Error getting Restaurant Menu from Menu Builder");
        }
    });
}
exports.getAllRestaurantsMenu = getAllRestaurantsMenu;
// export async function getAllRestaurantsRatings (restaurantDatas: IUtilizationData[]) {
function getAllRestaurantsRatings(ids) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // const data = await readFileAsync(ratingsDataFilePath, 'utf8');
            // const jsonData = JSON.parse(data);
            // return jsonData;
            // config.SKELETON_URL
            const res = yield axios_1.default.post(config_1.default.SKELETON_URL + '/restaurants/search/bulk/rating', { ids });
            return res.data;
        }
        catch (error) {
            console.log(error);
            throw new Error("Error getting ratings from Review");
        }
    });
}
exports.getAllRestaurantsRatings = getAllRestaurantsRatings;
