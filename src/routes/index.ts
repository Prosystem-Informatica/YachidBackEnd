import { Router } from "express";
import { employeeRoutes } from "../modules/employee/routes/employee.routes";
import { customerRoutes } from "../modules/customer/routes/customer.routes";
import { enterpriseRoutes } from "../modules/enterprise/routes/enterprise.routes";
import { invoiceRoutes } from "../modules/invoices/routes/invoice.routes";
import { productRoutes } from "../modules/product/coreProduct/routes/product.routes";
import { categoryRoutes } from "../modules/product/category/routes/category.routes";
import { compositionRoutes } from "../modules/product/productComposition/routes/productComposition.routes";
import { authRoutes } from "../shared/infra/auth.routes";

const router = Router();

router.use("/employee", employeeRoutes);
router.use("/customer", customerRoutes);
router.use("/enterprise", enterpriseRoutes);
router.use("/product", productRoutes);
router.use("/invoice", invoiceRoutes);
router.use("/category", categoryRoutes);
router.use("/composition", compositionRoutes);
router.use("/auth", authRoutes);

export { router };
