"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticateEmployeeUseCase = void 0;
// ...existing code...
const tsyringe_1 = require("tsyringe");
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
const AppError_1 = require("../../../shared/errors/AppError");
let AuthenticateEmployeeUseCase = class AuthenticateEmployeeUseCase {
    constructor(employeeRepository) {
        this.employeeRepository = employeeRepository;
    }
    async execute({ email, password }) {
        const employee = await this.employeeRepository.findByEmail(email);
        if (!employee) {
            throw new AppError_1.AppError("E-mail ou senha incorretos", 401);
        }
        const passwordMatch = await (0, bcryptjs_1.compare)(password, employee.password);
        if (!passwordMatch) {
            throw new AppError_1.AppError("E-mail ou senha incorretos", 401);
        }
        const secretKey = process.env.JWT_SECRET || "default_secret";
        const token = (0, jsonwebtoken_1.sign)({}, secretKey, {
            subject: employee.id,
            expiresIn: "1d",
        });
        const tokenReturn = {
            token,
            Employee: {
                name: employee.name,
                email: employee.email,
            },
        };
        return tokenReturn;
    }
};
exports.AuthenticateEmployeeUseCase = AuthenticateEmployeeUseCase;
exports.AuthenticateEmployeeUseCase = AuthenticateEmployeeUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("EmployeeRepository")),
    __metadata("design:paramtypes", [typeof (_a = typeof IEmployeeRepository !== "undefined" && IEmployeeRepository) === "function" ? _a : Object])
], AuthenticateEmployeeUseCase);
