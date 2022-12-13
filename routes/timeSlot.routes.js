const timeSlotController = require('../controllers/timeSlot.controller');
const authenticateToken = require('../helpers/authenticateToken');
const middleLogger = require('../helpers/middleLogger');

module.exports = (app) => {

    // get time slot
    app.post('/time-slots', authenticateToken(), middleLogger, timeSlotController.getTimeSlots);

    // get all time slots
    app.post('/time-slots/all', authenticateToken(), middleLogger, timeSlotController.getAllTimeSlots);

    // book time slot
    app.post('/time-slots/book', middleLogger, timeSlotController.bookTimeSlot);

    // cancel time slot
    app.post('/time-slots/cancel', authenticateToken(), middleLogger, timeSlotController.cancelTimeSlot);

}