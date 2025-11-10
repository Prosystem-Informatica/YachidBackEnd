"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({
    path: path_1.default.resolve(__dirname, "../../.env"),
});
const env = {
    dbType: process.env.DB_TYPE || "mysql",
    dbHost: process.env.DB_HOST || "",
    dbPort: Number(process.env.DB_PORT) || 0,
    dbUsername: process.env.DB_USERNAME || "",
    dbPassword: process.env.DB_PASSWORD || "",
    dbName: process.env.DB_NAME || "",
    dbSync: process.env.DB_SYNC === "true",
    dbLog: process.env.DB_LOG === "true",
    appPort: Number(process.env.APP_PORT) || 0,
    nodeEnv: process.env.NODE_ENV || "",
    jwtSecret: process.env.JWT_SECRET || "default_secret",
};
exports.default = env;
