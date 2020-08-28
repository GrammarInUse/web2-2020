require("dotenv").config();
const express = require("express");
const Accounts = require("../../models/accounts");
const Staffs = require("../../models/staffs");
const informationUser = require("../../models/information-user");
const router = express.Router();
const bcrypt = require("bcrypt");
const Send = require("../../services/send-email");
const generator = require("generate-password");
const jwt = require("jsonwebtoken");
const checkAuth = require("../../middlewares/checkAuth");
const ServiceTypes = require("../../models/service-types");
const { SECRET_KEY, USER_EMAIL } = require("../../configs/config");
const IdentityCard = require("../../models/identity-card");
const Services = require("../../models/services");
const CurrencyUnits = require("../../models/currency-unit");
const Op = require("sequelize").Op;

router.post("/login", checkAuth.loginAccountLimiter, async (req, res) => {
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
            SECRET_KEY,
            { expiresIn: "1h" },
            (err, token) => {
              if (err) {
                console.log(err);
              } else {
                res.status(200).json({
                  result: "ok",
                  data: tempStaff,
                  accessToken: token,
                });
              }
            }
          );
        } else {
          return res.status(400).json({
            result: "failed",
            message: "Sorry You are not an admin!",
          });
        }
      }
    } else {
      res.status(401).json({
        error: "Login failed! Check authentication credentials",
      });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.get("/listStaff", checkAuth.checkAuthStaff, async (req, res) => {
  const { decentralizationId } = req.user;
  if (decentralizationId !== 2) {
    return res.status(400).json({
      result: "failed",
      error: "Sorry You are unauthorized to make a manager",
    });
  }
  try {
    const listStaff = await Staffs.findAll({
      include: [
        {
          model: Accounts,
          attributes: ["email", "isBlocked"],
          where: {
            accountType: 2,
          },
        },
      ],
    });

    if (listStaff.length > 0) {
      res.status(200).json({
        result: "ok",
        data: listStaff,
      });
    } else {
      res.status(200).json({
        result: "failed",
      });
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
});

router.post("/addStaff", checkAuth.checkAuthStaff, async (req, res) => {
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
        const mailOptions = {
          from: USER_EMAIL,
          to: account.email,
          subject: "Your username and password!",
          text: `Your account:
            username: ${account.username}
            password: ${generatePassword}
          `,
        };

        Send(mailOptions);

        res.status(201).json({
          result: "ok",
          message: "Successfully created an account!",
        });
      })
      .catch((err) => {
        res.status(400).json({
          result: "failed",
          message: `Something went wrong when you create an account! ${err}`,
        });
      });

    const accountId = id;
    const fullname = req.body.fullname;
    const position = req.body.position;
    const salary = req.body.salary;
    let decentralizationId = req.body.decentralizationId;

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
    const id = req.params.id;
    const account = await Accounts.findByPk(id);

    if (account !== null) {
      account.isBlocked = !account.isBlocked;

      await account.save();

      res.status(200).json({
        result: "ok",
      });
    }
  } catch (err) {
    console.log(err);
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
    const handle = +req.body.data;
    const account = await Accounts.findByPk(id);

    if (handle === 1) {
      if (account) {
        account.isVerified = 1;
        await account.save();

        res.status(200).json({
          result: "ok",
          message: "VerifyToken of Account is successfully!",
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
          from: USER_EMAIL,
          to: account.email,
          subject: "Nontifications of Images of identity card",
          text: "Your Images of identity card is invalid!",
        };
        Send(mailOptions);

        res.status(200).json({
          result: "ok",
          message: "Your Images of identity card is invalid!",
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

router.get("/verify", async (req, res) => {
  try {
    const result = [];
    const listCustomer = await informationUser.findAll({
      attributes: ["accountId", "fullName"],
      include: [
        {
          model: Accounts,
          attributes: ["isBlocked", "isVerified"],
          where: {
            isVerified: 0,
            accountType: 1,
          },
        },
      ],
    });

    const listImage = await IdentityCard.findAll({
      attributes: ["accountId", "frontOfIdentify", "backOfIdentify"],
      where: {
        [Op.and]: [
          {
            frontOfIdentify: {
              [Op.ne]: null,
            },
          },
          {
            backOfIdentify: {
              [Op.ne]: null,
            },
          },
        ],
      },
      include: [
        {
          model: Accounts,
          attributes: ["isBlocked", "isVerified"],
          where: {
            isVerified: 0,
            accountType: 1,
          },
        },
      ],
    });

    listCustomer.forEach((item) => {
      listImage.forEach((image) => {
        if (item.accountId === image.accountId) {
          const temp = {
            id: item.accountId,
            name: item.fullName,
            frontCart: image.frontOfIdentify,
            backCart: image.backOfIdentify,
          };

          result.push(temp);
        }
      });
    });

    if (result.length > 0) {
      return res.status(200).json({
        result: "Ok",
        data: result,
      });
    }
    return res.status(400).json({
      result: "failed",
      data: [],
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
});

router.get("/find-user", async (req, res) => {
  try {
    const listServices = await Services.findAll({
      attributes: ["id", "balance", "maturity"],
      include: [
        {
          model: Accounts,
          attributes: ["id", "username", "email"],
          where: {
            isVerified: 1,
          },
        },
        {
          model: ServiceTypes,
          attributes: ["id", "name", "value"],
        },
        {
          model: CurrencyUnits,
          attributes: ["id", "name"],
        },
      ],
    });

    if (listServices.length > 0) {
      return res.status(200).json({
        result: "Ok",
        data: listServices,
      });
    } else {
      return res.status(200).json({
        result: "failed",
        data: [],
      });
    }
  } catch (err) {
    throw err;
  }
});

router.post("/createService/:id", async (req, res) => {
  const curbalance = req.body.balance;
  const servicetype = +req.body.servicetype;
  const accountId = req.params.id;

  try {
    const check = await Services.findAll({
      where: {
        accountId: accountId,
        serviceType: {
          [Op.ne]: 0,
        },
      },
    });

    if (check.length >= 1) {
      return res.status(400).json({
        result: "failed",
        message: "You can't create one more saving Account!!!",
      });
    }

    const mainBalance = await Services.findOne({
      where: {
        accountId: accountId,
        serviceType: {
          [Op.eq]: 0,
        },
      },
    });
    let ultiBalance = curbalance;
    if (mainBalance) {
      ultiBalance = mainBalance.balance - ultiBalance;
      if (ultiBalance < 0) {
        return res.status(400).json({
          result: "failed",
          message: "Available balance is not enough to execute the transaction",
        });
      }
    }
    const deadline = await ServiceTypes.findByPk(servicetype);
    let maturity = new Date().getTime();
    switch (servicetype) {
      case 1:
        maturity = maturity + deadline.maturity * 2629800000;
        break;
      case 2:
        maturity = maturity + deadline.maturity * 2629800000;
        break;
      case 3:
        maturity = maturity + deadline.maturity * 2629800000;
        break;
      case 4:
        maturity = maturity + deadline.maturity * 2629800000;
        break;
      default:
        return;
    }

    const service = await Services.create({
      id: Date.now().toString(),
      balance: curbalance,
      maturity: maturity,
      serviceType: servicetype,
      accountId: accountId,
      currencyUnitId: 1,
    });

    if (service) {
      return res.status(201).json({
        result: "ok",
      });
    }

    res.status(400).json({
      result: "failed",
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
});

router.put("/recharge/:id", checkAuth.checkAuthStaff, async (req, res) => {
  const id = req.params.id;
  const curBalance = +req.body.balance;
  try {
    const paymentAccount = await Services.findByPk(id);

    if (paymentAccount) {
      if (paymentAccount.serviceType === 0) {
        paymentAccount.balance = +paymentAccount.balance + curBalance;

        await paymentAccount.save();

        return res.status(200).json({
          result: "ok",
        });
      } else {
        return res.status(400).json({
          result: "failed",
          message: "This is not a paymentAccount!!!",
        });
      }
    }

    return res.status(400).json({
      result: "failed",
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
});

router.delete("/deleteService/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const service = await Services.findByPk(id);

    if (service) {
      if (service.serviceType !== 0) {
        if (service.maturity !== null) {
          return res.status(400).json({
            result: "failed",
            message: "Unexpired saving Account!!!",
          });
        }

        await service.destroy();

        return res.status(200).json({
          result: "ok",
        });
      } else {
        return res.status(400).json({
          result: "failed",
          message: "You can't remove payment account!!!",
        });
      }
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
});

router.get("/rate", async (req, res) => {
  try {
    const listTypesOfService = await ServiceTypes.findAll();

    if (listTypesOfService.length > 0) {
      return res.status(200).json({
        result: "ok",
        data: listTypesOfService,
      });
    }

    res.status(400).json({
      result: "failed",
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
});

router.put("/editRate/:id", checkAuth.checkAuthStaff, async (req, res) => {
  const { decentralizationId } = req.user;
  if (decentralizationId !== 2) {
    return res.status(400).json({
      result: "failed",
      error: "Sorry You are unauthorized to make a manager",
    });
  }
  try {
    const name = req.body.name;
    const value = req.body.value;
    const maturity = req.body.maturity;
    const id = req.params.id;
    const TypeOfService = await ServiceTypes.findByPk(id);

    if (TypeOfService !== null) {
      TypeOfService.name = name;
      TypeOfService.value = value;
      TypeOfService.maturity = maturity;

      await TypeOfService.save();

      return res.status(200).json({
        result: "ok",
      });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
});

module.exports = router;
