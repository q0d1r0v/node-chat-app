// imports
const express = require('express')

// router
const router = express()


// modules
const Register = require('../modules/auth/register')
const Login = require('../modules/auth/login')

// index route
router.get('/', (req, res) => {
    console.log("Hello world")

    res.send("Hello world")
})

// register route
router.use('/auth/register', Register)

// login route
router.use('/auth/login', Login)


module.exports = router