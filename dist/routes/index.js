"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const employee_routes_1 = require("../modules/employee/routes/employee.routes");
const router = (0, express_1.Router)();
exports.router = router;
router.use("/employee", employee_routes_1.employeeRoutes);
