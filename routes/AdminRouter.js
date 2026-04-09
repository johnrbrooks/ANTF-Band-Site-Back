const express = require('express');
const Router = express.Router();
const controller = require('../controllers/adminController');

// DEBUG ROUTES
// Router.get('/get/:email', controller.getAdmin);
// Router.get('/get', controller.getAdmins);

Router.get('/checkAuth', controller.checkAuth);

Router.post('/login', controller.loginAdmin);
Router.post('/logout', controller.logoutAdmin);

// temporary route to create the admin
// Router.post('/createAdmin', controller.createAdmin);

module.exports = Router;
