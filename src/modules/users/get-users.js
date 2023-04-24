// imports
const database = require('../../db/database')

// get users
const GetUsers = async (req, res) => {
    let { username } = req.query

    if (username) {
        username = username.split("'").join('"')
        const users = await database.query(`SELECT * FROM users WHERE username LIKE '%${username}%'`)

        // delete key of object
        users.rows.map(user => delete user.password)

        // send response
        res.send({
            data: users.rows
        })
    } else {
        res.send({
            data: []
        })
    }
}

module.exports = GetUsers