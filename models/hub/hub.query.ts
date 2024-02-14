
import {IHUb} from '../../interfaces/hub.interface';


const sortByHubIncludeLu = async(hubObject: any)=>{
    const luArray:any = [];
    const sortedRestaurantByUtilizationType= [];

    hubObject.forEach((el:any) =>{
        if(el.status === 'LU'){
            luArray.push(el);
        }

    luArray.forEach((el:any)=>{
        el.restaurants.forEach((el:any)=>{
            if(el.UtilizationType === 'LU'){
                sortedRestaurantByUtilizationType.unshift(el);
             }
             else{
                sortedRestaurantByUtilizationType.push(el);
             }
        })
    })
    })
}

export {sortByHubIncludeLu}