const db = require("./db");
const sequelize = require("sequelize");
const Model = sequelize.Model;
const Accounts = require("./accounts");
const ServiceTypes = require("./service-types");

class Customers extends Model{ }

Customers.init({
    balance: {
        type: sequelize.BIGINT,
        allowNull: false,
        defaultValue: 0
    },
    //Ngày đáo hạn(Ngày đóng)
    maturity: {
        type: sequelize.DATE,
        allowNull: true
    },
    serviceType: {
        type: sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
        references: {
            key: "id",
            model: ServiceTypes
        }
    },
    accountId: {
        type: sequelize.TEXT,
        allowNull: false,
        references: {
            key: "id",
            model: Accounts
        },
        primaryKey: true
    }
},{
    sequelize: db,
    ModelName: "Customers"
});



module.exports = Customers; 