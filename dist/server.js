"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const router_1 = __importDefault(require("./router"));
const db_1 = require("./config/db");
const cors_2 = require("./config/cors");
(0, db_1.connectDB)();
const app = (0, express_1.default)();
// Cors
app.use((0, cors_1.default)(cors_2.corsConfig));
// Leer datos de formularios
app.use(express_1.default.json());
app.use('/', router_1.default);
exports.default = app;
//# sourceMappingURL=server.js.map