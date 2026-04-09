const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    MONGODB_URI_LOCAL: process.env.MONGODB_URI_LOCAL,
    MONGODB_URI_PROD: process.env.MONGODB_URI_PROD,
    DEV: process.env.DEV,
    PORT: process.env.PORT,
    ORIGIN: process.env.ORIGIN,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URI_DEV: process.env.GOOGLE_REDIRECT_URI_DEV,
    GOOGLE_REDIRECT_URI_PROD: process.env.GOOGLE_REDIRECT_URI_PROD,
};
