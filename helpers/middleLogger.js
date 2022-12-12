const serverLog = require("../models/serverLogs.model");


const getActualRequestDurationInMilliseconds = (start) => {
  const NS_PER_SEC = 1e9; //  convert to nanoseconds
  const NS_TO_MS = 1e6; // convert to milliseconds
  const diff = process.hrtime(start);
  return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
};

const getFormattedDate = () => {
  let current_datetime = new Date();

  return (
    current_datetime.getFullYear() +
    "-" +
    (current_datetime.getMonth() + 1) +
    "-" +
    current_datetime.getDate() +
    " " +
    current_datetime.getHours() +
    ":" +
    current_datetime.getMinutes() +
    ":" +
    current_datetime.getSeconds()
  );
};

// Middleware function to log all requests
const middleLogger = async (req, res, next) => {
  //middleware function
  try {
    let formatted_date = getFormattedDate();
    let method = req.method;
    let url = req.url;
    let user = req.user;
    let reqBody = req.body;
    const start = process.hrtime();
    const durationInMilliseconds =
      getActualRequestDurationInMilliseconds(start);
    var action = { method, url, durationInMilliseconds, reqBody };
    
    if (user) {
      if (user.role === "admin") {
        var log = `[${formatted_date}] ADMIN ${method}:${url} ${user.email
          } ${durationInMilliseconds.toLocaleString()} ms`;
          var newServerLog = {
            user: req.user,
            server: process.env.SERVER_NAME,
            action: action,
            method,
            url,
          };
      } else if (user.role === "student") {
        var log = `[${formatted_date}] STUDENT ${method}:${url} ${user.email
          } ${durationInMilliseconds.toLocaleString()} ms`;
        var newServerLog = {
          user: req.user,
          server: process.env.SERVER_NAME,
          action: action,
          method,
          url,
        };

      }
    } else {
      var log = `[${formatted_date}] ${method}:${url} ${durationInMilliseconds.toLocaleString()} ms`;
      newServerLog = {
        user: "VJ",
        server: process.env.SERVER_NAME,
        url,
        method,
        action: action,
      };
    }
    req.action = action;
    console.log(log);
    let originalJson = res.json;
    res.json = async (status, jsonData) => {
      newServerLog['response'] = status
      newServerLog['resBody'] = jsonData
      var upload = new serverLog(newServerLog)
      await upload.save()
      originalJson.call(res, { ...jsonData, ...status })
    }
    next();
  } catch (e) {
    console.log(e);
  }
};

module.exports = middleLogger;