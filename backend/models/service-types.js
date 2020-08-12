const db = require("./db");
const sequelize = require("sequelize");
const Model = sequelize.Model;

class ServiceTypes extends Model{ 
    static async initialize(){
        await ServiceTypes.create({
            id: 1,
            name: "Tài khoản thanh toán"
        })
        .then(console.log("Successfully Initialized a service!!!"))
        .catch((err) => {
            console.log("Successfully Initialized a service: " + err);
        });

        await ServiceTypes.create({
            id: 2,
            name: "Tài khoản tiết kiệm"
        })
        .then(console.log("Successfully Initialized a service!!!"))
        .catch((err) => {
            console.log("Successfully Initialized a service: " + err);
        });
    }
}

ServiceTypes.init({
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
    ModelName: "ServiceTypes"
});

module.exports = ServiceTypes;