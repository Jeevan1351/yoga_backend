const TimeSlot = require("../models/timeslots.model");
const User = require("../models/user.model");

// get time slots
exports.getTimeSlots = async (req) => {
    try {
        const data = await TimeSlot.find({
            email: req.email,
            year: req.year,
            month: req.month,
        });
        return data;
    } catch (e) {
        throw Error(e.message);
    }
}

// book time slot
exports.bookTimeSlot = async (req) => {
    try {
        const data = await TimeSlot.findOneAndUpdate(
            {
                email: req.email,
                year: req.year,
                month: req.month,
            },
            { slot: req.slot },
            { upsert: true, new: true }
        );
        return data;
    } catch (e) {
        throw Error(e.message);
    }
}

// cancel time slot
exports.cancelTimeSlot = async (req) => {
    try {
        const data = await TimeSlot.deleteOne({email: req.email, year: req.year, month: req.month});
        if (!data) {
            return null;
        }
        return data;
    }
    catch (e) {
        throw Error(e.message);
    }
}

// get all time slots
exports.getAllTimeSlots = async (req) => {
    try {
        const data = await TimeSlot.find({ email: req.email });
        if (!data) {
            return null;
        }
        return data;
    } catch (e) {
        throw Error(e.message);
    }
}