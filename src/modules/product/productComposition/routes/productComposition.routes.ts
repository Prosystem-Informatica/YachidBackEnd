import { Router } from "express";
import { CreateProductCompositionController } from "../useCases/createComposition/createProductCompositionController";
import { UpdateProductCompositionController } from "../useCases/updateComposition/updateProductCompositionController";
import { DeleteProductCompositionController } from "../useCases/deleteComposition/deleteProductCompositionController";
import { ListProductCompositionController } from "../useCases/listComposition/listProductCompositionController";

const compositionRoutes = Router();

const createCompositionController = new CreateProductCompositionController();
const listCompositionController = new ListProductCompositionController();
const updateCompositionController = new UpdateProductCompositionController();
const deleteCompositionController = new DeleteProductCompositionController();

compositionRoutes.post("/", (req, res) =>
  createCompositionController.handle(req, res)
);
compositionRoutes.get("/", (req, res) =>
  listCompositionController.list(req, res)
);
compositionRoutes.put("/:id", (req, res) =>
  updateCompositionController.handle(req, res)
);
compositionRoutes.delete("/:id", (req, res) =>
  deleteCompositionController.handle(req, res)
);

export { compositionRoutes };
