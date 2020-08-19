const db = require("./db");
const sequelize = require("sequelize");
const Model = sequelize.Model;
const Accounts = require("./accounts");
class IdentityCard extends Model{  }

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
        },
    },
    dOissuance:{
        type: sequelize.DATEONLY,
        allowNull: false
    },
    frontOfIdentify: {
        type: sequelize.TEXT,
        allowNull: false
    },
    backOfIdentify: {
        type: sequelize.TEXT,
        allowNull: false
    }
},{
    sequelize: db,
    ModalName:"IdentityCard"
});

IdentityCard.belongsTo(Accounts,{foreignKey:"accountId"})

module.exports=IdentityCard;