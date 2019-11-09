
const mongoose = require("mongoose");
const config = require('config');

mongoose.connect(process.env.MONGODB_URI || config.get("mongoDB"), {
  useNewUrlParser: true
});

const db = mongoose.connection;

db.on("connected", () => {
  console.log("mongo db successfully connected");
});
db.on("disconnected", () => {
  console.log("mongo db successfully disconnected");
});
db.on("error", () => {
  console.log("Error connecting to mongo db");
});


