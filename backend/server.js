const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const helmet = require('helmet');
const dotenv = require('dotenv');
const UploadFile = require("express-fileupload");
const cors = require("cors");
const path = require("path");
dotenv.config();
const multer = require("multer");
const aliasesLike = require("sequelize").Op.like;

const CurrencyUnits = require("./models/currency-unit");
const AccountTypes = require("./models/account-types");
const Accounts = require("./models/accounts");
const ServiceTypes = require("./models/service-types");
const Services = require("./models/services");
const InformationUser = require("./models/information-user");
const Decentralizations = require("./models/Decentralizations");
const Staffs = require("./models/staffs");
const TransactionStatus = require("./models/transaction-status");
const Transactions = require("./models/transactions");
const IdentityCard = require("./models/identity-card");


const app = express();
//app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

const customerRoutes = require("./api/routes/customers");
const staffRoutes = require("./api/routes/staffs");
const { PORT } = require("./configs/config");

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Expose-Headers", "Authorization");

    if(req.method === "OPTIONS"){
        res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, PUT");

        return res.status(200).json({});
    }

    next();
});

app.use(helmet());
app.use(morgan("dev"));
app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))

app.use("/customers", customerRoutes);
app.use("/staffs", staffRoutes);

app.get("/getRates", async (req, res) => {
    const listOfRates = await ServiceTypes.findAll({
        where: {
            name: {
                $like: "%tiết kiệm%"
            }
        }
    });

    console.log(listOfRates);

    res.status(200).json({
        userMessage: "DONE",
        data: listOfRates
    });
})

app.get("/", async (req, res) => {
    await TransactionStatus.initialize();
    await Decentralizations.initialize();
    await ServiceTypes.initialize();
    await AccountTypes.initialize();
    await CurrencyUnits.initialize();
    res.send({
        status: "Successfully Initialized Data!!"
    });
});

app.use((req, res, next) => {
    const error = new Error("404 - Page not found!");
    error.status = 404;

    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: error.message
    });
});

const port = PORT;
app.listen(port, () => {
    var test = null;
    console.log(`${test} have type is ${typeof(test)} You are listening at port: ${port}`);
});

/**
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */
 