const Payment = require('../models/payments.model');

const completePayment = async (query) => {
    try {
        var payment = {email: query.email, year: query.year, month: query.month, amount: query.amount};
        var odds = Math.random() * (10 - 1) + 1;
        if (odds > 7) {
            payment.status = "success";
        }
        else {
            payment.status = "failed";
        }
        const newPayment = new Payment(payment);
        return newPayment.save();
    } catch (e) {
        console.log("From helper completePayment: ", e);
        throw Error(e);
    }
};

module.exports = completePayment;