
import { Request, Response } from "express";
import { sortByHubIncludeLu } from "../models/hub/hub.query";

export  const getAllHubsNearbyCustomer = async(req: Request, res: Response)=>{
    try {
        const hubObject = {...req.body}    //customer data
        res.status(200).send(hubObject);
        const sortHubs = await sortByHubIncludeLu(hubObject);
        console.log(hubObject);
        
    } catch (error) {
        console.log(error);
    }
}