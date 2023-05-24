const Product = require("../models/product.model");

async function addItem(req,res, next) {
    let product;
    
    try {
        product = await Product.findId(req.body.productId)
    } catch (error) {
        next(error);
        return;
    }
    
    const cart = res.locals.cart;
    cart.addCartItem(product);
    req.session.cart = cart;
    res.status(201).json({
        message:"cart updated!!..",
        newTotalItems: cart.totalQuantity
    })

}

function getCart(req,res) {
    res.render('customer/cart/cart')
}


async function updateCartItem(req,res) {
    const cart = res.locals.cart;
    const updatedItemData = await cart.updateItem(req.body.productId , req.body.quantity);
    req.session.cart = cart;
    res.json({
        message:"item updated!!",
        updatedItemData:{
            newTotalQuantity: cart.totalQuantity,
            newTotalprice:cart.totalPrice,
            updatedItemPrice: updatedItemData.updatedItemPrice
        }
    })
}

module.exports = {
    addItem:addItem,
    getCart:getCart,
    updateCartItem:updateCartItem
}