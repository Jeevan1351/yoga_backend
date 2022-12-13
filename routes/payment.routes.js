const PaymentController = require('../controllers/payment.controller');
const authenticateToken = require('../helpers/authenticateToken');
const middleLogger = require('../helpers/middleLogger');

module.exports = (app) => {
    
        // Make payment
        app.post('/payments', authenticateToken(), middleLogger, PaymentController.makePayment);
    
        // Get payment
        app.post('/payments/get', authenticateToken(), middleLogger, PaymentController.getPayment);
    
        // Get all payments
        app.post('/payments/all', authenticateToken(), middleLogger, PaymentController.getAllPayments);
    
}