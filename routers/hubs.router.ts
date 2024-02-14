import express, { Router } from 'express';
import { getAllHubsNearbyCustomer } from '../controllers/hubs.controller';
const router = express.Router()


router.get('/get-all-hubs', getAllHubsNearbyCustomer);

export default router;