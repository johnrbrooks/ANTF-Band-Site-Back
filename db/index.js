const mongoose = require("mongoose");
const { MONGO_PW } = require("../config");

let MONGODB_URI = `mongodb+srv://quark934:${MONGO_PW}@myfitnessplanner.jgvzdwg.mongodb.net/ANTF?retryWrites=true&w=majority`;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Successfully connected to remote MongoDB.");
  })
  .catch((e) => {
    console.log(`Connection Error: ${e.message}`);
  });

mongoose.set("debug", false);
mongoose.connection.on(
  "error",
  console.error.bind(console, "MongoDB Connection Error:")
);

module.exports = mongoose.connection;