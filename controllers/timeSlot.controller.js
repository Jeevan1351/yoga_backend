const timeSlotServices = require('../services/timeSlot.services');

// get time slots
exports.getTimeSlots = async (req, res) => {
    try {
        // console.log(req.body);
        const data = await timeSlotServices.getTimeSlots(req.body);
        if (data !== null) {
            return res.status(200).json({
                status: 200,
                data: data,
                message: "Time slots fetched successfully",
            });
        } else {
            return res.status(400).json({
                status: 400,
                message: "Time slots not fetched",
            });
        }
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

// get all time slots
exports.getAllTimeSlots = async (req, res) => {
    try {
        const data = await timeSlotServices.getAllTimeSlots(req.body);
        if (data !== null) {
            return res.status(200).json({
                status: 200,
                data: data,
                message: "All time slots fetched successfully",
            });
        } else {
            return res.status(400).json({
                status: 400,
                message: "All time slots not fetched",
            });
        }
    }
    catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

// book time slot
exports.bookTimeSlot = async (req, res) => {
    try {
        const data = await timeSlotServices.bookTimeSlot(req.body);
        if (data !== null) {
            return res.status(200).json({
                status: 200,
                data: data,
                message: "Time slot booked successfully",
            });
        } else {
            return res.status(400).json({
                status: 400,
                message: "Time slot not booked",
            });
        }
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

// cancel time slot
exports.cancelTimeSlot = async (req, res) => {
    try {
        const data = await timeSlotServices.cancelTimeSlot(req.body);
        if (data !== null) {
            return res.status(200).json({
                status: 200,
                data: data,
                message: "Time slot cancelled successfully",
            });
        } else {
            return res.status(400).json({
                status: 400,
                message: "Time slot not cancelled",
            });
        }
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}