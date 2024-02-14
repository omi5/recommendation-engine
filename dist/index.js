"use strict";
//for index.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const recommendation_route_1 = __importDefault(require("./routers/recommendation.route"));
const hubs_router_1 = __importDefault(require("./routers/hubs.router"));
const body_parser_1 = __importDefault(require("body-parser"));
const port = 5000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ exposedHeaders: ['Authorization'] }));
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
//Routers
app.use('', recommendation_route_1.default);
app.use('', hubs_router_1.default);
// app.get('',(req, res)=>{
//    res.send({...customerData})
// })
app.listen(port, () => {
    console.log(`sever is running ${port}`);
});
