const path = require('path');
const express = require('express');
const ejs = require('ejs');
const csurf = require('csurf');
const session = require('express-session');
const mongodbStore = require('connect-mongodb-session');

const baseRoutes = require('./routes/base.routes');
const authRoutes = require('./routes/auth.routes');
const productRoutes = require("./routes/product.routes");
const adminRoutes = require("./routes/admin.routes");
const cartRoutes = require("./routes/cart.routes");
const orderRoutes = require("./routes/orders.routes");

const db = require('./data/database');

const csrfToken = require('./middlewares/csrf-token');
const error500 = require("./middlewares/handle-error");
const checkAuthStatus = require("./middlewares/check-auth");
const protectRoutes = require("./middlewares/protect-routes");
const cartInitialiser = require("./middlewares/cart");

const MongodbStore = mongodbStore(session);

const sessionStore = new MongodbStore({
    uri: 'mongodb://127.0.0.1:27017',
    databaseName: "online-store",
    collection: "sessions"
});

const app = express();



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// app.use(express.static("public"));
app.use(express.static(__dirname + '/public'));
app.use("/products/assets/",express.static("files"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(session({
    resave: false,
    secret: "super-secret",
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60,
        sameSite: 'lax'
    }
}));


app.use(csurf());
app.use(csrfToken);

app.use(cartInitialiser);

app.use(checkAuthStatus);

app.use(baseRoutes);
app.use(authRoutes);
app.use(productRoutes);
app.use(cartRoutes);
     
app.use(protectRoutes);
app.use( '/admin',adminRoutes);
app.use('/orders' ,orderRoutes);
app.use(error500);

db.connectToDatabase()
    .then(
        () => { app.listen(3000, console.log("server is live at localhost:3000")) }
    )
    .catch((err) => {
        console.log("failed to connect database")
        console.log(err)
    }
    );
