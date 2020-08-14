const sequelize = require("sequelize");

<<<<<<< HEAD

const connectionString = process.env.DATABASE_URL || "postgres://postgres:Taolatao0@localhost:5432/InternetBanking";
=======
const connectionString = process.env.DATABASE_URL || "postgres://postgres:1@localhost:5432/InternetBanking";
>>>>>>> 05032e341cc36eed5829d2bd6d4545c9c507c8e4

const db = new sequelize(connectionString);

db.sync()
.then(console.log("TEST IS OK"))
.catch((err) => {
    console.log("ERROR WHEN TESTING: " + err);
});

module.exports = db;