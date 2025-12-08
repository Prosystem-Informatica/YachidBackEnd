import { Router } from "express";
import { CreateProductController } from "../useCases/createProduct/createProductController";
import { ListProductsController } from "../useCases/listProduct/listProductController";
import { DeleteProductController } from "../deleteProduct/deleteProductController";
import { UpdateProductController } from "../updateProduct/UpdateProductController";

const productRoutes = Router();

const createProductController = new CreateProductController();
const listProductsController = new ListProductsController();
const deleteProductController = new DeleteProductController();
const updateProductController = new UpdateProductController();


productRoutes.post("/", (req, res) => createProductController.handle(req, res));

productRoutes.get("/", (req, res) => listProductsController.handle(req, res));

productRoutes.delete("/:id", (req, res) => deleteProductController.handle(req, res));

productRoutes.put("/:id", (req, res) => updateProductController.handle(req, res));

export { productRoutes };
