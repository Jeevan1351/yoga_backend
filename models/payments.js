const mongoose = require("mongoose");

// Payment Schema
const PaymentSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    year: { type: Number, required: true },
    month: { type: Number, required: true },
    status: { type: String, required: true },
    amount: { type: Number, required: true },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", PaymentSchema);

module.exports = Payment;