import { IRider } from "./rider.interface";
import {IUtilizationData} from "./utilizationData.interface"
export interface IHUb{
    id:string;
    capacity: number;
    riders: IRider[];
    restaurants: IUtilizationData[];
    center: number[];
    status:string;

}