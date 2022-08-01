const express = require ('express');
const router = express.Router();
const multer = require('multer');
const path = require("path");
const bcrypt = require('bcryptjs')
const guestMiddleware = require("../middlewares/guestMiddleware")
const authAdminMiddleware = require("../middlewares/authAdminMiddleware")

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

const adminController = require ('../controllers/adminController')

router.get('/login', guestMiddleware, adminController.login);
router.post('/login', adminController.loginProcess);
router.get("/profileAdmin", authAdminMiddleware, adminController.profile);
/* router.get('/register', guestMiddleware,userController.register);
router.post('/', upload.single("img"), userController.store);
router.get("/profile", authMiddleware, userController.profile);
router.get('/logout', userController.logout); */

module.exports = router;