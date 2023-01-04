const jwt = require('jsonwebtoken');
const request = require('request');
var ObjectId = require('mongoose').Types.ObjectId;

// Load Models.
const User = require('../models/user.model');

const Messages = require('../config/messages.js');
const Config = require('../config/config.js');

async function registerUser(req, res) {
    const { 
        firstName, 
        lastName, 
        email,  
        phone,  
        isAdmin,  
        isActive,  
    } = req.body;

    // Check user is existing with same email already.
    if (email && email.length > 0) {
        const user = await User.findOne({email});
        if (user && user._id) {
            return res.status(501).send({
                result: false,
                error: Messages.ACCOUNT_EXISTING_BY_EMAIL,
            });
        }
    }

    let newUser = User();

    newUser.firstName = firstName
    newUser.lastName = lastName
    newUser.email = email
    newUser.phone = phone
    newUser.isAdmin = isAdmin
    newUser.isActive = isActive

    await newUser.save();

    // Generate Token.
    const token = jwt.sign({ id: newUser._id }, Config.JWT_SECRET, {});
    
    res.json({
        result: true,
        message: "user is created successfully",
        token,
    });
};

async function loginUser(req, res) {
    const { 
        email,  
        password,  
    } = req.body;

    // Check user is existing with same email already.
    if (email && email.length > 0) {
        const user = await User.findOne({email});
        if (!user || !user._id) {
            return res.status(501).send({
                result: false,
                error: Messages.EMAIL_NOT_EXIST,
            });
        }

        // Generate Token.
        const token = jwt.sign({ id: user._id }, Config.JWT_SECRET, {});
        
        res.json({
            result: true,
            message: "user login successfully",
            token,
        });
    } else {
        return res.status(501).send({
            result: false,
            error: Messages.EMAIL_NOT_EXIST,
        });
    }
};

module.exports = {
    registerUser,
    loginUser,
}