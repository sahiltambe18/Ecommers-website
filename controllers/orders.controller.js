const dotenv=require("dotenv").config()
const stripe = require("stripe")(process.env.STRIPE_ID);

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

    const session = await stripe.checkout.sessions.create({
        line_items: cart.items.map( (item)=>{
            return {
                // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                price_data:{
                    currency:'inr',
                    product_data:{
                        name:item.product.title,
                    },
                    unit_amount_decimal: +item.product.price
                },
                quantity:item.quantity
              }
        }),

        mode: 'payment',
        success_url: `https://sahil-ecommerce-website.onrender.com/orders/success`,
        cancel_url: `https://sahil-ecommerce-website.onrender.com/orders/failure`,
      });
    
      res.redirect(303, session.url);
    

    // res.redirect('/orders');    
}

async function getOrder(req,res , next) {
    try {
        const orders = await Order.findAllForUser(res.locals.id);
        res.render('customer/orders/allorders' , {orders:orders});
    } catch (error) {
        next(error);
    }
}

function getSuccess(req,res) {
    res.render('customer/orders/success')
}

function getFailure(req,res) {
    res.render('customer/orders/failure')
}

module.exports = {
    addOrder:addOrder,
    getOrder:getOrder,
    getSuccess:getSuccess,
    getFailure:getFailure
}