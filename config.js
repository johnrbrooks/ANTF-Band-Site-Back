const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    MONGODB_URI_LOCAL: process.env.MONGODB_URI_LOCAL,
    MONGODB_URI_PROD: process.env.MONGODB_URI_PROD,
    DEV: process.env.DEV,
    PORT: process.env.PORT,
    ORIGIN: process.env.ORIGIN,
};
