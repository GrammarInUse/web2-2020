const sequelize = require("sequelize");
const dotenv = require('dotenv');
const { DATABASE_URL } = require("../configs/config");

dotenv.config();

const connectionString = DATABASE_URL;

const db = new sequelize(connectionString);

db.sync()
.then(console.log("TEST IS OK"))
.catch((err) => {
    console.log("ERROR WHEN TESTING: " + err);
});

module.exports = db;