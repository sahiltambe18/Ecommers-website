const db = require('../data/database');
const mongodb = require("mongodb");

class Product {
    constructor(productData) {
        this.title = productData.title;
        this.image = productData.image;
        this.description = productData.description;
        this.summary = productData.summary;
        this.price = productData.price;
        this.updateImageData();
        if (productData._id) {
            this.id = productData._id.toString();
        }
    }

    static async find() {
        let products = await db.getDb().collection('products').find().toArray();
        return products.map((product) => {
            return new Product(product)
        })
    };

    static async findId(prodId) {
        let productId
        let product
        try {

            productId = new mongodb.ObjectId(prodId);
            product = await db.getDb().collection("products").findOne({ _id: productId });
        } catch (error) {
            error.code = 404;
            throw error;
        }
        if (!product) {
            const error = new Error("could not find product")
            error.code = 404;
            throw error;
        }
        return new Product(product);
    }

    async addProduct() {
        await db.getDb().collection("products").insertOne({
            title: this.title,
            image: this.image,
            description: this.description,
            summary: this.summary,
            price: this.price
        })
    }

    async replacelmage(newlmage) {
        this.image = newlmage;
        this.updateImageData();
    }
    updateImageData() {
        this.imagePath = `files/images/${this.image}`;
        this.imageUrl = `/products/assets/images/${this.image}`;
    }

    async updateProduct() {
        let objId
        try {
            objId = new mongodb.ObjectId(this.id)
            await db.getDb().collection("products").updateOne({ _id: objId }, {
                $set: {
                    title: this.title,
                    image: this.image,
                    description: this.description,
                    summary: this.summary,
                    price: this.price
                }
            })
        } catch (error) {
            throw error
        }
    }
    static async remove(pid) {
        let prodId
        try {
            prodId = new mongodb.ObjectId(pid)
            await db.getDb().collection('products').deleteOne({ _id: prodId })
        } catch (error) {
            throw error
        }
    }

}

module.exports = Product;