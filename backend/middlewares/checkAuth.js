const Accounts = require("../models/accounts");
const jwt = require("jsonwebtoken")
module.exports = (req, res, next) => {
    try{
        const bearerHeader = req.headers['authorization'];
        console.log(bearerHeader);
        jwt.verify(bearerHeader, "mySecret", async (err, data) => {
            if(err){
                return res.status(404).json({
                    userMessage: "Somethings went wrong when you verify token!",
                    error: err
                })
            }
            const username = data.username;
            const currentUser = await Accounts.findAll({
                where: {
                    username
                }
            });
            if(currentUser.length>=1 && currentUser[0].password === data.password){
                next();
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