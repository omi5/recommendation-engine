
import { Request, Response } from "express";

export  const getRestaurantsForMarketplace = async(req: Request, res: Response)=>{
    try {
        const customerObject = {...req.body}    //customer data
        res.status(200).send(customerObject);
        console.log(customerObject);
        
    } catch (error) {
        console.log(error);
    }
}