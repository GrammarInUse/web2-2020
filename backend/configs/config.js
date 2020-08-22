require('dotenv').config();
module.exports={
    DATABASE_URL: process.env.DATABASE_URL,
    PORT: process.env.PORT || 8080,
    SECRET_KEY: process.env.SECRET_KEY,
    USER_EMAIL: process.env.USER_EMAIL,
    PASSWORD_EMAIL: process.env.PASSWORD_EMAIL
}