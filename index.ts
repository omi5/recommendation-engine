//for index.ts
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import recommendationRoute from './routers/recommendation.route';
import hubsRoute from './routers/hubs.router'
import bodyParser from 'body-parser';
const port = 5001;

const app = express();
app.use(cors({exposedHeaders: ['Authorization']}));
app.use(bodyParser.json())
app.use(express.json());

//Routers
app.use('',recommendationRoute)
app.use('',hubsRoute)

app.listen(port, ()=>{
    console.log(`server is running ${port}`);    
})