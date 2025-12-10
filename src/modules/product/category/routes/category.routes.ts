import { Router } from "express";
import { CreateCategoryController } from "../useCases/createCategory/CreateCategoryController";
import { ListCategoriesController } from "../useCases/listCategories/ListCategoriesController";

const categoryRoutes = Router();

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();

categoryRoutes.post("/:enterprise_id", createCategoryController.handle);
categoryRoutes.get("/:enterprise_id", listCategoriesController.handle);

export { categoryRoutes };
