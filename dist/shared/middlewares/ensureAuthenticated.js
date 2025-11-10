"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAuthenticated = ensureAuthenticated;
const jsonwebtoken_1 = require("jsonwebtoken");
const AppError_1 = require("../errors/AppError");
function ensureAuthenticated(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        throw new AppError_1.AppError("Token is missing", 401);
    }
    const [, token] = authHeader.split(" ");
    try {
        const secretKey = process.env.JWT_SECRET || "default_secret";
        const { sub: user_id } = (0, jsonwebtoken_1.verify)(token, secretKey);
        req.user = { id: user_id };
        next();
    }
    catch {
        throw new AppError_1.AppError("Invalid token", 401);
    }
}
