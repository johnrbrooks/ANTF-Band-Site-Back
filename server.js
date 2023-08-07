const express = require("express");
const Router = require("./routes/AppRouter");
const cors = require("cors");
const db = require("./db");

const { PORT, ORIGIN } = require("./config");
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", Router);

const server = app.listen(PORT, () =>
  console.log(`Application is listening on port ${PORT}.`)
);