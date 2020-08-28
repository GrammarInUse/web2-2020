const sequelize = require("sequelize");
const Model = sequelize.Model;

const db = require("./db");

class CurrencyUnits extends Model{
    static async initialize() {
        await CurrencyUnits.create({
            name: "VND"
        })
        .then(console.log("Successfully Initialized a currency unit"))
        .catch((err) => {
            console.log("Something went wrong when you initialize a currency unit: " + err);
        });

        await CurrencyUnits.create({
            name: "$"
        })
        .then(console.log("Successfully Initialized a currency unit"))
        .catch((err) => {
            console.log("Something went wrong when you initialize a currency unit: " + err);
        });
    }
}

CurrencyUnits.init({
    id: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sequelize.TEXT,
        allowNull: false,
        unique: true
    }
},{
    sequelize: db,
    modelName: "CurrencyUnits"
});

module.exports = CurrencyUnits;
