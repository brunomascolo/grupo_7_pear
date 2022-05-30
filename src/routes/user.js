const userController = require ('../controllers/userController')
const express = require ('express');
const routerUser = express.Router();

routerUser.get('/login', userController.login);
routerUser.get('/register', userController.register);

module.exports = routerUser;