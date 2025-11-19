import { Router } from "express";
import { AuthorizeInvoiceController } from "../useCases/authorizeInvoice/AuthorizeInvoiceController";
import { CancelInvoiceController } from "../useCases/cancelInvoice/CancelInvoiceController";
import { CreateInvoiceController } from "../useCases/createInvoices/CreateInvoiceController";
import { GetInvoiceController } from "../useCases/getInvoice/getInvoiceController";

const invoiceRoutes = Router();

const createInvoiceController = new CreateInvoiceController();
const authorizeInvoiceController = new AuthorizeInvoiceController();
const cancelInvoiceController = new CancelInvoiceController();

invoiceRoutes.post("/", (req, res) => createInvoiceController.handle(req, res));

invoiceRoutes.post("/authorize/:id", (req, res) =>
  authorizeInvoiceController.handle(req, res)
);

const getInvoiceController = new GetInvoiceController();
invoiceRoutes.get("/:id", (req, res) => getInvoiceController.handle(req, res));

invoiceRoutes.post("/cancel/:id", (req, res) =>
  cancelInvoiceController.handle(req, res)
);

export { invoiceRoutes };
