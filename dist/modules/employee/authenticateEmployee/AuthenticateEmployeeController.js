"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticateEmployeeController = void 0;
const tsyringe_1 = require("tsyringe");
const AuthenticateEmployeeUseCase_1 = require("./AuthenticateEmployeeUseCase");
class AuthenticateEmployeeController {
    async handle(req, res) {
        const { email, password } = req.body;
        const authenticateEmployeeUseCase = tsyringe_1.container.resolve(AuthenticateEmployeeUseCase_1.AuthenticateEmployeeUseCase);
        const tokenResponse = await authenticateEmployeeUseCase.execute({
            email,
            password,
        });
        return res.json(tokenResponse);
    }
}
exports.AuthenticateEmployeeController = AuthenticateEmployeeController;
