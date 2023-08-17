const express = require('express')
const Router = express.Router()
const controller = require('../controllers/contactFormController')

Router.get('/get/all', controller.getAllForms)

Router.post('/create', controller.createForm)

module.exports = Router