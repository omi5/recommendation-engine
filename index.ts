//for index.ts
import express from 'express';
import cors from 'cors';
import { config } from './config';
import recommendationRoute from './routers/recommendation.route';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json())
app.use(cors({ origin: config.CORS_ORIGIN.split(","), exposedHeaders: ['Authorization']}));
app.use(express.json());

//Routers
app.use('', recommendationRoute)

app.listen(config.PORT, () => {
    console.log("Server is listening", config.PORT);
})