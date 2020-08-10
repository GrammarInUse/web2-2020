const jwt = require("jsonwebtoken")
module.exports = (req, res, next) => {
    try{
        const bearerHeader = req.headers['authorization'];
        console.log(bearerHeader);
        const decoded = jwt.verify(bearerHeader, "mySecret", {maxAge: "1h"}, () => {
            req.userData = decoded; 
            next();
        });
    }
    catch(error){
        console.log("Something went wrong when you verify token! " + error);
        res.status(401).json({
            message: "You haven't logged in... sorry about that!"
        });
    }
    next();
}