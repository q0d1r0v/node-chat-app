// imports
const {Client} = require('pg')
require('dotenv').config()

const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
})

client.connect((err) => {
    if(err) {
        console.log(err)
    } else {
        console.log("Connected to db")
    }
})

module.exports = client