"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const database_1 = require("../config/database");
const Employee_1 = require("../modules/employee/entities/Employee");
async function getEmployees() {
    try {
        await database_1.AppDataSource.initialize();
        console.log("Database connected successfully!");
        const employeeRepository = database_1.AppDataSource.getRepository(Employee_1.Employee);
        const employees = await employeeRepository.find();
        console.log("Employees fetched successfully:", employees);
        await database_1.AppDataSource.destroy();
        return employees;
    }
    catch (err) {
        console.error("Error fetching employees:", err);
        await database_1.AppDataSource.destroy();
        throw err;
    }
}
getEmployees()
    .then((employees) => {
    console.log("Returned employees:", employees);
})
    .catch((err) => {
    console.error("Failed to fetch employees:", err);
});
