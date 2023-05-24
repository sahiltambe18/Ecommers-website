const express = require('express');

const cartController = require("../controllers/cart.controller");

const router = express.Router();

router.post("/cart/additem" , cartController.addItem );

router.get("/cart/viewcart" ,cartController.getCart);

router.patch('/cart/items',cartController.updateCartItem);

module.exports = router;