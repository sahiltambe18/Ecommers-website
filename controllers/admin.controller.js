const Product = require("../models/product.model");
const Order = require("../models/order.model");

async function getProducts(req, res, next) {
    try {
        const products = await Product.find();
        res.render("admin/products/all-products", { products: products });
    } catch (error) {
        next(error)
        return;
    }
}

function getNewProducts(req, res) {
    res.render("admin/products/new-products")
}

async function createNewProduct(req, res, next) {

    let product = new Product({
        ...req.body,
        image: req.file.filename
    });
    try {
        await product.addProduct();
    } catch (error) {
        next(error)
        return;
    }
    res.redirect("/admin/products")
}

async function updateform(req, res, next) {
    const productId = req.params.id;
    let product
    try {
        product = await Product.findId(productId);
        res.render("admin/products/update-product", { product: product })
    } catch (error) {
        next(error)
    }
}

async function updateProduct(req, res, next) {
    const product = new Product({
        ...req.body,
        _id: req.params.id
    });
    if (req.file) {
        product.replacelmage(req.file.filename)
    }
    try {
        await product.updateProduct();
        res.redirect("/admin/products");
    } catch (error) {
        next(error)
    }

}

async function deleteProduct(req, res, next) {
    try {
        await Product.remove(req.params.id)
    } catch (error) {
        next(error)
    }
    res.json({ message: "product deleted" });
}

async function getOrders(req, res, next) {
    try {
        const orders = await Order.findAll();
        res.render('admin/orders/admin-orders', {
            orders: orders
        });
    } catch (error) {
        next(error);
    }
}

async function updateOrder(req, res, next) {
    const orderId = req.params.id;
    const newStatus = req.body.newStatus;

    try {
        const order = await Order.findById(orderId);

        order.status = newStatus;

        await order.save();

        res.json({ message: 'Order updated', newStatus: newStatus });
    } catch (error) {
        next(error);
    }
}


module.exports = {
    getProducts: getProducts,
    getNewProducts: getNewProducts,
    getcreateNewProduct: createNewProduct,
    getUpdateform: updateform,
    getUpdateProduct: updateProduct,
    getDeleteProduct: deleteProduct,
    getOrders: getOrders,
    updateOrder: updateOrder
};
