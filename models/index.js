const mongoose = require("mongoose");

const adminSchema = require("./admin");
const contactFormSchema = require("./contactForm.js");

const Admin = mongoose.model("Admin", adminSchema);
const ContactForm = mongoose.model("ContactForm", contactFormSchema);

module.exports = {
  Admin,
  ContactForm,
};