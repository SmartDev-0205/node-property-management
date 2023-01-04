const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dbConfig = require('./config/database.config.js');
const logger = require('morgan');
const path = require('path');
const router = express.Router();

// Import Routers.
const userRoute = require('./routes/user.route');
const propertyRoute = require('./routes/property.route');

const mongoose = require('mongoose');
mongoose.connect(dbConfig.url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
process.exit();
});

// initialize our express app
const app = express();
app.use(cors());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(express.static('frontend/dist'));
app.use('/uploads', express.static('uploads'));

app.use(session({
    key: 'user_sid',
    secret: 'somerandonstuffs',
    resave: true,
    saveUninitialized: true,
    cookie: {
        expires: 600000
    }
}));

app.use('/user', userRoute);
app.use('/property', propertyRoute);

app.use('/', router);

const server = app.listen(process.env.PORT || 5000, async () => {
    console.log('Server is up and running on port numner');
});