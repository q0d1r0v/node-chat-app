// imports
const database = require('../db/database')
const moment = require('moment')

// Socket
const Socket = (socket) => {
    console.log("Socket user is connected!")

    socket.on('send-message', async (data) => {
        let { from_id, to_id, message } = data.data

        if (from_id && to_id && message) {
            // operations
            message = message.split("'").join('"')

            database.query(`INSERT INTO messages(from_user, to_user, message, date) VALUES ('${from_id}', '${to_id}', '${message}', '${moment().format()}')`)

            const messages = await database.query(`SELECT * FROM messages WHERE from_user = '${to_id}' OR to_user = '${to_id}'`)

            socket.broadcast.emit('return-get-messages', {
                messages: messages.rows
            })

            socket.emit('return-get-messages', {
                messages: messages.rows
            })

            socket.broadcast.emit('return-send-message', {
                messages: messages.rows
            })

            socket.emit('return-send-message', {
                messages: messages.rows
            })
        } else {
            socket.broadcast.emit('return-send-message', {
                message: 'Don\'t have all data'
            })
            socket.emit('return-send-message', {
                message: 'Don\'t have all data'
            })
        }
    })

    socket.on('get-messages', async (data) => {
        const { from_id, to_id } = data.data

        if (from_id && to_id) {
            const messages = await database.query(`SELECT * FROM messages WHERE from_user = '${to_id}' OR to_user = '${to_id}'`)
            socket.emit('return-get-messages', {
                messages: messages.rows
            })
        } else {

            socket.emit('return-send-message', {
                message: 'Don\'t have all data'
            })
        }
    })

    socket.on("disconnect", () => {
        console.log("Socket user is disconnected!")
    })
}

module.exports = Socket