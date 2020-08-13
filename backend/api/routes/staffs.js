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
const Send = require("../../services/send-email");
const Transactions = require("../../models/transactions");

router.get("/", async (req, res) => {
  const CustomerList = await Staffs.findAll();

  res.status(300).json({
    listOfCustomers: CustomerList,
  });
});

router.post("/addStaff", async (req, res) => {
  const id = Date.now().toString();
  const email = req.body.email;
  const password = await bcrypt.hash(req.body.password, 10);
  const accountType = 2;
  let username = new Date().getFullYear().toString().substring(2);
  const count = (await Accounts.count()) + 1;

  console.log(count);
  if (count < 10) {
    username += "00" + count;
  } else if (count < 100) {
    username += "0" + count;
  } else {
    username += count;
  }

  await Accounts.create({
    id,
    username,
    email,
    password,
    accountType,
  })
    .then((account) => {
      res.status(201).json({
        result: "ok",
        data: { account },
        message: "Successfully created an account!",
      });
    })
    .catch((err) => {
      res.status(400).json({
        result: "failed",
        data: {},
        message: `Something went wrong when you create an account! ${err}`,
      });
    });

  const accountId = id;
  const fullname = req.body.name;
  const position = req.body.position;
  const salary = req.body.salary;
  let decentralizationId = req.body.role === true ? 1 : 2;

  await Staffs.create({
    accountId,
    fullname,
    position,
    salary,
    decentralizationId,
  })
    .then((staff) => {
      if (staff !== null) {
        console.log("Successfully!");
      }
    })
    .catch((err) => {
      console.log(`Something went wrong when you create an staff! ${err}`);
    });
});

router.put("/verify", async (req, res) => {
  const { id, handle } = req.query;
  try {
    const account = await Accounts.findByPk(id);
    if (handle === true) {
      if (account) {
        account.isVerified = 1;
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
    } else {
      const mailOptions = {
        from: "hlb0932055041@gmail.com",
        to: account.email,
        subject: "Nontifications of Images of identity card",
        text: "Your Images of identity card is invalid!",
      };
      Send(mailOptions);
    }
  } catch (err) {
    res.status(400).json({
      message: err,
    });
    throw err;
  }
});

router.get("/listAccount", async (req, res) => {
  try {
    const listAccount = await informationUser.findAll({
      attributes: ["fullName", "dOB", "sex", "phone"],
      include: [
        {
          model: Accounts,
          attributes: ["id", "isBlocked", "isVerified"],
          where: {
            isVerified: 0,
            accountType: 1,
          },
        },
      ],
    });

    console.log(listAccount);
    if (listAccount.length > 0) {
      return res.status(200).json({
        result: "Ok",
        data: listAccount,
      });
    } else {
      return res.status(200).json({
        result: "ok",
        data: {},
      });
    }
  } catch (err) {
    throw err;
  }
});

router.get("/transaction", async (req, res) => {
  const { start, end } = req.body;

  const curStart = new Date(start).toISOString()
  const curEnd = new Date(end).toISOString();

  console.log(curStart)
  try {
    const listTransaction = await Transactions.findAll({
      where: {
        dOT: {
          [Op.between]: [curStart,curEnd],
        },
      },
    });

    if (listTransaction.length > 0) {
      res.status(200).json({
        result: "ok",
        data: listTransaction,
        message: "Finding history of transactions is Successfully!",
      });
    } else {
      res.status(200).json({
        result: "failed",
        data: {},
        message: "history of transactions is empty!",
      });
    }
  } catch (err) {
    console.log(err)
    throw err;
  }
});
module.exports = router;
