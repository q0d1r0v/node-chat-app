// imports
const express = require('express')
const cors = require('cors')

// router
const router = require('./src/routes/index')

// config global variables
require('dotenv').config()

// server
const server = express()

// use server
server.use(express.json())
server.use(cors())

// middleware
const AuthMiddleware = require('./src/middleware/auth-middleware')

// router
server.use('/', AuthMiddleware, router)

// port data
const port = process.env.PORT || 3000

// listen
server.listen(port, () => {
    console.log("Server is running on port " + port)
})

