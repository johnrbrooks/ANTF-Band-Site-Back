const express = require("express");
const Router = require("./routes/AppRouter");
const cors = require("cors");
const db = require("./db");

const { PORT, ORIGIN } = require("./config");
const app = express();

const allowedOrigins = [
    "https://www.anighttoforget.com",
    "https://anighttoforget.com",
];

const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (Postman, curl, server-to-server, health checks)
        if (!origin) {
            return callback(null, true);
        }

        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));

app.options("*", cors(corsOptions));

app.use("/api", Router);

const server = app.listen(PORT, () =>
    console.log(`Application is listening on port ${PORT}.`),
);
