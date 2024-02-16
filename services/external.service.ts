import axios from "axios";
import { ILongLat } from "../interfaces/longLat.interface";
import { IUtilizationData } from "../interfaces/utilizationData.interface";
import fs from 'fs'
import { promisify } from 'util';

const hubDataFilePath = 'jsons/hub-data.json';
const ratingsDataFilePath = 'jsons/ratings-data.json'
const readFileAsync = promisify(fs.readFile);

export async function getAllHubsByCustomerLatLong (coordinates: ILongLat) {
  try {
      //const res = await axios.get("hub-route/" + coordinates);
      const data = await readFileAsync(hubDataFilePath, 'utf8');
      const jsonData = JSON.parse(data);
      return jsonData;
        // return res;
  } catch (error) {
    throw new Error("Error getting hubs from Hubs server.");
  }
}

export async function getAllRestaurantsMenu (restaurantDatas: IUtilizationData[]) {
  try {
    const res = await axios.post('https://bento-menu-omi5.koyeb.app/menuItem/get-menu-for-recommendation', restaurantDatas);
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting Restaurant Menu from Menu Builder")
  }
}

export async function getAllRestaurantsRatings (restaurantDatas: IUtilizationData[]) {
  try {
    const data = await readFileAsync(ratingsDataFilePath, 'utf8');
    const jsonData = JSON.parse(data);
    return jsonData;
    // const res = await axios.post('review route', restaurantDatas);
    // return res.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting ratings from Review")
  }
}