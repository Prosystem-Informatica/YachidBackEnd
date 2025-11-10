"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const AppError_1 = require("./shared/errors/AppError");
require("./shared/container");
const env_1 = __importDefault(require("./config/env"));
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use(routes_1.router);
exports.app.get("/health", (req, res) => {
    return res.json({ status: "ok", env: env_1.default.nodeEnv });
});
exports.app.use((err, req, res, next) => {
    if (err instanceof AppError_1.AppError) {
        return res.status(err.statusCode).json({ message: err.message });
    }
    console.error(err);
    return res.status(500).json({
        message: err instanceof Error
            ? `Internal server error - ${err.message}`
            : "Internal server error",
    });
});
