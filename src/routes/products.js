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

// requerimiento de express validator

const { body } = require('express-validator');

const validations = [
    body('name').notEmpty().withMessage('Debes colocar un nombre al NFT'),
    body('url').notEmpty().withMessage('Debes subir tu nft a IPFS y copies tu enlace acá'),
    body('priceeth').notEmpty().withMessage('Debes colocar tu valor en ETH, lo puedes cambiar cuando quieras'),
    body('description').notEmpty().withMessage('Ingresa una breve descripción del NFT que venderas'),
    body('category').notEmpty().withMessage('Debes seleccionar una categoria para tu NFT'),
    body('img').custom((value, {req}) => {
        let file = req.file;
        let acceptedextensions = ['.jpg', '.jpeg', '.png', '.gif'];
        

        if(!file) {
            throw new Error("Tienes que subir una imagen");
        } else {
            let fileextensions = path.extname(file.originalname);

            if(!acceptedextensions.includes(fileextensions)){
                throw new Error(`las extensiones permitidas son ${acceptedextensions.join(', ')}`);
            }

        }
        
        return true;
    })
]

const productsController = require ('../controllers/productsController')

//Obtener todos los productos para la vista products
router.get('/',productsController.index);
/* //Crear todos los productos producto
router.get('/', productsController.index); */
// Ruta para buscar
router.get('/search', productsController.search);
//Crear un producto
router.get('/create', authMiddleware, productsController.create);
router.post('/', upload.single("img"), validations , productsController.store);
//Obtener un producto
router.get('/:id', productsController.detail);
/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productsController.edit);
router.patch('/edit/:id', upload.single("img"), validations,  productsController.update); 
//Ruta para deshabilitar productos
router.delete('/delete/:id', productsController.disable);


module.exports = router;