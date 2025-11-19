import { Router } from "express";
import { CreateEnterpriseController } from "../useCases/createEnterprise/CreateEnterpriseControler";
import { ListEnterprisesController } from "../useCases/listEnterprise/ListEnterprisesController";

const enterpriseRoutes = Router();

const createEnterpriseController = new CreateEnterpriseController();
const listEnterprisesController = new ListEnterprisesController();

enterpriseRoutes.post("/", (req, res) =>
  createEnterpriseController.handle(req, res)
);

enterpriseRoutes.get("/", (req, res) =>
  listEnterprisesController.handle(req, res)
);

enterpriseRoutes.put("/:id", (req, res) =>
  createEnterpriseController.update(req, res)
);

export { enterpriseRoutes };
