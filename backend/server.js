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
app.use(express.static(path.join(__dirname, 'public')));

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

app.use(helmet());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use("/customers", customerRoutes);
app.use("/staffs", staffRoutes);

//TEST UPLOAD
const uploadPath = path.join(__dirname, "../", "images");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        //const newFileName = `${uuidv4()}${path.extname(file.originalname)}`;
        //   const newFileName = "tend.jpg";
        //   cb(null, newFileName);
        cb(null, file.originalname);
    }
});
  
var fileFilter = function (req, file, cb) {
    if (file.mimetype === 'application/zip'){
        req.fileValidationError = 'goes wrong on the mimetype';
        return cb(new Error('mimetype does not match application/zip. upload rejected'));
    }

    console.log('>> fileFilter good = ', file.mimetype);
    cb(null, true);
}

const upload = multer({ storage: storage });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/upload', upload.single('file'), (req, res) => {
    console.log(req.file);
    res.status(200).json({
        userMessage: "DONE"
    })
});


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

const port = process.env.PORT;
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
 