const express = require("express");
const fs = require("fs");
const path = require("path");
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
const InformationUsers = require("../../models/information-user");
const IdentifyCard = require("../../models/identity-card");
const qs = require("querystring");
const { USER_EMAIL, PASSWORD_EMAIL } = require("../../configs/config");

//CUSTOMER API
router.post("/verifyCode", async (req, res) => {
    const tempCode = crypto.randomBytes(6).toString('hex').toUpperCase();
    const id = req.body.id;
    const tempAccount = await Accounts.findByPk(id);
    tempAccount.verifyCode = tempCode;
    await tempAccount.save()
    .then(async () => {
        const mailOptions = {
            from: USER_EMAIL,
            to: tempAccount.email,
            subject: "Mã xác thực S-Ebanking",
            text: 'Mã xác thực của bạn là: ' + tempCode
        }
        await Send(mailOptions).then(() => {
            console.log("SENT");
            return res.status(200).json({
                userMessage: "Nhận mã xác thực trong email! Vui lòng kiểm tra và xác thực việc chuyển khoản!",
            })
        }).catch((err) => {
            return res.status(201).json({
                userMessage: "Có lỗi trong lúc giao dịch, vui lòng thử lại sau!"
            })
        });
        
    })
    .catch((err) => {
        return res.status(201).json({
            userMessage: "Có lỗi trong lúc giao dịch, vui lòng thử lại sau!"
        })
    });

})

//#region COMMENT
// router.post("/getImages", async (req, res) => {
//     const currentUser = req.body.currentUser;
//     const nameOfPhoto = req.body.nameOfPhoto;
//     console.log(nameOfPhoto);

//     const tempPath = path.join(__dirname, "../../public/images/PhotosOfId" + currentUser, nameOfPhoto + ".jpg");
//     console.log(tempPath);

//     const temp = fs.readFileSync(tempPath);
//     res.status(200).json({
//         userMessage: "DONE",
//         data: temp
//     })
// })

// router.post("/upload/:nameOfPhoto/:id", async (req, res) => {   
//     const currentUser = req.params.id;
//     const nameOfPhoto = req.params.nameOfPhoto;
//     var body = [];
    
//     req.on("data", (data) => {
//         body.push(data);
//     });

//     req.on("end", () => {
//         var post = qs.parse(body);
//         const data = Buffer.concat(body);
//         fs.writeFile("./public/images/PhotosOfId" + currentUser + "/" + nameOfPhoto + ".jpg", data, () => {
//             console.log("DONE");
//         })
//     })

//     return res.status(200).json({
//         userMessage: "Successfully written"
//     })
// });
//#endregion
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
            }).then(() => {
                console.log("Succesfully created a Services");
            })
            .catch((err) => {
                console.log("Something went wrong when you create an Services!" + err);
            });;
            
            await CustomerInfo.create({
                fullName,
                dOB,
                sex,
                phone,
                accountId
            }).then(() => {
                return res.status(202).json({
                    message: "Succesfully created a Customer Info"
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


    const url = "http://localhost:8080/customers/signup/" + tempUser.get().id + "/" + tempUser.get().verifyToken;
    const mailOptions = {
        from: USER_EMAIL,
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

router.post("/getAvatar", checkAuth.checkAuthCustomer, async (req, res) => {
    const currentUser = req.body.currentUser;

    const tempAccount = await Accounts.findByPk(currentUser);
    const tempAvatar = tempAccount.avatar;

    //console.log(tempAccount);

    res.status(200).json({
        userMessage: "DONE",
        data: tempAvatar
    })
})

router.post("/getFrontIdentify", checkAuth.checkAuthCustomer, async (req, res) => {
    const currentUser = req.body.currentUser;

    const tempIdentifyCard = await IdentifyCard.findAll({
        where: {
            accountId: currentUser
        }
    });
    const tempidentify = tempIdentifyCard[0].dataValues.frontOfIdentify ? tempIdentifyCard[0].dataValues.frontOfIdentify : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog";

    //console.log(tempAccount);

    res.status(200).json({
        userMessage: "DONE",
        data: tempidentify
    })
})

router.post("/getBackIdentify", checkAuth.checkAuthCustomer, async (req, res) => {
    const currentUser = req.body.currentUser;

    const tempIdentifyCard = await IdentifyCard.findAll({
        where: {
            accountId: currentUser
        }
    });

    const tempidentify = tempIdentifyCard[0].dataValues.backOfIdentify ? tempIdentifyCard[0].dataValues.backOfIdentify : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog";

    //console.log(tempAccount);

    res.status(200).json({
        userMessage: "DONE",
        data: tempidentify
    })
})

router.post("/upload", checkAuth.checkAuthCustomer, async (req, res) => {
    const currentUser = req.body.currentUser;
    const avatar = req.body.avatar;
    const tempAccount = await Accounts.findByPk(currentUser);
    tempAccount.avatar = avatar;

    await tempAccount.save()
    .then(() => {
        console.log("STEP 4");
        return res.status(200).json({
            userMessage: "Successfully Image uploaded"
        })
    })
    .catch(err => {
        console.log("FAILED");
        return res.status(200).json({
            userMessage: "Failed Image uploaded"
        })
    })
});

router.post("/verify", checkAuth.checkAuthCustomer, async (req, res) => {
    const currentUser = req.body.currentUser;
    const identifyId = req.body.identifyId;
    const dOI = req.body.dOI;
    const front = req.body.front;
    const back = req.body.back;

    await IdentifyCard.create({
        id: identifyId,
        dOIssuance: dOI,
        frontOfIdentify: front,
        backOfIdentify: back,
        accountId: currentUser
    }).then(async (result) => {
        console.log(result);
        const tempAccount = await Accounts.findByPk(currentUser);
        tempAccount.isVerified = 0;
        await tempAccount.save()
        .then(() => {
            return res.status(200).json({
                userMessage: "Successfully"
            });
        })
        .catch((err) => {
            return res.status(401).json({
                userMessage: "Failed"
            });
        })

        
    }).catch((err) => {
        console.log(err);
        return res.status(401).json({
            userMessage: "Failed"
        });
    });  
});

router.get("/:id", checkAuth.checkAuthCustomer, async (req, res) => {
    const id = req.params.id;
    const findingCustomer = await CustomerInfo.findByPk(id);
    const findingAccount = await Accounts.findByPk(id);
    const findingService = await Services.findAll({
        where: {
            accountId: id
        }
    });


    const temp = {
        fullName: findingCustomer.fullName,
        email: findingAccount.email,
        phone: findingCustomer.phone,
        dOB: findingCustomer.dOB,
        balance: findingService[0].balance,
        isVerified: findingAccount.isVerified
    }

    res.status(290).json({
        message: "Get a " + id + " customer!!",
        customer: temp
    });
});

router.patch("/profile/:id", checkAuth.checkAuthCustomer, async (req, res) => {
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

router.patch("/password/:id", checkAuth.checkAuthCustomer, async (req, res) => {
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

router.post("/chuyentien", checkAuth.checkAuthCustomer, async (req, res) => {
    const idOfSender = req.body.sender;
    const tempAccount = await Accounts.findByPk(idOfSender);
    if(tempAccount.isVerified === 0 || tempAccount.isVerified === -1){
        return res.status(401).json({
            userMessage: "Bạn chưa chứng thực tài khoản"
        });
    }

    const id = Date.now().toString();
    const coinOfTransferRaw = req.body.cOT;
    const verifyCode = req.body.verifyCode;
    
    

    const sender = await Services.findAll({
        where: {
            accountId: idOfSender
        }
    });

    const accountOfSender = await Accounts.findByPk(idOfSender);
    const receiver = await Services.findAll({
        where: {
            accountId: req.body.receiver
        }
    });

    if(verifyCode !== accountOfSender.verifyCode){
        return res.status(401).json({
            userMessage: "Verify code was wrong, please try again. We really sorry about that"
        });
    }

    if(isNaN(coinOfTransferRaw)){
        return res.status(404).json({
            userMessage: "Tien sai dinh dang"
        });
    }

    const coinOfTransfer = parseInt(coinOfTransferRaw);

    if(sender[0].balance < (coinOfTransfer + 7000)){
        return res.status(404).json({
            userMessage: "There is not enough money to handle this transition!!!"
        });
    }

    const comment = req.body.comment;
    const passwordCheck = await bcrypt.compare(req.body.password, accountOfSender.password);
    if(!passwordCheck){
        return res.status(404).json({
            userMessage: "The password doesn't match!!!"
        });
    }

    const time = new Date(Date.now()).toLocaleString();
    const date = new Date(Date.now()).toLocaleDateString();

    if(sender.length>=1 && receiver.length>=1 && isNumber(coinOfTransfer)){
        sender[0].balance = parseInt(sender[0].balance) - (coinOfTransfer + 7000);
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
                    userMessage: "Successfully handled this transition, please check your dashboard for changing!",
                    data
                });
            })
            .catch((err) => {
                data.status = 3;
                data.save()
                .then(() => {
                    res.status(200).json({
                        userMessage: "There are some problem when you handle this transition, we really sorry about that",
                        error: err
                    });
                })
                .catch((err) => {
                    res.status(404).json({
                        userMessage: "There are some problem when you handle this transition, we really sorry about that",
                        error: err
                    });
                });
            });
            
        })
        .catch((err) => {
            res.status(404).json({
                error: err
            })
        });

        
    }else{
        res.status(404).json({
            userMessage: "Mã xác thực không đúng, vui lòng thực hiện lại giao dịch!"
        })
    }
});

router.get("/history/:id", checkAuth.checkAuthCustomer, async (req, res) => {
    const id = req.params.id;
    const tempTrans = await Transactions.findAll({
        where: {
            sender: id
        }
    });
    var listOfTrans = [];
    if(tempTrans.length >= 1){
        
        tempTrans.map((element) => {
            let data = {

            }
            let temp = element.get();
            data.id = temp.id;
            data.date = temp.dOT.toLocaleDateString();
            data.time = temp.dOT.toLocaleTimeString();
            data.receiverId = temp.receiver;
            data.receiver = temp.receiver;
            data.deposit = temp.deposit;
            console.log(temp.status);
            if(temp.status === 1){
                data.status = "Sending...";
            }else if(temp.status === 2){
                data.status = "Sent"
            }else if(temp.status === 3){
                data.status = "Cancelled";
            }else{
                data.status = "Loading...";
            }
            data.content = temp.content;
            listOfTrans.push(data);
        })

        

        return res.status(200).json({
            userMessage: "SUCCESSFULLY FETCH ACTIVITY",
            listOfTrans
        })
    }else{
        return res.status(404).json({
            userMessage: "FAILED TO FETCH ACTIVITY"
        })
    }
});




module.exports = router;