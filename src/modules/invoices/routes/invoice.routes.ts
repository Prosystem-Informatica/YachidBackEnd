import { Router } from "express";
import { AuthorizeInvoiceController } from "../useCases/authorizeInvoice/AuthorizeInvoiceController";
import { CancelInvoiceController } from "../useCases/cancelInvoice/CancelInvoiceController";
import { CreateInvoiceController } from "../useCases/createInvoices/CreateInvoiceController";

const invoiceRoutes = Router();

const createInvoiceController = new CreateInvoiceController();
const authorizeInvoiceController = new AuthorizeInvoiceController();
const cancelInvoiceController = new CancelInvoiceController();

invoiceRoutes.post("/", (req, res) => createInvoiceController.handle(req, res));

invoiceRoutes.post("/authorize/:id", (req, res) =>
  authorizeInvoiceController.handle(req, res)
);

invoiceRoutes.post("/cancel/:id", (req, res) =>
  cancelInvoiceController.handle(req, res)
);

export { invoiceRoutes };
