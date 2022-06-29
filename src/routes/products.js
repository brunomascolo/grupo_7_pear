const express = require ('express');
const router = express.Router();
const multer = require('multer');
const path = require("path");
const guestMiddleware = require("../middlewares/guestMiddleware")
const authMiddleware = require("../middlewares/authMiddleware")


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
router.get('/', authMiddleware,productsController.index);
/* //Crear todos los productos producto
router.get('/', productsController.index); */
//Crear un producto
router.get('/create', authMiddleware, productsController.create);
router.post('/', upload.single("img"), productsController.store);
//Obtener un producto
router.get('/:id', productsController.detail);
/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productsController.edit);
router.patch('/edit/:id', upload.single("img"), productsController.update); 
//Ruta para deshabilitar productos
router.delete('/delete/:id', productsController.disable);

module.exports = router;