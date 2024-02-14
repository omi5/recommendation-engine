import express, { Router } from 'express';
import { getRestaurantsForMarketplace } from '../controllers/recommendation.controller';
const router = express.Router()


router.get('/get-all-restaurants', getRestaurantsForMarketplace);

export default router;