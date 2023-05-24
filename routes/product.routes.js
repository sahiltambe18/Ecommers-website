const express = require('express');

const productController = require('../controllers/product.controller');

const router = express.Router();

router.get("/products",productController.getProducts);

router.get("/products/card",(req,res)=>{
    res.render("customer/products/product-card")
})


module.exports = router;