const mongoose = require("mongoose");

// User Schema
const ServerLogSchema = new mongoose.Schema(
  {
    user: Object,
    server: String,
    url: String,
    method: String,
    action: Object,
    resBody: Object,
    response: Object
  },
  { timestamps: true }
);

const ServerLog = mongoose.model("ServerLog", ServerLogSchema);

module.exports = ServerLog;