const mariadb = require('mariadb'); 
const dotenv = require('dotenv');
dotenv.config();

async function  connection(){
    const pool = mariadb.createPool({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        port:process.env.DATABASE_PORT,
        password:process.env.DATABASE_PWD,
        database:process.env.DATABASE_NAME,
        connectionLimit: 5
    })

    return pool;
}


module.exports = connection;
