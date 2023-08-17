const express = require("express");
const Router = express.Router();

const ContactFormRouter = require('./ContactFormRouter')

Router.use('/forms', ContactFormRouter)

module.exports = Router;