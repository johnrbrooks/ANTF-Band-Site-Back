const mongoose = require("mongoose");
const { MONGODB_URI_LOCAL, MONGODB_URI_PROD, DEV } = require("../config");

const MONGODB_URI = DEV === "true" ? MONGODB_URI_LOCAL : MONGODB_URI_PROD;

mongoose
    .connect(MONGODB_URI)
    .then(() => {
        if (DEV === "true") {
            console.log("Successfully connected to local MongoDB.");
        } else {
            console.log("Successfully connected to remote MongoDB.");
        }
    })
    .catch((e) => {
        console.log(`Connection Error: ${e.message}`);
    });

mongoose.set("debug", false);
mongoose.connection.on(
    "error",
    console.error.bind(console, "MongoDB Connection Error:"),
);

module.exports = mongoose.connection;
