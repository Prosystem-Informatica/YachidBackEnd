import { Router } from "express";
import { CreateEnterpriseController } from "../useCases/createEnterprise/CreateEnterpriseControler";
import { ListEnterprisesController } from "../useCases/listEnterprise/ListEnterprisesController";
import { CreateSubEnterpriseController } from "../useCases/createSubEntrerpise/CreateSubEnterpriseController";
import { ListSubEnterprisesController } from "../useCases/listSubEntrerprise/ListSubEnterprisesController";
import { UpdateEnterpriseController } from "../useCases/updateEnterprise/UpdateEnterpriseController";
import { GetEnterpriseController } from "../useCases/getEnterprise/GetEnterpriseController";
import { UpdateSubEnterpriseController } from "../useCases/updateSubEnterprise/UpdateSubEnterpriseController";

const enterpriseRoutes = Router();

const createEnterpriseController = new CreateEnterpriseController();
const listEnterprisesController = new ListEnterprisesController();
const updateEnterpriseController = new UpdateEnterpriseController();
const getEnterpriseController = new GetEnterpriseController();

const createSubEnterpriseController = new CreateSubEnterpriseController();
const listSubEnterprisesController = new ListSubEnterprisesController();
const updateSubEnterpriseController = new UpdateSubEnterpriseController();

enterpriseRoutes.post("/", (req, res) =>
  createEnterpriseController.handle(req, res)
);

enterpriseRoutes.get("/", (req, res) =>
  listEnterprisesController.handle(req, res)
);

enterpriseRoutes.get("/:id", (req, res) =>
  getEnterpriseController.handle(req, res)
);

enterpriseRoutes.put("/:id", (req, res) =>
  updateEnterpriseController.handle(req, res)
);

enterpriseRoutes.post("/:enterpriseId/sub", (req, res) =>
  createSubEnterpriseController.handle(req, res)
);

enterpriseRoutes.get("/:enterpriseId/sub", (req, res) =>
  listSubEnterprisesController.handle(req, res)
);

enterpriseRoutes.put("/:enterpriseId/sub/:subId", (req, res) =>
  updateSubEnterpriseController.handle(req, res)
);

export { enterpriseRoutes };
