const db = require("./db");
const sequelize = require("sequelize");
const Model = sequelize.Model;

const Accounts = require("./accounts");

class InformationUsers extends Model{
    static async getName(id){
        return id + "SANG";
    }
}

InformationUsers.init({
    fullName: {
        type: sequelize.TEXT,
        allowNull: false,
    },
    dOB: {
        type: sequelize.DATEONLY,
        allowNull: false
    },
    sex: {
        type: sequelize.BOOLEAN,
        allowNull: false
    },
    phone: {
        type: sequelize.TEXT,
        allowNull: true
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
    ModelName: "InformationUsers"
});

InformationUsers.belongsTo(Accounts, {foreignKey: "accountId"});

module.exports = InformationUsers;