const mongoose = require("mongoose");

const adminSchema = require("./admin");
const contactFormSchema = require("./contactForm.js");
const songSchema = require('./song')

const Admin = mongoose.model("Admin", adminSchema);
const ContactForm = mongoose.model("ContactForm", contactFormSchema);
const Song = mongoose.model("Song", songSchema)

module.exports = {
  Admin,
  ContactForm,
  Song,
};