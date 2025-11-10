"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const EmployeeRepository_1 = require("../../modules/employee/repositories/EmployeeRepository");
tsyringe_1.container.registerSingleton("EmployeeRepository", EmployeeRepository_1.EmployeeRepository);
