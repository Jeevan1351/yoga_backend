const mongoose = require("mongoose");

// TimeSlot Schema
const TimeSlotSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    year: { type: Number, required: true },
    month: { type: Number, required: true },
    slot: { type: Number, required: true },
  },
  { timestamps: true }
);

TimeSlot.index({ email: 1, year: 1, month: 1 }, { unique: true });

const TimeSlot = mongoose.model("TimeSlot", TimeSlotSchema);

module.exports = TimeSlot;