const bcrypt = require('bcryptjs');
const db = require('../data/database');
const flasher = require("../utils/session-flash");
const mongodb = require('mongodb');
class User {
    constructor(email, password, name, address, postal) {
        this.email = email
        this.password = password
        this.name = name
        this.Address = {
            address: address,
            postalcode: postal
        }
    }
    
    async signup() {
        const hashedpass = await bcrypt.hash(this.password, 12)
        await db.getDb().collection("user").insertOne({
            email: this.email,
            name: this.name,
            password: hashedpass,
            Address: this.Address
        })
    }

    async finduser(email) {
        return await db.getDb().collection("user").findOne({ email: email })
    }

    static async findByid(id){
        const userid = await new mongodb.ObjectId(id);
        return db.getDb().collection('user').findOne({ _id: userid }, { projection: { password: 0 } });
    }

    async checkPass(password, hashedpass) {
        const isCorrect = await bcrypt.compare(password, hashedpass)
        if (isCorrect) {
            return true
        } else {
            return false
        }
    }

}

module.exports = User;