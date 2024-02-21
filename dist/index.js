"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//for index.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./config");
const recommendation_route_1 = __importDefault(require("./routers/recommendation.route"));
// import hubsRoute from './routers/hubs.router'
const body_parser_1 = __importDefault(require("body-parser"));
// const port = 5001;
const app = (0, express_1.default)();
// app.use(cors({exposedHeaders: ['Authorization']}));
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)({ origin: config_1.config.CORS_ORIGIN.split(","), exposedHeaders: ['Authorization'] }));
app.use(express_1.default.json());
//Routers
app.use('', recommendation_route_1.default);
// app.use('',hubsRoute)
app.listen(config_1.config.PORT, () => {
    console.log("Server is listening", config_1.config.PORT);
});
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
