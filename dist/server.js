"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
// src/server.ts
require("reflect-metadata");
require("dotenv/config");
require("./shared/container");
const app_1 = require("./app");
Object.defineProperty(exports, "app", { enumerable: true, get: function () { return app_1.app; } });
const database_1 = require("./config/database");
const env_1 = __importDefault(require("./config/env"));
database_1.AppDataSource.initialize()
    .then(() => {
    console.log("Database connected successfully!");
    app_1.app.listen(env_1.default.appPort, () => {
        console.log(`Server running at http://localhost:${env_1.default.appPort}`);
    });
})
    .catch((error) => {
    console.error("Error connecting to the database:", error);
});
