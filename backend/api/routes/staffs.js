const express = require("express");
const Accounts = require("../../models/accounts");
const Staffs = require("../../models/staffs");
const informationUser = require("../../models/information-user");
const router = express.Router();
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const Send = require("../../services/send-email");
const Transactions = require("../../models/transactions");
const generator = require("generate-password");
const jwt = require("jsonwebtoken");
const checkAuth = require("../../middlewares/checkAuth");
const dotenv = require('dotenv');

dotenv.config();

router.post("/login",checkAuth.loginAccountLimiter, async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    const tempStaff = await Accounts.findOne({
      where: {
        username: username,
      },
    });
    if (tempStaff) {
      const passwordAuth = await bcrypt.compare(password, tempStaff.password);

      if (!passwordAuth) {
        res.status(200).json({
          message: "Wrong password!",
        });
      } else if (passwordAuth) {
        if (tempStaff.accountType === 2) {
          jwt.sign(
            { id: tempStaff.id },
            process.env.SECRET_KEY,
            { expiresIn: "1h" },
            (err, token) => {
              if (err) {
                console.log(err);
              } else {
                res.status(200).json({
                  result: "ok",
                  data: { tempStaff, token },
                });
              }
            }
          );
        }else{
          return res.status(400).json({
            result:"failed",
            message:"Sorry You are not an admin!"
          })
        }
      }
    } else {
      res.status(401).json({
        error: "Login failed! Check authentication credentials",
        data: {},
      });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.get("/listStaff", async (req, res) => {
  try {
    const listStaff = await Staffs.findAll();

    if (listStaff.length > 0) {
      res.status(200).json({
        result: "ok",
        data: listStaff,
      });
    } else {
      res.status(200).json({
        result: "failed",
        data: {},
      });
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
});

router.post("/addStaff",checkAuth.checkAuthStaff, async (req, res) => {
  const { decentralizationId } = req.user;
  if (decentralizationId !== 2) {
    return res.status(400).json({
      result: "failed",
      error: "Sorry You are unauthorized to make a manager",
    });
  }
  try {
    const id = Date.now().toString();
    const email = req.body.email;
    const generatePassword = generator.generate({
      length: 10,
      numbers: true,
      uppercase: false,
    });
    const accountType = 2;
    let username = new Date().getFullYear().toString().substring(2);
    const count = (await Accounts.count()) + 1;

    if (count < 10) {
      username += "00" + count;
    } else if (count < 100) {
      username += "0" + count;
    } else {
      username += count;
    }

    const password = await bcrypt.hash(generatePassword, 10);

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
  } catch (err) {
    throw err;
  }
});

router.put("/editStaff/:id", checkAuth.checkAuthStaff, async (req, res) => {
  const { decentralizationId } = req.user;
  if (decentralizationId !== 2) {
    return res.status(400).json({
      result: "failed",
      error: "Sorry You are unauthorized to make a staff a manager",
    });
  }
  try {
    const { name, position, salary, role } = req.body;
    await Staffs.findByPk(req.params.id)
      .then(async (staff) => {
        staff.fullname = name;
        staff.position = position;
        staff.salary = salary;
        if (role === true) {
          staff.decentralizationId = 1;
        } else {
          staff.decentralizationId = 2;
        }

        await staff.save();

        res.status(200).json({
          result: "ok",
          data: staff,
        });
      })
      .catch((err) => {
        res.status(400).json({
          result: "failed",
          error: err,
        });
      });
  } catch (err) {
    throw err;
  }
});

router.put("/blockAccount/:id", checkAuth.checkAuthStaff, async (req, res) => {
  const { decentralizationId } = req.user;
  if (decentralizationId !== 2) {
    return res.status(400).json({
      result: "failed",
      error: "Sorry You are unauthorized to make a manager",
    });
  }
  try {
    const handle = req.body.data;
    const id = req.params.id;
    const account = await Accounts.findByPk(id);

    if (handle) {
      if (account !== null) {
        account.isBlocked = true;

        await account.save();

        res.status(200).json({
          result: "ok",
          message: "Account is blocked successfully!",
        });
      }
    } else {
      if (account !== null) {
        account.isBlocked = false;

        await account.save();

        res.status(200).json({
          result: "ok",
          message: "Account not exists!",
        });
      }
    }
  } catch (err) {
    throw err;
  }
});

router.put("/verifyHandle/:id", checkAuth.checkAuthStaff, async (req, res) => {
  const { decentralizationId } = req.user;
  if (decentralizationId !== 2) {
    return res.status(400).json({
      result: "failed",
      error: "Sorry You are unauthorized to make a manager",
    });
  }
  try {
    const id = req.params.id;
    const handle = req.body.data;
    const account = await Accounts.findByPk(id);
    if (handle) {
      if (account) {
        account.isVerified = 1;
        await account.save();

        res.status(200).json({
          result: "ok",
          message: "VerifyToken of Account is successfully!",
          data: account,
        });
      } else {
        res.status(404).json({
          result: "failed",
          message: "Account not exists!",
        });
      }
    } else {
      if (account) {
        account.isVerified = -1;
        await account.save();

        const mailOptions = {
          from: "hlb0932055041@gmail.com",
          to: account.email,
          subject: "Nontifications of Images of identity card",
          text: "Your Images of identity card is invalid!",
        };
        Send(mailOptions);

        res.status(200).json({
          result: "failed",
          message: "VerifyToken of Account is not legally!",
        });
      } else {
        res.status(404).json({
          result: "failed",
          message: "Account not exists!",
        });
      }
    }
  } catch (err) {
    res.status(400).json({
      message: err,
    });
    throw err;
  }
});

router.put("/listCustomer", async (req, res) => {
  try {
    const listCustomer = await informationUser.findAll({
      attributes: ["fullName"],
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

    if (listCustomer.length > 0) {
      return res.status(200).json({
        result: "Ok",
        data: listCustomer,
      });
    } else {
      return res.status(200).json({
        result: "Ok",
        data: {},
      });
    }
  } catch (err) {
    throw err;
  }
});

router.get("/spend-account", async (req, res) => {
  const { start, end } = req.body;

  const curStart = new Date(start).toISOString();
  const curEnd = new Date(end).toISOString();

  console.log(curStart);
  try {
    const listTransaction = await Transactions.findAll({
      where: {
        dOT: {
          [Op.between]: [curStart, curEnd],
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
    console.log(err);
    throw err;
  }
});

router.get("/find-user", async (req, res) => {
  try {
    const listAccount = await informationUser.findAll({
      attributes: ["fullName", "dOB", "sex", "phone", "accountId"],
      include: [
        {
          model: Accounts,
          attributes: [
            "id",
            "username",
            "email",
            "accountType",
            "isBlocked",
            "isVerified",
          ],
          where: {
            accountType: 1,
          },
        },
      ],
    });

    if (listAccount.length > 0) {
      return res.status(200).json({
        result: "Ok",
        data: listAccount,
      });
    } else {
      return res.status(200).json({
        result: "Ok",
        data: {},
      });
    }
  } catch (err) {
    throw err;
  }
});

module.exports = router;
