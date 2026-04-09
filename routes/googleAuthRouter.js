const express = require('express');
const {
    createOAuthClient,
    SCOPES,
} = require('../services/googleCalendarService/auth');
const Router = express.Router();

Router.get('/google', (req, res) => {
    const oauth2Client = createOAuthClient();

    const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
        scope: SCOPES,
        state: 'calendar-boostrap',
    });

    res.redirect(authUrl);
});

Router.get('/google/callback', async (req, res) => {
    try {
        const { code, error } = req.query;

        if (error) {
            return res.status(400).send(`Google OAuth error: ${error}`);
        }

        if (!code) {
            return res.status(400).send('Missing authorization code');
        }

        const oauth2Client = createOAuthClient();
        const { tokens } = await oauth2Client.getToken(code);

        console.log('Google OAuth tokens:', {
            refresh_token: tokens.refresh_token || null,
            access_token_present: !!tokens.access_token,
            expiry_date: tokens.expiry_date || null,
            scope: tokens.scope || null,
        });

        if (!tokens.refresh_token) {
            return res
                .status(200)
                .send(
                    'Authorized, but no refresh token was returned. Revoke app access in Google and try again with prompt=consent.',
                );
        }

        res.send(
            `Authorization successful. Save this refresh token in your backend env:\n\n${tokens.refresh_token}`,
        );
    } catch (error) {
        console.error('Google OAuth callback failure:', error);
        res.status(500).send(
            'Failed to exchange authorization code for tokens.',
        );
    }
});

module.exports = Router;
