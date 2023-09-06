const express = require('express')
const Router = express.Router()
const controller = require('../controllers/adminController')

Router.get('/get/:email', controller.getAdmin)

module.exports = Router