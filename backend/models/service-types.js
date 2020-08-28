const db = require("./db");
const sequelize = require("sequelize");
const Model = sequelize.Model;

class ServiceTypes extends Model{ 
    static async initialize(){
        await ServiceTypes.create({
            id: 0,
            name: "Tài khoản thanh toán",
            value: 1.0,
            maturity: null,
            limit: 20000000
        })
        .then(console.log("Successfully Initialized a service!!!"))
        .catch((err) => {
            console.log("Successfully Initialized a service: " + err);
        });

        await ServiceTypes.create({
            id: 1,
            name: "Tài khoản tiết kiệm kỳ hạn 3 tháng",
            value: 5.0,
            maturity: 3
        })
        .then(console.log("Successfully Initialized a service"))
        .catch((err) => {
            console.log("Something went wrong when you initialize a service: " + err);
        });

        await ServiceTypes.create({
            id: 2,
            name: "Tài khoản tiết kiệm kỳ hạn 6 tháng",
            value: 5.5,
            maturity: 6
        })
        .then(console.log("Successfully Initialized a service"))
        .catch((err) => {
            console.log("Something went wrong when you initialize a service: " + err);
        });

        await ServiceTypes.create({
            id: 3,
            name: "Tài khoản tiết kiệm kỳ hạn 9 tháng",
            value: 6.0,
            maturity: 9
        })
        .then(console.log("Successfully Initialized a service"))
        .catch((err) => {
            console.log("Something went wrong when you initialize a service: " + err);
        });

        await ServiceTypes.create({
            id: 4,
            name: "Tài khoản tiết kiệm kỳ hạn 12 tháng",
            value: 6.5,
            maturity: 12
        })
        .then(console.log("Successfully Initialized a service"))
        .catch((err) => {
            console.log("Something went wrong when you initialize a service: " + err);
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
    },
    value: {
        type: sequelize.FLOAT,
        allowNull: false
    },
    maturity: {
        type: sequelize.INTEGER,
        allowNull: true
    },
    limit: {
        type: sequelize.INTEGER,
        allowNull: true
    }
},{
    sequelize: db,
    ModelName: "ServiceTypes"
});

module.exports = ServiceTypes;