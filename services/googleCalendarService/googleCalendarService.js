const { google } = require('googleapis');
const dotenv = require('dotenv');

dotenv.config();

const convertTime12to24 = (time12h) => {
    // input = 9:30pm
    let modifierIndex;

    if (time12h.includes('pm')) {
        modifierIndex = time12h.indexOf('p');
    } else {
        modifierIndex = time12h.indexOf('a');
    }

    time12h =
        time12h.slice(0, modifierIndex) + ' ' + time12h.slice(modifierIndex);

    const [time, modifier] = time12h.split(' ');
    let [hours, minutes] = time.split(':');

    if (hours === '12') {
        hours = '00';
    }

    if (modifier === 'pm') {
        hours = parseInt(hours, 10) + 12;
    }

    const time24h = `${hours.toString().padStart(2, '0')}:${minutes}`;

    return time24h;
};

const convertDateFormat = (date, time) => {
    // split and convert time value "9:30pm - 1:00am"
    let startTime = time.split('-')[0].trim();
    let endTime = time.split('-')[1].trim();

    startTime = convertTime12to24(startTime);
    endTime = convertTime12to24(endTime);

    // create ISO strings from isolated time + date values
    const startDateTime = new Date(`${date} ${startTime}`);
    const endDateTime = new Date(`${date} ${endTime}`);

    // Overnight show handling: e.g. 9:30pm - 1:00am
    if (endDateTime <= startDateTime) {
        endDateTime.setDate(endDateTime.getDate() + 1);
    }

    return {
        startTime: startDateTime.toISOString(),
        endTime: endDateTime.toISOString(),
    };
};

const GOOGLE_REDIRECT_URI =
    process.env.DEV === 'true'
        ? process.env.GOOGLE_REDIRECT_URI_DEV
        : process.env.GOOGLE_REDIRECT_URI_PROD;

function getOAuthClient() {
    const client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        GOOGLE_REDIRECT_URI,
    );

    client.setCredentials({
        refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    });

    console.log(client);

    return client;
}

function getCalendarClient() {
    return google.calendar({
        version: 'v3',
        auth: getOAuthClient(),
    });
}

function normalizeVenueName(venue) {
    switch (venue) {
        case 'The Light Horse':
            venue = 'LIGHT HORSE';
            return venue;
            break;
        case 'Sauf Haus':
            venue = 'SAUF HAUS';
            return venue;
            break;
        case "Daniel O'Connell's":
            venue = "O'CONNELL'S";
            return venue;
            break;
        case 'Crossroads':
            venue = 'CROSSROADS';
            return venue;
            break;
        case "O'Sullivan's Irish Pub":
            venue = "O'SULLIVAN'S";
            return venue;
            break;
        case 'The Renegade':
            venue = 'THE RENEGADE';
            return venue;
            break;
        default:
            return venue;
    }
}

async function createCalendarEvent(event) {
    let { venue, location, date, time, cover, pay } = event;
    venue = normalizeVenueName(venue);

    const { startTime, endTime } = convertDateFormat(date, time);

    const eventPayload = {
        summary: venue,
        location,
        description: pay
            ? `Pay: $${pay} - Cover Charge: ${cover}`
            : `Cover Charge: ${cover}`,
        start: {
            dateTime: startTime,
            timeZone: 'America/New_York',
        },
        end: {
            dateTime: endTime,
            timeZone: 'America/New_York',
        },
    };
    try {
        const calendar = getCalendarClient();

        const response = await calendar.events.insert({
            calendarId: 'primary',
            requestBody: eventPayload,
        });

        return response.data;
    } catch (error) {
        console.error(
            'Failed to create Google Calendar event:',
            error.response?.data || error.message || error,
        );

        return null;
    }
}

module.exports = {
    createCalendarEvent,
};
