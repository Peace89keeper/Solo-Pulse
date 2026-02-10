import ErrorHandler from "../error/error.js";
import { Invoice } from "../model/invoiceSchema.js";

export const getAllInvoices = async (req, res, next) => {
  try {
    const invoices = await Invoice.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: invoices,
    });
  } catch (err) {
    return next(err);
  }
};

export const getDashboardStats = async (req, res, next) => {
  try {
    const invoices = await Invoice.find();

    const totalRevenue = invoices
      .filter((inv) => inv.status === "paid")
      .reduce((sum, inv) => sum + inv.amount, 0);

    const pending = invoices
      .filter((inv) => inv.status !== "paid")
      .reduce((sum, inv) => sum + inv.amount, 0);

    const overdueCount = invoices.filter(
      (inv) => inv.status === "overdue",
    ).length;

    res.status(200).json({
      success: true,
      stats: {
        totalRevenue,
        pending,
        overdueCount,
        totalInvoices: invoices.length,
      },
    });
  } catch (err) {
    return next(err);
  }
};

export const createInvoice = async (req, res, next) => {
  const { invoiceId, client, project, amount, status, email, dueDate } =
    req.body;

  if (!invoiceId || !client || !project || !amount || !email || !dueDate) {
    return next(new ErrorHandler("Please fill all required fields", 400));
  }

  try {
    const invoiceExists = await Invoice.findOne({ invoiceId });
    if (invoiceExists) {
      return next(new ErrorHandler("Invoice ID already exists", 400));
    }

    const newInvoice = await Invoice.create({
      invoiceId,
      client,
      project,
      amount,
      status: status || "due-soon",
      email,
      dueDate: new Date(dueDate),
    });

    res.status(201).json({
      success: true,
      message: "Invoice created successfully",
      data: newInvoice,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const validationErrors = Object.values(err.errors).map((e) => e.message);
      return next(new ErrorHandler(validationErrors.join(", "), 400));
    }
    return next(err);
  }
};

export const updateInvoice = async (req, res, next) => {
  const { id } = req.params;
  const { status, daysOverdue } = req.body;

  try {
    const invoice = await Invoice.findByIdAndUpdate(
      id,
      { status, daysOverdue },
      { new: true, runValidators: true },
    );

    if (!invoice) {
      return next(new ErrorHandler("Invoice not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Invoice updated successfully",
      data: invoice,
    });
  } catch (err) {
    return next(err);
  }
};

export const getRecentInvoices = async (req, res, next) => {
  try {
    const recentInvoices = await Invoice.find()
      .sort({ createdAt: -1 })
      .limit(3);

    res.status(200).json({
      success: true,
      data: recentInvoices,
    });
  } catch (err) {
    return next(err);
  }
};
