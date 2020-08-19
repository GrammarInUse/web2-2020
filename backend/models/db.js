const sequelize = require("sequelize");
const dotenv = require('dotenv');

const Op = sequelize.Op;

const operatorsAliases = {
  $like: Op.like
};

dotenv.config();

const connectionString = process.env.DATABASE_URL;

const db = new sequelize(connectionString, { operatorsAliases });

db.sync()
.then(console.log("TEST IS OK"))
.catch((err) => {
    console.log("ERROR WHEN TESTING: " + err);
});

module.exports = db;