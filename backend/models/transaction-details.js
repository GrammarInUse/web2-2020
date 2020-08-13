const db = require("./db");
const sequelize = require("sequelize");
const Model = sequelize.Model;
const Transactions = require("./transactions");
const Services = require("./services");
const TransactionStatus = require("./transaction-status");

class TransactionDetails extends Model{ }

TransactionDetails.init({
    transactionId: {
        type: sequelize.TEXT,
        primaryKey: true,
        references: {
            key: "id",
            model: Transactions
        }
    },
    sender: {
        type: sequelize.TEXT,
        primaryKey: true,
        references: {
            key: "accountId", 
            model: Services
        }
    },
    receiver: {
        type: sequelize.TEXT,
        allowNull: false,
        references: {
            key: "accountId", 
            model: Services
        }
    },
    content: {
        type: sequelize.TEXT,
        allowNull: false,
        defaultValue: "Gửi không có nội dung gì cả!!"
    },
    status: {
        type: sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
        references: {
            key: "id",
            model: TransactionStatus
        }
    }
},{
    sequelize: db,
    ModelName: "TransactionDetails"
});

module.exports = TransactionDetails;