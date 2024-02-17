"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const recommendation_controller_1 = require("../controllers/recommendation.controller");
const router = express_1.default.Router();
router.get('/get-all-restaurants', recommendation_controller_1.getRestaurantsForMarketplace); //customer data in body
exports.default = router;
