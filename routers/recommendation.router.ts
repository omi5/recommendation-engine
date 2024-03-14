import express from 'express';
import { getRestaurantsForOnlineCustomer } from '../controllers/recommendation.controller';
const router = express.Router()

router.post('/get-all-restaurants', getRestaurantsForOnlineCustomer); //customer data in body

export default router;