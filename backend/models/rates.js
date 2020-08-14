const db = require("./db");
const sequelize = require("sequelize");
const Model = sequelize.Model;

class Rates extends Model{ 
    static async initialize(){
        await Rates.create({
            id: 1,
            name: ""
        })
        .then(console.log("Successfully Initialized a service!!!"))
        .catch((err) => {
            console.log("Successfully Initialized a service: " + err);
        });

        await Rates.create({
            id: 2,
            name: "Tài khoản tiết kiệm"
        })
        .then(console.log("Successfully Initialized a service!!!"))
        .catch((err) => {
            console.log("Successfully Initialized a service: " + err);
        });
    }
}

Rates.init({
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
    ModelName: "Rates"
});

module.exports = Rates;