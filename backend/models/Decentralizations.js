const db = require("./db");
const sequelize = require("sequelize");
const Model = sequelize.Model;

class Decentralizations extends Model{ 
    static async initialize() {
        await Decentralizations.create({
            id: 1,
            name: "Nhân viên ngân hàng"
        })
        .then(console.log("Successfully Initialized a decentralization"))
        .catch((err) => {
            console.log("Something went wrong when you initialize a decentralization: " + err);
        });

        await Decentralizations.create({
            id: 2,
            name: "Quản lý"
        })
        .then(console.log("Successfully Initialized a decentralization"))
        .catch((err) => {
            console.log("Something went wrong when you initialize a decentralization: " + err);
        });
    }
}

Decentralizations.init({
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
    ModelName: "Decentralizations"
});

module.exports = Decentralizations;