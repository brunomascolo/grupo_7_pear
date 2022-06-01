const express = require ('express');
const router = express.Router();

const mainController = require ('../controllers/mainController')

router.post('/', mainController.index);
router.get('/', mainController.index);
router.get('/cart',mainController.cart);

module.exports = router;