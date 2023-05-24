const express = require('express');
const adminController = require('../controllers/admin.controller');
const imageuploadMiddleware = require('../middlewares/img-upload');
const router = express.Router();

router.get('/products',adminController.getProducts);

router.post('/products',imageuploadMiddleware,adminController.getcreateNewProduct);

router.get('/products/new',adminController.getNewProducts);

router.get('/products/:id',adminController.getUpdateform);

router.post('/products/:id',imageuploadMiddleware,adminController.getUpdateProduct);

router.delete('/products/:id',adminController.getDeleteProduct);

router.get('/orders', adminController.getOrders);

router.patch('/orders/:id', adminController.updateOrder);

module.exports = router;