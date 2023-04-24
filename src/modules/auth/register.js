// imports
const moment = require('moment')
const bcrypt = require('bcrypt')

// database
const database = require('../../db/database')

// register
const Register = async (req, res) => {
    // data
    let { full_name, username, password } = req.body
    full_name = full_name.split("'").join('"')
    username = username.split("'").join('"')
    password = password.split("'").join('"')

    // operations
    if (full_name && username && password) {
        // password to bcrypt
        const hashed_password = await bcrypt.hash(password, 10)

        // users
        const users = await database.query(`SELECT * FROM users WHERE username = '${username}'`)

        if (users.rows.length > 0) {
            users.rows.map(async (user) => {
                if (user.username !== username) {
                    database.query(`INSERT INTO users(full_name, username, password, date) VALUES ('${full_name}', '${username}', '${hashed_password}', '${moment().format()}')`, (err) => {
                        if (err) throw err
                        res.send({
                            message: "User is created!"
                        })
                    })
                } else {
                    res.status(400).send({
                        message: 'We have this user!'
                    })
                }
            })
        } else {
            database.query(`INSERT INTO users(full_name, username, password, date) VALUES ('${full_name}', '${username}', '${hashed_password}', '${moment().format()}')`, (err) => {
                if (err) throw err
                res.send({
                    message: "User is created!"
                })
            })
        }
    } else {
        // Unauthorized
        res.status(400).send({
            message: "Don't have all data"
        })
    }
}

module.exports = Register