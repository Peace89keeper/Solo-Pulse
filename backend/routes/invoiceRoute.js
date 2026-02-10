import express from "express";
import {
  getAllInvoices,
  getDashboardStats,
  createInvoice,
  updateInvoice,
  getRecentInvoices,
} from "../controller/invoiceController.js";

const router = express.Router();

router.get("/all", getAllInvoices);
router.get("/stats", getDashboardStats);
router.get("/recent", getRecentInvoices);
router.post("/create", createInvoice);
router.put("/:id", updateInvoice);

export default router;
