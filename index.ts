//for index.ts
import express from 'express';
import cors from 'cors';
import { config } from './config';
import mongoose from 'mongoose';
import recommendationRoute from './routers/recommendation.route';
// import hubsRoute from './routers/hubs.router'
import bodyParser from 'body-parser';
// const port = 5001;

const app = express();
// app.use(cors({exposedHeaders: ['Authorization']}));
app.use(bodyParser.json())
app.use(cors({ origin: config.CORS_ORIGIN.split(","), exposedHeaders: ['Authorization']}));
app.use(express.json());

//Routers
app.use('',recommendationRoute)
// app.use('',hubsRoute)


app.listen(config.PORT, () => {
    console.log("Server is listening", config.PORT);
})



// (async function bootstrap() {
//     try {
//     //   await mongoose.connect(config.MONGO_URI);
//     //   console.log('Connected to DB');
//       app.listen(config.PORT, () => {
//         console.log("Server is listening", config.PORT);
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   })();
