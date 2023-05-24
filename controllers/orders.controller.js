const Order = require('../models/order.model');
const User = require('../models/user.model');

async function addOrder(req,res ,next) {
    const cart = res.locals.cart;
    let user;
    try {
        user = await User.findByid(res.locals.id);
        const order = new Order(cart ,user );
        await order.save();
    } catch (error) {
        next(error)
        return;
    }
    req.session.cart= null;
    res.redirect('/orders');    
}

async function getOrder(req,res , next) {
    try {
        const orders = await Order.findAllForUser(res.locals.id);
        res.render('customer/orders/allorders' , {orders:orders});
    } catch (error) {
        next(error);
    }
}

module.exports = {
    addOrder:addOrder,
    getOrder:getOrder
}