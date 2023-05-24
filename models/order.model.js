const db = require('../data/database');
const mongodb = require('mongodb');

class Order {
    constructor(cart, userData, status = 'pending', date, orderId) {
        this.productData = cart;
        this.userData = userData;
        this.status = status;
        this.date = new Date(date);
        if (this.date) {
            this.formattedDate = this.date.toLocaleDateString('en-US', {
                weekday: 'short',
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            })
        }
        this.id = orderId;
    }
    save() {
        if (this.id) {
            //
        } else {
            const OrderDoc = {
                userData: this.userData,
                productData: this.productData,
                date: new Date(),
                status: this.status
            };
            return db.getDb().collection('orders').insertOne(OrderDoc);
        }
    }
    static transformDocument(orderDoc) {
        return new Order(
          orderDoc.productData,
          orderDoc.userData,
          orderDoc.status,
          orderDoc.date,
          orderDoc._id
        );
      }
    static transformOrderDocuments(orderDocs) {
        return orderDocs.map(this.transformDocument);
    }
    static async findAll() {
        const orders = await db.getDb().collection('orders').find().toArray();
        return this.transformOrderDocuments(orders);
    }

    static async findAllForUser(userId) {
        const uid = new mongodb.ObjectId(userId);
    
        const orders = await db
          .getDb()
          .collection('orders')
          .find({ 'userData._id': uid })
          .sort({ _id: -1 })
          .toArray();
    
        return this.transformOrderDocuments(orders);
      }

      static async findById(orderId) {
        const order = await db
          .getDb()
          .collection('orders')
          .findOne({ _id: new mongodb.ObjectId(orderId) });
    
        return this.transformDocument(order);
      }
}
module.exports = Order;