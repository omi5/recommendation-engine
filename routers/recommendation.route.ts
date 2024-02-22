import express from 'express';
import { getRestaurantsForMarketplace } from '../controllers/recommendation.controller';
const router = express.Router()

router.post('/get-all-restaurants', getRestaurantsForMarketplace); //customer data in body

export default router;