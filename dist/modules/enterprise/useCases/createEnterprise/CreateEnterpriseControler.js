"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateEnterpriseController = void 0;
const tsyringe_1 = require("tsyringe");
const CreateEnterpriseUseCase_1 = require("./CreateEnterpriseUseCase");
class CreateEnterpriseController {
    async handle(req, res) {
        const { name, email, password } = req.body;
        const createEnterpriseUseCase = tsyringe_1.container.resolve(CreateEnterpriseUseCase_1.CreateEnterpriseUseCase);
        const enterprise = await createEnterpriseUseCase.execute({
            name,
            email,
            password,
        });
        return res.status(201).json(enterprise);
    }
}
exports.CreateEnterpriseController = CreateEnterpriseController;
