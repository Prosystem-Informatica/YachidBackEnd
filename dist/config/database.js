"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const env_1 = __importDefault(require("./env"));
const Employee_1 = require("../modules/employee/entities/Employee");
const Enterprise_1 = require("../modules/enterprise/entities/Enterprise");
exports.AppDataSource = new typeorm_1.DataSource({
    type: env_1.default.dbType,
    host: env_1.default.dbHost,
    port: env_1.default.dbPort,
    username: env_1.default.dbUsername,
    password: env_1.default.dbPassword,
    database: env_1.default.dbName,
    synchronize: env_1.default.dbSync,
    logging: env_1.default.dbLog,
    entities: [Employee_1.Employee, Enterprise_1.Enterprise],
    migrations: [],
    subscribers: [],
});
