const db = require('../data/database');

function emailValidator(email) {
    return (email && email.includes('@'))
}
function passValidator(password) {
    return (password && password.trim().length >= 6)
}

function addressValidator(name, Address) {
    return (name != '' && Address.address != '' && Address.postalcode != '')
}

async function newUser(email) {
    const user = await db.getDb().collection("user").findOne({ email: email })
    if (!user) {
        return true;
    }
    console.log("user already exists!!")
    return false;
}

function validate(userObj) {

    return (emailValidator(userObj.email) && passValidator(userObj.password) && addressValidator(userObj.name, userObj.Address))

}


module.exports = {
    validate,
    newUser
};