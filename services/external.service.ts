import axios from "axios";
import { ILongLat } from "../interfaces/longLat.interface";
import { IUtilizationData } from "../interfaces/utilizationData.interface";
import fs from 'fs'
import { promisify } from 'util';
import config from "../config"
import { IHub } from "../interfaces/hub.interface";

const hubDataFilePath = 'jsons/hub-data.json';
const ratingsDataFilePath = 'jsons/ratings-data.json'
const readFileAsync = promisify(fs.readFile);

export async function getAllHubsByCustomerLatLong (coordinates: ILongLat) {
  try {
    // const data = await readFileAsync(hubDataFilePath, 'utf8');
    // const jsonData = JSON.parse(data);
    // return jsonData;
    // config.RIDER_HUB_URL
    const res = await axios.get(config.RIDER_HUB_URL + `/hub/get-hubs-for-customer/longitude/${coordinates.longitude}/latitude/${coordinates.latitude}`);
    // console.log('res is ', res.data);
    return res.data as IHub[];
  } catch (error) {
    throw new Error("Error getting hubs from Hubs server.");
  }
}

// export async function getAllRestaurantsMenu (restaurantDatas: IUtilizationData[]) {
export async function getAllRestaurantsMenu (ids: number[]) {
  try {
    const res = await axios.post('https://bento-menu-omi5.koyeb.app/menuItem/get-menu-for-recommendation', {ids});
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting Restaurant Menu from Menu Builder")
  }
}

// export async function getAllRestaurantsRatings (restaurantDatas: IUtilizationData[]) {
export async function getAllRestaurantsRatings (ids: number[]) {
  try {
    // const data = await readFileAsync(ratingsDataFilePath, 'utf8');
    // const jsonData = JSON.parse(data);
    // return jsonData;
    const res = await axios.post(config.SKELETON_URL + '/restaurants/search/bulk/rating', {ids});
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting ratings from Review")
  }
}