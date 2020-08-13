const db = require("./db");
const sequelize = require("sequelize");
const Model = sequelize.Model;

const Accounts = require("./accounts");
const Decentralizations = require("./Decentralizations");

class Staffs extends Model{ }

Staffs.init({
    accountId: {
        type: sequelize.TEXT,
        allowNull: false,
        references: {
            key: "id",
            model: Accounts
        },
        primaryKey: true
    },
    fullname:{
        type: sequelize.STRING,
        allowNull: false,
    },
    position:{
        type: sequelize.TEXT,
        allowNull: false,
    },
    salary:{
        type: sequelize.BIGINT,
        allowNull:false
    },
    decentralizationId: {
        type: sequelize.INTEGER,
        allowNull: false,
        references: {
            key: "id",
            model: Decentralizations
        }
    }
},{
    sequelize: db,
    ModelName: "Staffs"
});

Staffs.belongsTo(Decentralizations,{foreignKey: "decentralizationId"});

module.exports = Staffs;