"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateEmployeeController = void 0;
const tsyringe_1 = require("tsyringe");
const CreateEmployeeUseCase_1 = require("./CreateEmployeeUseCase");
class CreateEmployeeController {
    async handle(req, res) {
        const { name, email, password } = req.body;
        const createEmployeeUseCase = tsyringe_1.container.resolve(CreateEmployeeUseCase_1.CreateEmployeeUseCase);
        const employee = await createEmployeeUseCase.execute({
            name,
            email,
            password,
        });
        return res.status(201).json(employee);
    }
}
exports.CreateEmployeeController = CreateEmployeeController;
