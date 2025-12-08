import { Router } from "express";
import { employeeRoutes } from "../modules/employee/routes/employee.routes";
import { customerRoutes } from "../modules/customer/routes/customer.routes";
import { enterpriseRoutes } from "../modules/enterprise/routes/enterprise.routes";
import { productRoutes } from "../modules/product/routes/product.routes";
import { invoiceRoutes } from "../modules/invoices/routes/invoice.routes";
import { categoryRoutes } from "../modules/category/routes/category.routes";

const router = Router();

router.use("/employee", employeeRoutes);
router.use("/customer", customerRoutes);
router.use("/enterprise", enterpriseRoutes);
router.use("/product", productRoutes);
router.use("/invoice", invoiceRoutes);
router.use("/category", categoryRoutes);

export { router };
