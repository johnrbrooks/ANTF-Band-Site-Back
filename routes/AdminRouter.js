const express = require('express');
const Router = express.Router();
const controller = require('../controllers/adminController');

Router.get('/get/:email', controller.getAdmin);

// temporary route to create the admin
Router.post('/createAdmin', controller.createAdmin);

module.exports = Router;
