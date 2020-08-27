const nodeMailer = require("nodemailer");
const { USER_EMAIL, PASSWORD_EMAIL } = require("../configs/config");
require('dotenv').config();

async function Send(mailOptions){
    let transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: USER_EMAIL,
            pass: PASSWORD_EMAIL 
        }
    });

    return await transporter.sendMail(
        mailOptions
    ).then(console.log("Gui thanh cong")).catch("Gui khong duoc"); 
}

module.exports = Send;



