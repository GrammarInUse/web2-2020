const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

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


const app = express();

const customerRoutes = require("./api/routes/customers");
const staffRoutes = require("./api/routes/staffs");

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

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use("/customers", customerRoutes);
app.use("/staffs", staffRoutes);

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

const port = process.env.PORT || 8080;
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
 