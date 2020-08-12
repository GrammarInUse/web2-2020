const sequelize = require("sequelize");

const connectionString = process.env.DATABASE_URL || "postgres://postgres:Taolatao0@localhost:5432/InternetBanking";

const db = new sequelize(connectionString);

db.sync()
.then(console.log("TEST IS OK"))
.catch((err) => {
    console.log("ERROR WHEN TESTING: " + err);
});

module.exports = db;