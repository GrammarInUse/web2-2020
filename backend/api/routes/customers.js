const express = require("express");
const fs = require("fs");
const Accounts = require("../../models/accounts");
const Services = require("../../models/services");
const CustomerInfo = require("../../models/information-user");
const router = express.Router();
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const Send = require("../../services/send-email");
const checkAuth = require("../../middlewares/checkAuth");
const { isNullOrUndefined, isNumber } = require("util");
const Transactions = require("../../models/transactions");

//CUSTOMER API
router.post("/signup", async (req, res) => {
    const id = Date.now().toString();
    const username = req.body.username;

    const email = req.body.email;
    const password = await bcrypt.hash(req.body.password, 10);
    const verifyToken = crypto.randomBytes(3).toString('hex').toUpperCase();

    const fullName = req.body.fullName;
    const dOB = req.body.dOB;
    const sex = req.body.sex;
    const phone = req.body.phone;
    const accountId = id;

    //Check username and password >= 7 letters
    if(username.length < 7){
        return res.status(305).json({
            userMessage: "Username: The number of letters have to be greater than 7!"
        })
    }
    if(req.body.password.length < 7){
        return res.status(305).json({
            userMessage: "Password: The number of letters have to be greater than 7!"
        })
    }
    if(phone.length !== 10){
        return res.status(305).json({
            userMessage: "Phone number "
        })
    }
    if(email.length < 16){
        return res.status(305).json({
            userMessage: "Email is unavailable!"
        })
    }

    await Accounts.findAll({
        where: {
            username
        }
    }).then(async (result) => {
        console.log(result);
        if(result.length>=1){
            return res.status(409).json({
                message: "Username exists"
            });
        }else{
            await Accounts.create({
                id,
                username,
                email,
                password,
                verifyToken
            }).then(() => {
                console.log("Succesfully created a account");
            })
            .catch((err) => {
                console.log("Something went wrong when you create an account!" + err);
            });

            const serviceId = await Services.getSTT();
            await Services.create({
                id: serviceId,
                accountId
            });
            
            await CustomerInfo.create({
                fullName,
                dOB,
                sex,
                phone,
                accountId
            }).then(() => {
                return res.status(202).json({
                    message: "Succesfully created a customer"
                });
            })
            .catch((err) => {
                return res.status(303).json({
                    message: "There are some errors when you create a customer information",
                    error: err
                });
            });
            
            
        }
    })
    .catch((err) => {
        console.log("ERROR SIGNUP API: " + err);
    }); 

    const tempUser = await Accounts.findOne({
        where: {
            username
        }
    });


    const url = "http://localhost:8080/customers/signup/" + tempUser.id + "/" + tempUser.verifyToken;
    const mailOptions = {
        from:"hlb0932055041@gmail.com",
        to: tempUser.email,
        subject: "Xác thực tài khoản S-Ebanking",
        text: 'Liên kết vào link sau để kích hoạt tài khoản: ' + url
    }
    await Send(mailOptions);
});

router.post("/login", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const tempCustomer = await Accounts.findAll({where:{username}});

    if(tempCustomer.length >= 1){
        const passwordAuth = await bcrypt.compare(password, tempCustomer[0].password);
        const verifyToken = tempCustomer[0].verifyToken;
        console.log("TOKENNNNN");
        console.log(verifyToken);
        if(!passwordAuth){
            res.status(200).json({
                message: "Wrong password!"
            });
        }else if(passwordAuth && (!isNullOrUndefined(verifyToken) && verifyToken.length !== 0)){
            res.status(200).json({
                message: "You haven't verified your account! Please check your email!!!"
            });
        }
        else if(passwordAuth && (isNullOrUndefined(verifyToken) || verifyToken.length === 0)){
            const token = jwt.sign({
                username: tempCustomer[0].username,
                password: tempCustomer[0].password
            }, "mySecret");

            res.status(200).json({
                message: "Successfully authenticated!",
                token,
                customerId: tempCustomer[0].id
            });
        }else{
            res.status(200).json({
                message: "Something went wrong!!!",
                customer: null
            });
        }
    }else{
        res.status(200).json({
            message: "User not found!",
            customer: null
        });
    }
});

router.get("/:id", checkAuth, async (req, res) => {
    const id = req.params.id;
    const findingCustomer = await CustomerInfo.findByPk(id);
    const findingAccount = await Accounts.findByPk(id);


    const temp = {
        fullName: findingCustomer.fullName,
        email: findingAccount.email,
        phone: findingCustomer.phone
    }

    res.status(290).json({
        message: "Get a " + id + " customer!!",
        customer: temp
    });
});

router.patch("/profile/:id", checkAuth, async (req, res) => {
    const id = req.params.id;
    const newFullName = req.body.fullName;
    const newPhone = req.body.phone;

    const findingCustomer = await CustomerInfo.findByPk(id);

    if(newFullName && newPhone){
        findingCustomer.fullName = req.body.fullName;
        findingCustomer.phone = req.body.phone;
    }else if(newFullName && !newPhone){
        findingCustomer.fullName = req.body.fullName;
    }else if(!newFullName && newPhone){
        findingCustomer.phone = req.body.phone;
    }else{
        res.status(201).json({
            message: "Nothing changed!!"
        });
    }

    await findingCustomer.save()
    .then(() => {
        res.status(290).json({
            message: "Successfully updated your profile"
        });
    })
    .catch((err) => {
        console.log("Something went wrong when you update a customer: " + err);
        res.status(390).json({
            message: "Something went wrong when you update a customer: " + id,
            error: err
        });
    });
});

router.patch("/password/:id", checkAuth, async (req, res) => {
    const id = req.params.id;
    const findingCustomer = await Accounts.findByPk(id);
    const newPassword = await bcrypt.hash(req.body.password, 10);

    findingCustomer.password = newPassword;
    await findingCustomer.save()
    .then(() => {
        res.status(290).json({
            message: "Successfully updated password for customer "
        });
    })
    .catch((err) => {
        console.log("Something went wrong when you update a customer: " + err);
        res.status(390).json({
            message: "Something went wrong when you update a customer: " + id,
            error: err
        });
    });
});

router.get("/signup/:id/:verifyToken", async (req, res) => {
    const id = req.params.id;
    const verifyToken = req.params.verifyToken;
    console.log(id);
    console.log(verifyToken);

    const temp = await Accounts.findByPk(id);
    console.log("TEMP");
    console.log(temp);

    if(temp.verifyToken === verifyToken){
        temp.verifyToken = "";
        await temp.save();
        res.status(200).json({
            message: "Successfully verified your account!"
        });
    }else{
        res.status(403).json({
            message: "Failed verified your account!"
        });
    }
});

router.post("/chuyentien", checkAuth, async (req, res) => {
    const id = Date.now().toString();
    const sender = await Services.findAll({
        where: {
            accountId: req.body.sender
        }
    });
    console.log(sender);
    const accountOfSender = await Accounts.findByPk(req.body.sender);
    const receiver = await Services.findAll({
        where: {
            accountId: req.body.receiver
        }
    });
    console.log(receiver);
    const coinOfTransfer = parseInt(req.body.cOT);
    console.log(coinOfTransfer);
    const comment = req.body.comment;
    console.log(comment);
    const passwordCheck = await bcrypt.compare(req.body.password, accountOfSender.password);
    console.log(passwordCheck);
    if(!passwordCheck){
        return res.status(404).json({
            userMessage: "The password doesn't match!!!"
        });
    }

    const time = new Date(Date.now()).toLocaleString();
    const date = new Date(Date.now()).toLocaleDateString();

    if(sender.length>=1 && receiver.length>=1 && isNumber(coinOfTransfer)){
        sender[0].balance = parseInt(sender[0].balance) - coinOfTransfer;
        receiver[0].balance = parseInt(receiver[0].balance) + coinOfTransfer;
        const statusOfSending = await sender[0].save();
        const statusOfReceiving = await receiver[0].save();

        const temp = await Transactions.create({
            id,
            dOT: time,
            status: 1,
            content: comment, 
            deposit: coinOfTransfer,
            sender: sender[0].accountId,
            receiver: receiver[0].accountId
        })
        .then((data) => {
            data.status = 2;
            data.save()
            .then(() => {
                res.status(200).json({
                    userMessage: "DONE",
                    data
                });
            })
            .catch((err) => {
                res.status(404).json({
                    userMessage: "LOI CATCH DATA",
                    error: err
                });
            });
            
        })
        .catch((err) => {
            res.status(404).json({
                error: err
            })
            // data.status = 3;
            // data.save()
            // .then(() => {
            //     res.status(200).json({
            //         userMessage: "DONE",
            //         data
            //     });
            // })
            // .catch((err) => {
            //     res.status(404).json({
            //         userMessage: "LOI CATCH TEMP",
            //         error: err
            //     });
            // });
        });

        
    }else{
        res.status(404).json({
            userMessage: "FAILED AT SOMETHING"
        });
    }
})



module.exports = router;