import axios from "axios";
import { ILongLat } from "../interfaces/longLat.interface";
import config from "../config"
import { IHub } from "../interfaces/hub.interface";

export async function getAllHubsByCustomerLatLong (coordinates: ILongLat) {
  try {
    const res = await axios.get(config.RIDER_HUB_URL + `/hub/get-hubs-for-customer/longitude/${coordinates.longitude}/latitude/${coordinates.latitude}`);
    return res.data as IHub[];
  } catch (error) {
    throw new Error("Error getting hubs from Hubs server.");
  }
}

export async function getAllRestaurantsMenu (ids: number[]) {
  try {
    const res = await axios.post(config.MENU_URL, {ids});
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting Restaurant Menu from Menu Builder")
  }
}

export async function getAllRestaurantsRatings (ids: number[]) {
  try {
    const res = await axios.post(config.SKELETON_URL + '/restaurants/search/bulk/rating', {ids});
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting ratings from Review")
  }
}