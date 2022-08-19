const express = require('express');
const router = express.Router();
const usertAPIController = require('../../controllers/api/userApi');

//Listado de nft
router.get('/', usertAPIController.list);
//Detalle de nft
router.get('/:id', usertAPIController.detail);

module.exports = router;