const { google } = require('googleapis');

const SCOPES = ['https://www.googleapis.com/auth/calendar.events'];

function createOAuthClient() {
    return new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.GOOGLE_REDIRECT_URI_DEV,
        process.env.GOOGLE_REDIRECT_URI_PROD,
    );
}

module.exports = {
    SCOPES,
    createOAuthClient,
};
