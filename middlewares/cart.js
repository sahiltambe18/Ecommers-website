const Cart = require('../models/cart.model');


function initializeCart(req, res, next) {
    let cart;
    if (!req.session.cart) {
        cart = new Cart();
    }
    else {
        const sesCart = req.session.cart;
        cart = new Cart(sesCart.items, sesCart.totalQuantity, parseInt(sesCart.totalPrice));
    }
    res.locals.cart = cart;
    next();
}

module.exports = initializeCart;