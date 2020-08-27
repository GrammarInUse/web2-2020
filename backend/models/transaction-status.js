const db = require("./db");
const sequelize = require("sequelize");
const Model = sequelize.Model;

class TransactionStatus extends Model{
    static async initialize() {
        await TransactionStatus.create({
            id: 1,
            name: "Sending"
        }).then(console.log("Successfully initialized a transaction status"))
        .catch((err) => {
            console.log("Something went wrong when you initalize a transaction status: " + err);    
        });

        await TransactionStatus.create({
            id: 2,
            name: "Sent"
        }).then(console.log("Successfully initialized a transaction status"))
        .catch((err) => {
            console.log("Something went wrong when you initalize a transaction status: " + err);    
        });

        await TransactionStatus.create({
            id: 3,
            name: "Cancelled"
        }).then(console.log("Successfully initialized a transaction status"))
        .catch((err) => {
            console.log("Something went wrong when you initalize a transaction status: " + err);    
        });
    }
}

TransactionStatus.init({
    id: {
        type: sequelize.INTEGER,
        primaryKey: true
    },
    name: {
        type: sequelize.TEXT,
        allowNull: false
    }
},{
    sequelize: db,
    ModelName: "TransactionStatus"
});

module.exports = TransactionStatus;