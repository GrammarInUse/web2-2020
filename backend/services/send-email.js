const nodeMailer = require("nodemailer");

async function Send(mailOptions){
    let transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'hlb0932055041@gmail.com',
            pass: 'Taolatao0' 
        }
    });

    return await transporter.sendMail(
        mailOptions
    ).then(console.log("Gui thanh cong")).catch("Gui khong duoc"); 
}

module.exports = Send;



