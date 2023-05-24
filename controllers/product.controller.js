const Product = require("../models/product.model");

async function getProducts(req,res,next) {
    try {
        const products = await Product.find();
        
        res.render("customer/products/allproducts" , {products:products})
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getProducts:getProducts
}