const User = require("../models/user.model");
const validation = require("../utils/validation");
const flasher = require("../utils/session-flash");

function signup(req, res) {
    let data = flasher.getFlashedData(req)
    if (!data) {
        data={
            email:'',
            password:'',
            name:'',
            address:'',
            postal:''
        }
    }
    res.render('customer/auth/signup',{data:data})
}

async function signupPost(req, res, next) {
    const userData = req.body;
    let user = new User(userData.email, userData.password, userData.name, userData.address, userData.postal);
    if (!validation.validate(user)) {
        console.log("invalid credentials")
        flasher.flashedData(req, {
            message: "invalid credentials please check again"
            , ...userData
        }, () => {
            res.redirect("/signup")
        })
        return;
    }

    try {

        if (! await validation.newUser(user.email)) {

            flasher.flashedData(req, {
                message: "user with this email already exists",
                ...userData
            }, () => {

                res.redirect("/signup")
            })
            return;
        }
        await user.signup();
    } catch (error) {
        return next(error)
    }

    res.redirect("/login");
}

function login(req, res) {
    let data =  flasher.getFlashedData(req)
    if (!data) {
        data = {
            email:'',
            password:''
        }
    }
    res.render('customer/auth/login',{data:data})
}

async function loginPost(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    let user = new User()
    let userAccount;
    try {
        userAccount = await user.finduser(email)
    } catch (error) {
        return next(error)
    }
    if (!userAccount) {
        console.log("user not found")
         flasher.flashedData(req, {
            message: "user not found",
            email: email,
            password: password
        }, () => {
            res.redirect("/login")
        })
        return;
    }
    else {
        if (!await user.checkPass(password, userAccount.password)) {
            console.log("password incorrect")
            flasher.flashedData(req, {
                message: "password incorrect",
                email: email,
                password:''
            }, () => {
                res.redirect("/login")
            })
        }
        else {
            console.log("login succesfull")
            req.session.uid = userAccount._id.toString()
            req.session.isAdmin = userAccount.isAdmin
            req.session.save(() => {
                res.redirect("/products")
            })
        }
    }
}

function logout(req, res) {
    res.locals.id = null;
    res.locals.isAuth = false
    req.session.uid = null
    console.log("logout succesfully")
    res.redirect("/login")
}

module.exports = {
    getSignup: signup,
    getLogin: login,
    getSignupPost: signupPost,
    getLoginPost: loginPost,
    getLogout: logout
};