// imports
const database = require('../../db/database')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

// Login
const Login = async (req, res) => {
    // data
    let {username, password} = req.body
    const users = await database.query(`SELECT * from users WHERE username = '${username}'`)

    username = username.split("'").join('"')
    password = password.split("'").join('"')

    // operations
    if(users.rows.length > 0) {
        users.rows.map(async (user) => {
            const boo = await bcrypt.compare(password, user.password)
            if(boo) {
                const access_token = await jwt.sign(user, process.env.JWT_SECRET_KEY)

                // delete some keys from object
                delete user.password
                delete user.date

                // send response
                res.send({
                    access_token,
                    user
                })
            } else {
                res.status(400).send({
                    message: "Username or password is incorrect!"
                })
            }
        })
    } else {
        res.status(400).send({
            message: "We don't have this user!"
        })
    }
}

module.exports = Login