// imports
const http = require('http')
const express = require('express')
const {Server} = require('socket.io')
const cors = require('cors')

// router
const router = require('./src/routes/index')

// import socket module
const Socket = require('./src/socket/index')

// config global variables
require('dotenv').config()

// server
const server = express()

// socket server
const http_server = http.createServer(server)
const io = new Server(http_server, {
    cors: {
        allowedHeaders: true
    }
})

// use server
server.use(express.json())
server.use(cors())

// middleware
const AuthMiddleware = require('./src/middleware/auth-middleware')

// router
server.use('/', AuthMiddleware, router)

// socket
io.on('connection', Socket)

// port data
const port = process.env.PORT || 3000

// express listen
server.listen(port, () => {
    console.log("Server is running on port " + port)
})

// http socket server
http_server.listen(3001, () => {
    console.log("Http server is running on port 3001")
})
