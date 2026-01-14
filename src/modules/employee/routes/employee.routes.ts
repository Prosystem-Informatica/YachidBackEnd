import { Router } from "express";
import { ListEmployeesController } from "../useCases/listEmployee/ListEmployeeController";
import { CreateEmployeeController } from "../useCases/createEmployee/CreateEmployeeController";
import { AuthenticateEmployeeController } from "../authenticateEmployee/AuthenticateEmployeeController";

const employeeRoutes = Router();

const createEmployeeController = new CreateEmployeeController();
const listEmployeesController = new ListEmployeesController();
const authenticateEmployeeController = new AuthenticateEmployeeController();

employeeRoutes.post("/", (req, res) =>
  createEmployeeController.handle(req, res)
);

employeeRoutes.get("/", (req, res) => listEmployeesController.handle(req, res));

employeeRoutes.post("/login", (req, res) =>
  authenticateEmployeeController.handle(req, res)
);

export { employeeRoutes };
