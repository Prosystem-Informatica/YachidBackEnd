"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListEnterprisesController = void 0;
const tsyringe_1 = require("tsyringe");
const listEnterprisesUseCase_1 = require("./listEnterprisesUseCase");
class ListEnterprisesController {
    async handle(req, res) {
        const listEnterprisesUseCase = tsyringe_1.container.resolve(listEnterprisesUseCase_1.ListEnterprisesUseCase);
        const enterprises = await listEnterprisesUseCase.execute();
        return res.json(enterprises);
    }
}
exports.ListEnterprisesController = ListEnterprisesController;
