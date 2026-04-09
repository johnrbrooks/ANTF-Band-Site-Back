const mongoose = require('mongoose');

const adminSchema = require('./admin');
const contactFormSchema = require('./contactForm.js');
const songSchema = require('./song');
const showSchema = require('./show');
const venueSchema = require('./venue.js');

const Admin = mongoose.model('Admin', adminSchema);
const ContactForm = mongoose.model('ContactForm', contactFormSchema);
const Song = mongoose.model('Song', songSchema);
const Show = mongoose.model('Show', showSchema);
const Venue = mongoose.model('Venue', venueSchema);

module.exports = {
    Admin,
    ContactForm,
    Song,
    Show,
    Venue,
};
