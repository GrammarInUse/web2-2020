const sequelize = require("sequelize");
const dotenv = require('dotenv');

dotenv.config();

const connectionString = process.env.DATABASE_URL;

const db = new sequelize(connectionString);

db.sync()
.then(console.log("TEST IS OK"))
.catch((err) => {
    console.log("ERROR WHEN TESTING: " + err);
});

module.exports = db;