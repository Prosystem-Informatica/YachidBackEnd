"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListEmployeesController = void 0;
const tsyringe_1 = require("tsyringe");
const ListEmployeeUseCase_1 = require("./ListEmployeeUseCase");
class ListEmployeesController {
    async handle(req, res) {
        const listEmployeesUseCase = tsyringe_1.container.resolve(ListEmployeeUseCase_1.ListEmployeesUseCase);
        const employees = await listEmployeesUseCase.execute();
        return res.json(employees);
    }
}
exports.ListEmployeesController = ListEmployeesController;
