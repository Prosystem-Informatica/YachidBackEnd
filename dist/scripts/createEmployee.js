"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const bcryptjs_1 = require("bcryptjs");
const Employee_1 = require("../modules/employee/entities/Employee");
const database_1 = require("../config/database");
async function createEmployee() {
    try {
        await database_1.AppDataSource.initialize();
        console.log("✅ Database connected successfully!");
        const employeeRepository = database_1.AppDataSource.getRepository(Employee_1.Employee);
        const passwordHash = await (0, bcryptjs_1.hash)("123456", 8);
        const employee = employeeRepository.create({
            name: "Cid",
            email: "cid@example.com",
            year: 26,
            password: passwordHash,
        });
        await employeeRepository.save(employee);
        console.log("Employee created successfully:", employee);
        await database_1.AppDataSource.destroy();
    }
    catch (err) {
        console.error("Error creating employee:", err);
    }
}
createEmployee();
