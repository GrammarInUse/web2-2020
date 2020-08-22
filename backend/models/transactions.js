const db = require("./db");
const sequelize = require("sequelize");
const TransactionStatus = require("./transaction-status");
const Services = require('./services');

const Model = sequelize.Model;

class Transactions extends Model{ }
Transactions.init({
    id: {
        type: sequelize.TEXT,
        primaryKey: true
    },
    dOT: {
        type: sequelize.DATE,
        allowNull: false
    },
    status: {
        type: sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
        references: {
            key: "id",
            model: TransactionStatus
        }
    },
    content: {
        type: sequelize.TEXT,
        allowNull: false,
        defaultValue: "Gửi không có nội dung gì cả!!"
    },
    deposit: {
        type: sequelize.BIGINT,
        allowNull: false
    },  
    sender: {
        type: sequelize.TEXT,
        references: {
            key: "id",
            model: Services
        }
    },
    receiver: {
        type: sequelize.TEXT,
        references: {
            key: "id",
            model: Services
        }
    }
},{
    sequelize: db,
    ModelName: "Transactions"
});

module.exports = Transactions;