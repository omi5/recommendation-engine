"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const hubs_controller_1 = require("../controllers/hubs.controller");
const router = express_1.default.Router();
router.get('/get-all-hubs', hubs_controller_1.getAllHubsNearbyCustomer);
exports.default = router;
