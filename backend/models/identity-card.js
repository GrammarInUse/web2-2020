const db = require("./db");
const sequelize = require("sequelize");
const Model = sequelize.Model;
const Account = require('./accounts');
const Accounts = require("./accounts");

class IdentityCard extends Model{
    static async getName(id){
        return id ;
    }
}

IdentityCard.init({
    idFront:{
        type: sequelize.TEXT,
        allowNull: false,
    },
    idBackSide:{
        type: sequelize.TEXT,
        allowNull: false,
    },
    idUser:{
        type: sequelize.TEXT,
        allowNull: false,
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
    fullName:{
        type: sequelize.TEXT,
        allowNull: false
    },
    dOT:{
        type:sequelize.DATEONLY,
        allowNull:false
    },
    sex:{
        type: sequelize.BOOLEAN,
        allowNull: false
    },
    national:{
        type: sequelize.TEXT,
        allowNull: false
    },
    homeTown:{
        type: sequelize.TEXT,
        allowNull:false
    },
    address:{
        type: sequelize.TEXT,
        allowNull: false
    },
    characteristic:{
        type: sequelize.TEXT,
        allowNull: false
    },
    dOissuance:{
        type: sequelize.DATEONLY,
        allowNull: false
    }
},{
    sequelize: db,
    ModalName:"IdentityCard"
});
IdentityCard.belongsTo(Accounts, {foreignKey: "accountId"});

module.exports=IdentityCard;