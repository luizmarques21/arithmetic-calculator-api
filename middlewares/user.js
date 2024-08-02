const { handleExceptions } = require("../libs/utils");
const Joi = require("joi");
const jwt = require('jsonwebtoken');

const userService = require('../services/user');
const userStatusEnum = require('../enums/userStatus');

module.exports = {
    async checkUserLogin(req, res, next) {
        try {
          const data = {
              username: req.body.username,
              password: req.body.password,
          };
          const schema = Joi.object({
            username: Joi.string().email().required(),
            password: Joi.string().required()
          });
          const { error } = schema.validate(data);
          if (error) throw (error.details);
              
          const user = await getUserByUsername(data.username);
          if (!user) throw `User not found with the email: ${data.username}`;
              
          if (user.status === userStatusEnum.INACTIVE) throw `User inactive`;
          res.locals.user = user;
          next();
        } catch (err) {
          handleExceptions(err, res);
        }
    },
    async handleAuth(req, res, next) {
      let isValid = true;
      const token = req.headers.authorization.replace('Bearer ', '');
      const secret = process.env.APP_AUTH_HASH;
      
      if (!token) {
        res.status(401).send("Unauthorized: No token provided");
      } else {
        jwt.verify(token, secret, function (err, decoded) {
          if (err) {
            console.log(err);
            isValid = false;
          } else {
            res.locals.loggedUsername = decoded.user.username;
          }
        });
      }
  
      if (!isValid) {
        res.status(401).send("Unauthorized: Invalid token");
      } else {
        next();
      }
    },
}

async function getUserByUsername(username) {
    try {
      const user = await userService.findByUsername(username);
      return user || false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }