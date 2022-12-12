// Description: This is the main file of the application

// Mandatory imports
const express = require("express");
const cors = require("cors");
// initialize environment variables present in .env file in the root directory
require("dotenv").config();
const bodyParser = require("body-parser");

// Express application setup
const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    parameterLimit: 100000000,
    extended: true,
  })
);

// CORS setup
app.use(
  cors({
    origin: "*",
  })
);

// configure router
const router = express.Router();
app.use("/yoga", router);

//Connect To DataBase
require("./db/db");

router.get("/", async (req, res) => {
  res.send({
    message: "all good here",
    application: "yoga-app",
  });
});

// Routes for all purposes

// Routes for user
require("./routes/user.routes")(router);

// Routes for time slots
require("./routes/timeSlot.routes")(router);


app.listen(process.env.PORT, () => {
  console.log("Listening to port ", process.env.PORT);
});
