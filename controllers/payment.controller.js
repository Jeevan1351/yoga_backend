const paymentServices = require('../services/payment.services');

// Make payment
exports.makePayment = async (req, res) => {
    try {
        const data = await paymentServices.makePayment(req.body);
        if (data !== null) {
            return res.status(200).json({
                status: 200,
                data: data,
                message: "Payment completed",
            });
        } else {
            return res.status(400).json({
                status: 400,
                message: "Payment not made",
            });
        }
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

// Get payment
exports.getPayment = async (req, res) => {
    try {
        const data = await paymentServices.getPayment(req.body);
        if (data !== null) {
            return res.status(200).json({
                status: 200,
                data: data,
                message: "Payment fetched successfully",
            });
        } else {
            return res.status(400).json({
                status: 400,
                message: "Payment not fetched",
            });
        }
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}


// Get all payments
exports.getAllPayments = async (req, res) => {
    try {
        const data = await paymentServices.getAllPayments(req.body);
        if (data !== null) {
            return res.status(200).json({
                status: 200,
                data: data,
                message: "All payments fetched successfully",
            });
        } else {
            return res.status(400).json({
                status: 400,
                message: "All payments not fetched",
            });
        }
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}