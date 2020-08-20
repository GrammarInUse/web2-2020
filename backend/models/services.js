const db = require("./db");
const sequelize = require("sequelize");
const Model = sequelize.Model;
const Accounts = require("./accounts");
const ServiceTypes = require("./service-types");

class Services extends Model{ 
    static async getSTT() {
        const temp = await Services.findAll();

        return temp.length + 1;
    }
}

Services.init({
    id: {
        type: sequelize.TEXT,
        primaryKey: true
    },
    balance: {
        type: sequelize.BIGINT,
        allowNull: false,
        defaultValue: 0
    },
    //Ngày đáo hạn(Ngày đóng)
    maturity: {
        type: sequelize.DATE,
        allowNull: true
    },
    serviceType: {
        type: sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
        references: {
            key: "id",
            model: ServiceTypes
        }
    },
    accountId: {
        type: sequelize.TEXT,
        allowNull: false,
        unique: true,
        references: {
            key: "id",
            model: Accounts
        }
    }
},{
    sequelize: db,
    ModelName: "Services"
});

Services.belongsTo(Accounts,{foreignKey: "accountId"})
Services.belongsTo(ServiceTypes,{foreignKey:"serviceType"})
module.exports = Services; 