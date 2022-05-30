const mainController = require ('../controllers/mainController')
const express = require ('express');
const routerMain = express.Router();

routerMain.get('/', mainController.index);
routerMain.get('/cart',mainController.cart);

module.exports = routerMain;