const db = require("./db");
const sequelize = require("sequelize");

const AccountTypes = require("./account-types");
const Model = sequelize.Model;

class Accounts extends Model{ }

Accounts.init({
    id: {
        type: sequelize.TEXT,
        primaryKey: true
    },
    username: {
        type: sequelize.TEXT,
        allowNull: false,
        unique: true
    },
    email: {
        type: sequelize.TEXT,
        allowNull: false,
        unique: true
    },
    password: {
        type: sequelize.TEXT,
        allowNull: false
    },
    verifyToken: {
        type: sequelize.TEXT,
        allowNull: true
    },
    isVerify:{
        type: sequelize.INTEGER,
        allowNull: true,
    },
    accountType: {
        type: sequelize.INTEGER,
        defaultValue: 1,
        allowNull: false,
        references: {
            key: "id",
            model: AccountTypes
        }
    },
    isBlocked: {
        type: sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
    }
},{
    sequelize: db,
    ModelName: "Accounts"
});

module.exports = Accounts;