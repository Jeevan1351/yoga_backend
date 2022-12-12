const timeSlotController = require('../controllers/timeSlot.controller');
// const middleLogger = require('../helpers/middleLogger');
const authenticateToken = require('../helpers/authenticateToken');

module.exports = (app) => {

    // get time slot
    app.post('/time-slots', authenticateToken(), timeSlotController.getTimeSlots);

    // get all time slots
    app.post('/time-slots/all', authenticateToken(), timeSlotController.getAllTimeSlots);

    // book time slot
    app.post('/time-slots/book', authenticateToken(), timeSlotController.bookTimeSlot);

    // cancel time slot
    app.post('/time-slots/cancel', authenticateToken(), timeSlotController.cancelTimeSlot);

}