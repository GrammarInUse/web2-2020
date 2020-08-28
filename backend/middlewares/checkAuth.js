const Accounts = require("../models/accounts");
require('dotenv').config();
const jwt = require("jsonwebtoken");
const Staffs = require("../models/staffs");
const rateLimit = require('express-rate-limit');
const { SECRET_KEY } = require("../configs/config");

const apiKey = SECRET_KEY;


const checkAuthCustomer = (req, res, next) => {
  try {
    const bearerHeader = req.headers["authorization"];
    console.log(bearerHeader);
    jwt.verify(bearerHeader,apiKey , async (err, data) => {
      //console.log("DATAAAAAAAAAAAAA:");
      //console.log(data);
      if (err) {
        return res.status(404).json({
          userMessage: "You haven't logged in... sorry about that!",
          error: err,
        });
      }
      const username = data.username;
      const currentUser = await Accounts.findAll({
        where: {
          username,
        },
      });
      if (
        currentUser.length >= 1 &&
        currentUser[0].username === data.username
      ) {
        next();
      } else {
        res.status(401).json({
          message: "You haven't logged in... sorry about that!!!",
        });
      }
    });
  } catch (error) {
    console.log("Something went wrong when you verify token! " + error);
    res.status(401).json({
      message: "You haven't logged in... sorry about that!",
    });
  }
};

const checkAuthStaff = async (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(400).json({ error: "Token not provided" });
  }
  try {
    const decoded = jwt.verify(token.split(' ')[1].toString(), apiKey);

    const staff = await Staffs.findByPk(decoded.id);
    if (staff) {
      req.user = {
        id: staff.accountId,
        decentralizationId: staff.decentralizationId,
      };
      next();
    }
    next();
  } catch (error) {
    res.status(401).json({ error: "Authentication Failed ! " + error });
  }
};

const loginAccountLimiter = rateLimit({
  // 1 hour window
    windowMs: 60 * 60 * 1000, 
  // start blocking after 5 requests
    max: 5, 
    message: "Too many accounts login from this IP, please try again after an hour"
  });

module.exports = {
  checkAuthCustomer,
  checkAuthStaff,
  loginAccountLimiter
};
