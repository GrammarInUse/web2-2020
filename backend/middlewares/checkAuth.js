const Accounts = require("../models/accounts");
const jwt = require("jsonwebtoken")
module.exports = (req, res, next) => {
    try{
        const bearerHeader = req.headers['authorization'];
        console.log(bearerHeader);
        jwt.verify(bearerHeader, "mySecret", async (err, data) => {
            //console.log("DATAAAAAAAAAAAAA:");
            //console.log(data);
            if(err){
                return res.status(404).json({
                    userMessage: "You haven't logged in... sorry about that!",
                    error: err
                })
            }
            const username = data.username;
            const currentUser = await Accounts.findAll({
                where: {
                    username
                }
            });
            if(currentUser.length>=1 && currentUser[0].password === data.password && currentUser[0].username === data.username){
                next();
            }else{
                res.status(401).json({
                    message: "You haven't logged in... sorry about that!!!"
                });
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