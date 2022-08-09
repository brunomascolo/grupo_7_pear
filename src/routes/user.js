const express = require ('express');
const router = express.Router();
const multer = require('multer');
const path = require("path");
const bcrypt = require('bcryptjs')
const guestMiddleware = require("../middlewares/guestMiddleware")
const authMiddleware = require("../middlewares/authMiddleware")
const authAdminMiddleware = require("../middlewares/authAdminMiddleware")
const validateForm = require ("../middlewares/userRegisterMiddleware")

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

router.get('/login', guestMiddleware, userController.login);
router.get('/register', guestMiddleware,userController.register);
router.post('/', upload.single("img"), userController.store);
router.post('/login', userController.loginProcess);
router.post("/register", userController.register);
router.get("/profile", authMiddleware, userController.profile);
router.get('/logout', userController.logout);
router.get('/edit/:id', authMiddleware, userController.edit);
router.patch('/edit/:id', upload.single("img"), userController.update);
router.get('/', authMiddleware, authAdminMiddleware, userController.list);



module.exports = router;