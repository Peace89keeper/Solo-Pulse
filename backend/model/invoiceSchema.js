import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
  invoiceId: {
    type: String,
    required: true,
    unique: true,
  },
  client: {
    type: String,
    required: true,
  },
  project: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["overdue", "due-soon", "paid"],
    default: "due-soon",
  },
  daysOverdue: {
    type: Number,
    default: 0,
  },
  email: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  dueDate: {
    type: Date,
    required: true,
  },
});

export const Invoice = mongoose.model("Invoice", invoiceSchema);
