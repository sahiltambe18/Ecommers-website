const express = require('express');
const ordersController = require('../controllers/orders.controller')
const router = express.Router();

router.post("/",ordersController.addOrder);

router.get('/',ordersController.getOrder);

module.exports = router;