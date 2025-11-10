import { Router } from "express";
import { CreateProductController } from "../useCases/createProduct/createProductController";
import { ListProductsController } from "../useCases/listProduct/listProductController";

const productRoutes = Router();

const createProductController = new CreateProductController();
const listProductsController = new ListProductsController();

productRoutes.post("/", (req, res) => createProductController.handle(req, res));

productRoutes.get("/", (req, res) => listProductsController.handle(req, res));

export { productRoutes };
