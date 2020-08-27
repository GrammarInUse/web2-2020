const sequelize = require("sequelize");
const Model = sequelize.Model;

const db = require("./db");

class AccountTypes extends Model{
    static async initialize() {
        await AccountTypes.create({
            id: 1,
            name: "Khách hàng"
        })
        .then(console.log("Successfully Initialized a type of account"))
        .catch((err) => {
            console.log("Something went wrong when you initialize a type of account: " + err);
        });

        await AccountTypes.create({
            id: 2,
            name: "Nhân viên"
        })
        .then(console.log("Successfully Initialized a type of account"))
        .catch((err) => {
            console.log("Something went wrong when you initialize a type of account: " + err);
        });
    }
}

AccountTypes.init({
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
    modelName: "AccountTypes"
});

module.exports = AccountTypes;
