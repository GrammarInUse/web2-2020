const db = require("./db");
const sequelize = require("sequelize");
const Model = sequelize.Model;
const Accounts = require("./accounts");

class IdentityCard extends Model{ }

IdentityCard.init({
    id: {
        type: sequelize.TEXT,
        primaryKey: true
    },
    accountId: {
        type: sequelize.TEXT,
        allowNull: false,
        references: {
            key: "id",
            model: Accounts
        }
    },
    dOissuance:{
        type: sequelize.DATEONLY,
        allowNull: true
    },
    frontOfIdentify: {
        type: sequelize.TEXT,
        allowNull: true
    },
    backOfIdentify: {
        type: sequelize.TEXT,
        allowNull: true
    }
},{
    sequelize: db,
    ModalName:"IdentityCard"
});

IdentityCard.belongsTo(Accounts,{foreignKey:"accountId"})
module.exports = IdentityCard;
