
import { Request, Response } from "express";
import { sortByHubIncludeLu } from "../models/hub/hub.query";
import { IHub } from "../interfaces/hub.interface";
import { IUtilizationData } from "../interfaces/utilizationData.interface";

export const getAllHubsNearbyCustomer = async(req: Request, res: Response)=>{
    try {
        const hubObject = req.body    //customer data
        console.log('Hub Object is: ', hubObject);
        
        const hubsArray:IHub[] = [];
        const luArray:IUtilizationData[] = [];
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
            hub.restaurants.forEach((el:IUtilizationData)=>{
                if(el.utilizationType === 'LU'){
                    luArray.unshift(el);
                 }
                 else if(el.utilizationType === 'MU'){
                    MuArray.push(el);
                 }
                 else{
                    HuArray.push(el);
                 }
            })
        })
        // console.log('LU Array is: ', sortedRestaurantByUtilizationType);
        // console.log('MU Array is: ', MuArray);
        // console.log('HU Array is: ', HuArray);

        const sortedRestaurantByUtilizationType: IUtilizationData[] = luArray.concat(MuArray,HuArray);
        
        // console.log('Sorted restarants: ',sortedRestaurantByUtilizationType);
        res.status(200).send(sortedRestaurantByUtilizationType);
        // const sortHubs = await sortByHubIncludeLu(hubObject);
        
    } catch (error) {
        console.log(error);
    }
}