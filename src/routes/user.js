const express = require ('express');
const router = express.Router();
const multer = require('multer');
const path = require("path");

//Configurar multer
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/img/images/users')
    },
    filename: function(req, file, cb){
        cb(null, "user_" + Date.now() + path.extname(file.originalname))
    },
});

const upload = multer({storage: storage});

const userController = require ('../controllers/userController')

router.get('/login', userController.login);
router.get('/register', userController.register);
router.post('/', upload.single("img"), userController.store);

module.exports = router;