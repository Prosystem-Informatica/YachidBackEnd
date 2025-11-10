"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const bcryptjs_1 = require("bcryptjs");
const Employee_1 = require("../modules/employee/entities/Employee");
const database_1 = require("../config/database");
async function loginEmployee() {
    try {
        await database_1.AppDataSource.initialize();
        console.log("Database connected successfully!");
        const employeeRepository = database_1.AppDataSource.getRepository(Employee_1.Employee);
        const email = "cid@example.com";
        const password = "123456";
        const employee = await employeeRepository.findOne({ where: { email } });
        if (!employee) {
            console.log("Funcionário não encontrado!");
            await database_1.AppDataSource.destroy();
            return;
        }
        const passwordMatch = await (0, bcryptjs_1.compare)(password, employee.password);
        if (!passwordMatch) {
            console.log("Senha incorreta!");
        }
        else {
            console.log("Login bem-sucedido!");
            console.log("Funcionário autenticado:", {
                id: employee.id,
                name: employee.name,
                email: employee.email,
            });
        }
        await database_1.AppDataSource.destroy();
    }
    catch (err) {
        console.error("Erro ao tentar login:", err);
    }
}
loginEmployee();
