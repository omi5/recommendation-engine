import mongoose, { Schema } from 'mongoose'
import { IHub } from '../../interfaces/hub.interface';


const HubSchema: Schema = new Schema({
    id: { type: String, required: true },
    capacity: { type: Number },
    riders: { type: [Object] }, 
    restaurants: { type: [Object], required: true }, 
    center: { type: [Number] },
    status: { type: String, required: true }
});


export const HubModel = mongoose.model<IHub>('Hub', HubSchema);