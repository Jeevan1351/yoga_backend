// Importing mongoose - MongoDB object modeling tool designed to work in an asynchronous environment.
const mongoose = require("mongoose");
// This is to avoid deprecation warnings
mongoose.set('strictQuery', true);
const uri = process.env.MONGO_URI
// This function is to connect to the database
mongoose.connect(uri).then(() => {
  console.log("DataBase connection successful");
});