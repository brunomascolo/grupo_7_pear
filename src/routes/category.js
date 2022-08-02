const express = require ('express');
const router = express.Router();
const multer = require('multer');
const path = require("path");
const guestMiddleware = require("../middlewares/guestMiddleware")
const authMiddleware = require("../middlewares/authMiddleware")


const categoriesController = require ('../controllers/categoriesController')

//Obtener todos los productos para la vista products
router.get('/',categoriesController.list);
router.get('/create', categoriesController.create);
router.post('/', categoriesController.store);



module.exports = router;
