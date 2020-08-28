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
const ServiceTypes = require("../../models/service-types");

//const { USER_EMAIL, PASSWORD_EMAIL } = require("../../configs/config");

//CUSTOMER API
router.post("/verifyCode", async (req, res) => {
    const tempCode = crypto.randomBytes(6).toString('hex').toUpperCase();
    const id = req.body.id;
    const tempAccount = await Accounts.findByPk(id);
    tempAccount.verifyCode = tempCode;
    await tempAccount.save()
    .then(async () => {
        const mailOptions = {
            from: process.env.USER_EMAIL,
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
            email
        }
    }).then((result) => {
        if(result.length>=1){
            return res.status(409).json({
                userMessage: "Email exists"
            });
        }
    })

    await Accounts.findAll({
        where: {
            username
        }
    }).then(async (result) => {
        console.log(result);
        if(result.length>=1){
            return res.status(409).json({
                userMessage: "Username exists"
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

            const serviceId = Date.now().toString();
            await Services.create({
                id: serviceId,
                accountId,
                currencyUnitId: 1
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
            }).then( async () => {
                const tempUser = await Accounts.findOne({
                    where: {
                        username
                    }
                });
            
            
                const url = "https://s-ebanking-api.herokuapp.com/customers/signup/" + tempUser.get().id + "/" + tempUser.get().verifyToken;
                const mailOptions = {
                    from: process.env.USER_EMAIL,
                    to: tempUser.email,
                    subject: "Xác thực tài khoản S-Ebanking",
                    text: 'Liên kết vào link sau để kích hoạt tài khoản: ' + url
                }
                await Send(mailOptions);
                return res.status(202).json({
                    userMessage: "Succesfully created a Customer"
                });
            })
            .catch((err) => {
                return res.status(303).json({
                    userMessage: "There are some errors when you create a customer information",
                    error: err
                });
            });
        }
    })
    .catch((err) => {
        console.log("ERROR SIGNUP API: " + err);
    }); 

    
});

router.post("/login", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const tempCustomer = await Accounts.findAll({
        where: {
            $or: [
                {
                    username
                },
                {
                    email: username
                }
            ]
        }
    });

    if(tempCustomer.length >= 1){
        const passwordAuth = await bcrypt.compare(password, tempCustomer[0].password);
        const verifyToken = tempCustomer[0].verifyToken;
        console.log("TOKENNNNN");
        console.log(verifyToken);
        if(!passwordAuth){
            res.status(200).json({
                userMessage: "Wrong password!"
            });
        }else if(passwordAuth && (!isNullOrUndefined(verifyToken) && verifyToken.length !== 0)){
            res.status(200).json({
                userMessage: "You haven't verified your account! Please check your email!!!"
            });
        }
        else if(passwordAuth && (isNullOrUndefined(verifyToken) || verifyToken.length === 0)){
            const token = jwt.sign({
                username: tempCustomer[0].username,
                password: tempCustomer[0].password
            }, "mySecret");

            res.status(200).json({
                userMessage: "Successfully authenticated!",
                token,
                customerId: tempCustomer[0].id
            });
        }else{
            res.status(200).json({
                userMessage: "Something went wrong!!!",
                customer: null
            });
        }
    }else{
        res.status(200).json({
            userMessage: "User not found!",
            customer: null
        });
    }
});

router.post("/getAvatar", checkAuth.checkAuthCustomer, async (req, res) => {
    const currentUser = req.body.currentUser;
    const tempAccount = await Accounts.findByPk(currentUser);
    const tempAvatar = tempAccount.avatar;

    res.status(200).json({
        userMessage: "DONE",
        data: tempAvatar
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
        dOissuance: dOI,
        frontOfIdentify: front,
        backOfIdentify: back,
        accountId: currentUser
    }).then(async (result) => {
        const tempAccount = await Accounts.findByPk(currentUser);
        tempAccount.isVerified = 0;
        await tempAccount.save()
        .then(() => {
            return res.status(200).json({
                userMessage: "Successfully"
            });
        })
        .catch((err) => {
            console.log(err);
            return res.status(401).json({
                userMessage: "Failed"
            });
        })
    }).catch((err) => {
        console.log(err);
        return res.status(401).json({
            userMessage: "You have verified you account, please wait for us!"
        });
    });  
});

router.get("/:id", checkAuth.checkAuthCustomer, async (req, res) => {
    const id = req.params.id;
    const findingCustomer = await CustomerInfo.findByPk(id);
    const findingAccount = await Accounts.findByPk(id);
    const findingService = await Services.findOne({
        where: {
            accountId: id,
            serviceType: 0,
            currencyUnitId: 1
        }
    });
    console.log("SERVICE");
    console.log(findingService);

    const temp = {
        id: findingService.id,
        fullName: findingCustomer.fullName,
        email: findingAccount.email,
        phone: findingCustomer.phone,
        dOB: findingCustomer.dOB,
        balance: findingService.balance,
        isVerified: findingAccount.isVerified,
        currencyUnitId: findingService.currencyUnitId
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
    
    const temp = await Accounts.findByPk(id);

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
    const idOfReceiver = req.body.receiver;
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
            accountId: idOfSender,
            serviceType: 0,
            currencyUnitId: 1
        }
    });

    

    const accountOfSender = await Accounts.findByPk(idOfSender);
    const infoOfSender = await CustomerInfo.findByPk(idOfSender);
    const serviceOfReceiver = await Services.findByPk(idOfReceiver);
    const accountOfReceiver = await Accounts.findByPk(serviceOfReceiver.accountId);

    const receiver = await Services.findAll({
        where: {
            id: idOfReceiver,
            currencyUnitId: 1
        }
    });

    if(receiver.length <= 0){
        return res.status(401).json({
            userMessage: "STK người nhận không hợp lệ, vui lòng kiểm tra và giao dịch lại! "
        })
    }

    if(sender.length <= 0){
        return res.status(401).json({
            userMessage: "STK không hợp lệ, vui lòng kiểm tra và giao dịch lại"
        })
    }

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

    const tempServiceType = await ServiceTypes.findByPk(sender[0].serviceType);
    if(coinOfTransfer > tempServiceType.limit){
        return res.status(401).json({
            userMessage: "Sorry because you sent money boyond the limit that we allow!"
        })
    }

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

    if(sender.length>=1 && receiver.length>=1 && isNumber(coinOfTransfer) && coinOfTransfer >= 0){
        const temp = await Transactions.create({
            id,
            dOT: time,
            status: 1,
            content: comment, 
            deposit: coinOfTransfer,
            sender: sender[0].id,
            receiver: receiver[0].id
        })
        .then(async (data) => {
            sender[0].balance = parseInt(sender[0].balance) - (coinOfTransfer + 7000);
            receiver[0].balance = parseInt(receiver[0].balance) + coinOfTransfer;
            const statusOfSending = await sender[0].save();
            const statusOfReceiving = await receiver[0].save();
            data.status = 2;
            data.save()
            .then(async () => {
                const mailOptions1 = {
                    from: process.env.USER_EMAIL,
                    to: accountOfSender.email,
                    subject: "Thông báo về số dư tài khoản",
                    text: "Số dư hiện tại của bạn sau khi gửi là: " + sender[0].balance
                }
                await Send(mailOptions1);
                const mailOptions2 = {
                    from: process.env.USER_EMAIL,
                    to: accountOfReceiver.email,
                    subject: "Thông báo về số dư tài khoản",
                    text: "Bạn nhận được " + coinOfTransfer + " từ " + infoOfSender.fullName
                }
                await Send(mailOptions2);
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
            userMessage: "There are some problem when you handle this transition, we really sorry about that!"
        })
    }
});

router.post("/chuyentienVISA", checkAuth.checkAuthCustomer, async (req, res) => {
    const id = Date.now().toString();
    const currentUser = req.body.sender;
    const idOfReceiver = req.body.receiver;
    const comment = req.body.comment;
    const password = req.body.password;
    const coinOfTransferRaw = req.body.cOT;

    const visaService = await Services.findAll({
        where: {
            accountId: currentUser,
            serviceType: 0,
            currencyUnitId: 2
        }
    });

    if(visaService.length <= 0){
        return res.status(401).json({
            userMessage: "You haven't create VISA account. So create a new one and try it again. Thanks for using our service"
        })
    }

    const visaServiceReceiver = await Services.findAll({
        where: {
            id: idOfReceiver,
            serviceType: 0,
            currencyUnitId: 2
        }
    })

    if(visaServiceReceiver.length <= 0){
        return res.status(401).json({
            userMessage: "Input bank account number of receiver invalidly. Please check and try it again. Thanks for using our service"
        })
    }


    const currentAccount = await Accounts.findByPk(currentUser);
    const verifyCode = req.body.verifyCode;

    if(currentAccount.verifyCode !== verifyCode){
        return res.status(401).json({
            userMessage: "Verify code is wrong! Please check and try it again. Thanks for using our service"
        })
    }

    if(isNaN(coinOfTransferRaw)){
        return res.status(404).json({
            userMessage: "Tien sai dinh dang"
        });
    }
    const coinOfTransfer = parseInt(coinOfTransferRaw);

    const passwordCheck = await bcrypt.compare(password, currentAccount.password);
    if(!passwordCheck){
        return res.status(404).json({
            userMessage: "The password doesn't match!!!"
        });
    }

    const tempServiceType = await ServiceTypes.findByPk(visaService[0].serviceType);
    if(coinOfTransfer > tempServiceType.limit*23000 && coinOfTransfer <= 0){
        return res.status(401).json({
            userMessage: "Sorry because you sent money boyond the limit that we allow!"
        })
    }

    if(visaService[0].balance < (coinOfTransfer + 1)){
        return res.status(404).json({
            userMessage: "There is not enough money to handle this transition!!!"
        });
    }

    const time = new Date(Date.now()).toLocaleString();
    const receiverAccount = await Accounts.findByPk(visaServiceReceiver[0].accountId);
    const infoOfSender = await CustomerInfo.findByPk(currentUser);

    const temp = await Transactions.create({
        id,
        dOT: time,
        status: 1,
        content: comment, 
        deposit: coinOfTransfer,
        sender: visaService[0].id,
        receiver: visaServiceReceiver[0].id
    })
    .then(async (data) => {
        visaService[0].balance = parseInt(visaService[0].balance) - (coinOfTransfer + 1);
        visaServiceReceiver[0].balance = parseInt(visaServiceReceiver[0].balance) + coinOfTransfer;
        const statusOfSending = await visaService[0].save();
        const statusOfReceiving = await visaServiceReceiver[0].save();
        data.status = 2;
        data.save()
        .then(async () => {
            const mailOptions1 = {
                from: process.env.USER_EMAIL,
                to: currentAccount.email,
                subject: "News about your VISA card information",
                text: "Your balance after transfering: " + visaService[0].balance
            }
            await Send(mailOptions1);
            const mailOptions2 = {
                from: process.env.USER_EMAIL,
                to: receiverAccount.email,
                subject: "News about your VISA card information",
                text: "You got " + coinOfTransfer + "$ from " + infoOfSender.fullName
            }
            await Send(mailOptions2);
            res.status(200).json({
                userMessage: "Successfully handled this transition, please check your dashboard for changing!",
                data
            });
        })
        .catch((err) => {
            console.log(err);
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
        console.log(err);
        res.status(404).json({
            error: err
        })
    });
})

router.post("/history", checkAuth.checkAuthCustomer, async (req, res) => {
    const id = req.body.currentUser;
    const startDate = req.body.startDate || "";
    const endDate = req.body.endDate || "";

    const listOfTrans = [];

    const tempService = await Services.findAll({
        where: {
            accountId: id,
            serviceType: 0
        }
    });
    const tempTrans = await Transactions.findAll({
        order: [['dOT', 'DESC']],
        where: {
            $or: [
                {
                    sender: tempService[0].id
                },
                {
                    receiver: tempService[0].id
                }
            ]
        }
    }).then()
    .catch(err => {
        console.log(err);
    });
    if(tempTrans.length >= 1 && startDate && endDate){
        const tempStartDate = new Date(startDate).toLocaleDateString();
        const tempEndDate = new Date(endDate).toLocaleDateString();
        tempTrans.map((element) => {
            let data = {

            }
            let temp = element.get();
            if(temp.dOT.toLocaleDateString() >= tempStartDate && temp.dOT.toLocaleDateString() <= tempEndDate){
                data.id = id;
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
            }else{
                //DO SOMETHING
            }
        });

        return res.status(200).json({
            userMessage: "SUCCESSFULLY FETCH ACTIVITY",
            listOfTrans
        })
    }else if(tempTrans.length >= 1){
        console.log("ELSE IF");
        tempTrans.map((element) => {
            let data = {

            }
            let temp = element.get();
            data.id = id;
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
        });

        return res.status(200).json({
            userMessage: "SUCCESSFULLY FETCH ACTIVITY",
            listOfTrans
        })
    }else if(tempTrans.length <= 0){
        console.log("ELSE IF 3");
        return res.status(404).json({
            userMessage: "FAILED TO FETCH ACTIVITY",
            listOfTrans: null
        })
    }else{
        console.log("ELSE");
        tempTrans.map((element) => {
            let data = {

            }
            let temp = element.get();
            data.id = id;
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
        });

        return res.status(200).json({
            userMessage: "SUCCESSFULLY FETCH ACTIVITY",
            listOfTrans
        })
    }
});

router.post("/getPassbook", checkAuth.checkAuthCustomer, async (req, res) => {
    const currentUser = req.body.currentUser;

    const tempService = await Services.findAll({
        where: {
            accountId: currentUser,
            serviceType: {
                $ne: 0
            }
        }
    });

    if(!tempService || tempService.length <= 0){
        return res.status(401).json({
            data: null
        });
    }

    const data = {
        passbookId: tempService[0].id,
        passbookBalance: tempService[0].balance,
        passbookMaturity: tempService[0].maturity.toLocaleDateString(),
        passbookCurrencyUnit: tempService[0].currencyUnitId,
        passbookBeginningDate: tempService[0].createdAt.toLocaleDateString()
    };

    return res.status(200).json({
        data
    });
});

router.post("/getVisa", checkAuth.checkAuthCustomer, async (req, res) => {
    const currentUser = req.body.currentUser;

    const tempService = await Services.findAll({
        where: {
            accountId: currentUser,
            serviceType: 0, 
            currencyUnitId: 2
        }
    });

    if(!tempService || tempService.length <= 0){
        return res.status(401).json({
            data: null
        });
    }

    const data = {
        visaId: tempService[0].id,
        visaBalance: tempService[0].balance,
        visaCurrencyUnit: tempService[0].currencyUnitId,
    };

    return res.status(200).json({
        data
    });
});


module.exports = router;