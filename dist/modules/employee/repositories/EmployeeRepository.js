"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeRepository = void 0;
const database_1 = require("../../../config/database");
const Employee_1 = require("../entities/Employee");
class EmployeeRepository {
    constructor() {
        this.repository = database_1.AppDataSource.getRepository(Employee_1.Employee);
    }
    async create({ name, email, password, }) {
        const employee = this.repository.create({ name, email, password });
        await this.repository.save(employee);
        return employee;
    }
    async findByEmail(email) {
        return this.repository.findOneBy({ email });
    }
    async list() {
        return this.repository.find();
    }
}
exports.EmployeeRepository = EmployeeRepository;
