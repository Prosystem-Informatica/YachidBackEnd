import { Router } from "express";
import { ListEmployeesController } from "../useCases/listEmployee/ListEmployeeController";
import { CreateEmployeeController } from "../useCases/createEmployee/CreateEmployeeController";
import { AuthenticateEmployeeController } from "../authenticateEmployee/AuthenticateEmployeeController";
import { UpdateEmployeeController } from "../useCases/updateEmployee/UpdateEmployeeController";
import { DeleteEmployeeController } from "../useCases/deleteEmployee/DeleteEmployeeController";
import { GetSubEnterprisesController } from "../useCases/getSubEnterprise/GetSubEnterprisesController";

const employeeRoutes = Router();

const createEmployeeController = new CreateEmployeeController();
const listEmployeesController = new ListEmployeesController();
const authenticateEmployeeController = new AuthenticateEmployeeController();
const updateEmployeeController = new UpdateEmployeeController();
const deleteEmployeeController = new DeleteEmployeeController();
const getSubEnterprisesController = new GetSubEnterprisesController();

employeeRoutes.post("/", (req, res) =>
  createEmployeeController.handle(req, res)
);

employeeRoutes.get("/", (req, res) => listEmployeesController.handle(req, res));

employeeRoutes.post("/login", (req, res) =>
  authenticateEmployeeController.handle(req, res)
);

employeeRoutes.put("/:id", updateEmployeeController.handle);

employeeRoutes.delete("/:id", deleteEmployeeController.handle);

employeeRoutes.get("/:id/sub-enterprises", (req, res) =>
  getSubEnterprisesController.handle(req, res)
);

export { employeeRoutes };
