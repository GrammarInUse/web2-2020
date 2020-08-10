const express = require("express");
const Accounts = require("../../models/accounts");
const Customers = require("../../models/customers");
const router = express.Router();
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const verifyToken = require("../../middlewares/checkAuth");
const Send = require("../../services/send-email");


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
                verifyToken,
                bankBranchId
            }).then(() => {
                console.log("Succesfully created a account");
            })
            .catch((err) => {
                console.log("Something went wrong when you create an account!" + err);
            });

            await Customers.create({
                fullName,
                dOB,
                sex,
                phone,
                accountId
            }).then(() => {
                res.status(202).json({
                    message: "Succesfully created a customer"
                });
            })
            .catch((err) => {
                res.status(303).json({
                    message: "There are some errors when you create a customer",
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
    await Send(tempUser);
});

router.post("/login", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const tempCustomer = await Accounts.findAll({where:{username}});

    if(tempCustomer.length >= 1){
        const passwordAuth = await bcrypt.compare(password, tempCustomer[0].password);
        const verifyToken = tempCustomer.verifyToken;
        console.log(verifyToken);
        if(!passwordAuth){
            res.status(200).json({
                message: "Wrong password!"
            });
        }else if(passwordAuth && verifyToken !== null){
            res.status(200).json({
                message: "You haven't verified your account! Please check your email!!!"
            });
        }
        else if(passwordAuth && verifyToken === null){
            const token = jwt.sign({
                username: tempCustomer[0].username,
                password: tempCustomer[0].password
            }, "mySecret", {
                expiresIn: "1h",
                
            });

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

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const findingCustomer = await Customers.findByPk(id);
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

router.patch("/profile/:id", async (req, res) => {
    const id = req.params.id;
    const findingCustomer = await Customers.findByPk(id);

    findingCustomer.fullName = req.body.fullName;
    findingCustomer.phone = req.body.phone;

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

router.patch("/password/:id", async (req, res) => {
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

router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    await Customers.destroy({
        where: {
            id
        }
    }).then(() => {
        res.status(200).json({
            message: "Successfully deleted a customer id: " + id
        });
    })
    .catch((err) => {
        console.log("Something went wrong when you delete a customer: " + id);
        res.status(300).json({
            message: "Something went wrong when you delete a customer: " + id
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

module.exports = router;