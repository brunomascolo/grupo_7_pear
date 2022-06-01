const express = require ('express');
const router = express.Router();

const productsController = require ('../controllers/productsController')

//Obtener todos los productos para la vista products
router.post('/', productsController.index);
//Crear todos los productos producto
router.get('/', productsController.index);
//Crear un producto
router.get('/create', productsController.create);
//Obtener un producto
router.get('/:id', productsController.detail);
/*** EDIT ONE PRODUCT ***/ 
router.get('/:id/edit', productsController.edit);

module.exports = router;