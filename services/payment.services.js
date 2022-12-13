const Payment = require("../models/payments.model");
const completePayment = require("../helpers/completePayment");

// Make payment
exports.makePayment = async (query) => {
    try {
        if (query.amount <= 0) {
            throw Error("Amount must be greater than 0");
        }
        var prev = await Payment.findOne({ email: query.email, year: query.year, month: query.month }).sort({ createdAt: -1 });
        // console.log("prev: ", prev);
        if (prev && prev.status === "success") {
            throw Error("Payment already made");
        }
        if (query.amount !== 500) {
            throw Error("Amount must be 500");
        }
        const payment = await completePayment(query);
        if (!payment) {
            throw Error("Couldnt complete payment");
        }
        else
            return payment;
    }
    catch (e) {
        console.log("From payment.services.makePayment: ", e);
        throw Error(e);
    }
};

// Get payment
exports.getPayment = async (query) => {
    try {
        const payment = await Payment.findOne({ email: query.email, year: query.year, month: query.month, status: "success" });
        if (!payment) {
            return {message: "No payment found"};
        }
        else
            return payment;
    } catch (e) {
        console.log("From payment.services.getPayment: ", e);
        throw Error(e);
    }
};

// Get all payments
exports.getAllPayments = async (query) => {
    try {
        const payments = await Payment.find({ email: query.email}).sort({ createdAt: -1 });
        if (!payments) {
            throw Error("Couldnt get payments");
        }
        return payments;
    }
    catch (e) {
        console.log("From payment.services.getAllPayments: ", e);
        throw Error(e);
    }
};
