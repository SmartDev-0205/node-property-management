const jwt = require("jsonwebtoken");

const User = require('../models/user.model');

const Messages = require('../config/messages.js');
const Config = require('../config/config.js');


const auth = async (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
    console.log("bearerHeader:", bearerHeader)

  if (!bearerHeader) {
    return res.status(408).send({
        result: false,
        error: Messages.TOKEN_INVALID,
      }) 
  }

  const bearer = bearerHeader.split(' ');
  const bearerToken = bearer[1];

  try {
    let decoded = jwt.decode(bearerToken, Config.JWT_SECRET)
    console.log("decoded:", decoded)
    req.currentUserId = decoded["id"];
    req.user = await User.findById(decoded["id"]);
    return next();
  }
  catch (err) {
    if (err.toString().includes("expired")) {
      return res.status(408).send({
        result: false,
        error: Messages.TOKEN_EXPIRED,
      }) 
    } else {
      return res.status(408).send({
        result: false,
        error: Messages.TOKEN_INVALID,
      }) 
    }
  }
};

module.exports = auth;
