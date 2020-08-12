const express = require("express");
const Accounts = require("../../models/accounts");
const Staffs = require("../../models/staffs");
const informationUser = require("../../models/information-user");
const router = express.Router();
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const db = require("../../models/db");
const { Op } = require("sequelize");
const { isNull } = require("util");

router.get("/", async (req, res) => {
  const CustomerList = await Staffs.findAll();

  res.status(300).json({
    listOfCustomers: CustomerList,
  });
});

router.post("/", async (req, res) => {
  const id = Date.now();
  const username = req.body.username;
  const email = req.body.email;
  const password = await bcrypt.hash(req.body.password, 10);
  const verifyToken = crypto.randomBytes(3).toString("hex").toUpperCase();

  await Accounts.create({
    id,
    username,
    email,
    password,
    verifyToken,
    bankBranchId,
  })
    .then(() => {
      console.log("Successfully created an account!");
    })
    .catch((err) => {
      console.log("Something went wrong when you create an account!");
    });

  const fullName = req.body.fullName;
  const dOB = req.body.dOB;
  const sex = req.body.sex;
  const phone = req.body.phone;
  const accountId = id;
  const type = req.body.type;

  await Staffs.create({
    fullName,
    dOB,
    sex,
    phone,
    accountId,
    type,
  })
    .then(() => {
      res.status(202).json({
        message: "Succesfully created a customer",
      });
    })
    .catch((err) => {
      res.status(303).json({
        message: "There are some errors when you create a staff",
        error: err,
      });
    });
});

router.post("/search", async (req, res) => {
  const { keyword } = req.body;
  const account = await Accounts.findAll({
    where: {
      [Op.or]: [
        {
          email: {
            [Op.like]: keyword,
          },
        },
        {
          username: {
            [Op.like]: keyword,
          },
        },
        { id: keyword },
      ],
    },
  })
    .then((item) => {
      if (!isNull(item)) {
        return item.get();
      } else {
        return null;
      }
    })
    .catch((err) => {
      res.status(303).json({
        message: "There are some errors when you find an Accounts",
        error: err,
      });
    });

  if (!isNull(account)) {
    await informationUser
      .findOne({
        where: {
          accountId: account.id,
        },
      })
      .then((curCustomer) => {
        if (!isNull(curCustomer)) {
          res.status(200).json({
            message: "Succesfully search a customer",
            data: curCustomer,
          });
        } else {
          res.status(404).json({
            message: "Information of customer is no longer exists",
          });
        }
      })
      .catch((err) => {
        res.status(303).json({
          message: "There are some errors when you find a customers",
          error: err,
        });
      });
  }
});

router.put("/verify/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const account = await Accounts.findByPk(id);
    if (account) {
      account.verifyToken = null;
      await account.save();

      res.status(200).json({
        message: "VerifyToken of Account is successfully!",
        data: account,
      });
    } else {
      res.status(404).json({
        message: "Account not exists!",
      });
    }
  } catch (err) {
    res.status(400).json({
      message: err,
    });
    throw err;
  }
});

router.get("/verify", async (req, res) => {
  try {

    const listAccount = await informationUser.findAll({
      include:[
        {
          model: Accounts,
          where:{
            isVerify: -1,
          },
        }
      ]
    })

    return res.status(200).json({
      data: listAccount,
    });
  } catch (err) {
    throw err;
  }
});
module.exports = router;
