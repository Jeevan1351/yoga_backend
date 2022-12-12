// const userController = require('../controllers/user.controller');
// const middleLogger = require('../helpers/middleLogger');
const authenticateToken = require('../helpers/authenticateToken');

module.exports = (app) => {

    // get time slots
    app.post('/time-slots', authenticateToken, timeSlotController.getTimeSlots);
    
    // book time slot
    app.post('/time-slots/book', authenticateToken, timeSlotController.bookTimeSlot);

    // cancel time slot
    app.post('/time-slots/cancel', authenticateToken, timeSlotController.cancelTimeSlot);

}