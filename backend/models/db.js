const sequelize = require("sequelize");

<<<<<<< HEAD
const connectionString = process.env.DATABASE_URL || "postgres://postgres:1@localhost:5432/InternetBanking";
=======
const connectionString = process.env.DATABASE_URL || "postgres://postgres:toan21061996@localhost:5432/InternetBanking";
>>>>>>> 23f30b7be6243a546e987c3e8ad48b1669de8d9d

const db = new sequelize(connectionString);

db.sync()
.then(console.log("TEST IS OK"))
.catch((err) => {
    console.log("ERROR WHEN TESTING: " + err);
});

module.exports = db;