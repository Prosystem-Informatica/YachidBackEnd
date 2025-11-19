import { Router } from "express";
import { CreateCustomerController } from "../useCases/createCustomer/createCustomerController";
import { ListCustomersController } from "../useCases/listCustomer/listCustomerController";

const customerRoutes = Router();

const createCustomerController = new CreateCustomerController();
const listCustomersController = new ListCustomersController();

customerRoutes.post("/", (req, res) =>
  createCustomerController.handle(req, res)
);

customerRoutes.get("/", (req, res) => listCustomersController.handle(req, res));

customerRoutes.put("/:id", (req, res) =>
  createCustomerController.update(req, res)
);

export { customerRoutes };
