const productController = require ('../controllers/productController')
const express = require ('express');
const routerProduct = express.Router();

routerProduct.get('/create', productController.create );
routerProduct.get('/:id', productController.detail);

module.exports = routerProduct;