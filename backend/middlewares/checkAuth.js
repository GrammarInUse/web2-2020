const Account = require("../models/accounts");
const jwt = require("jsonwebtoken")
module.exports = (req, res, next) => {
    try{
        const bearerHeader = req.headers['authorization'];
        jwt.verify(bearerHeader, "shhh", async (err, data) => {
            if(err){
                return res.status(403).json({
                    userMessage: err
                });
            }
            const currentUser = await Account.findAll({
                where: {
                    username: data.username
                }
            });
            console.log(currentUser[0].password);
            console.log(data.password);
            if(currentUser.length>=1 && currentUser[0].password === data.password){
                next();
            }else{
                return res.status(404).json({
                    userMessage: "Somethings went wrong when you verify the token!"
                })
            }
        });
    }
    catch(error){
        console.log("Something went wrong when you verify token! " + error);
        res.status(401).json({
            message: "You haven't logged in... sorry about that!"
        });
    }
}