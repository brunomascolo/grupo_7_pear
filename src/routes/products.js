const express = require ('express');
const router = express.Router();
const multer = require('multer');
const path = require("path");


//Configurar multer
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/img/images')
    },
    filename: function(req, file, cb){
        cb(null, "nft_" + Date.now() + path.extname(file.originalname))
    },
});

const upload = multer({storage: storage});

const productsController = require ('../controllers/productsController')

//Obtener todos los productos para la vista products
router.get('/', productsController.index);
//Crear todos los productos producto
router.get('/', productsController.index);
//Crear un producto
router.get('/create', productsController.create);
router.post('/', upload.single("imgnft"), productsController.store);
//Obtener un producto
router.get('/:id', productsController.detail);
/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productsController.edit);
router.patch('/edit/:id', productsController.update);  

module.exports = router;