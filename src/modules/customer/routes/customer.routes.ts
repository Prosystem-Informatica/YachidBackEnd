import { Router } from "express";
import { CreateCustomerController } from "../useCases/createCustomer/createCustomerController";
import { ListCustomersController } from "../useCases/listCustomer/listCustomerController";
import { ListSuppliersController } from "../useCases/listCustomer/listSuppliersController";

const customerRoutes = Router();

const createCustomerController = new CreateCustomerController();
const listCustomersController = new ListCustomersController();
const listSuppliersController = new ListSuppliersController();

customerRoutes.post("/", (req, res) =>
  createCustomerController.handle(req, res)
);

customerRoutes.get("/", (req, res) => listCustomersController.handle(req, res));

customerRoutes.put("/:id", (req, res) =>
  createCustomerController.update(req, res)
);

customerRoutes.get("/suppliers", (req, res) =>
  listSuppliersController.handle(req, res)
);
export { customerRoutes };
