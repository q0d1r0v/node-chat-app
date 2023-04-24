// imports
const express = require('express')

// router
const router = express()


// modules
const Register = require('../modules/auth/register')
const Login = require('../modules/auth/login')
const GetUsers = require('../modules/users/get-users')

// index route
router.get('/', (req, res) => {
    console.log("Docs route")

    res.send("Docs route")
})

// register route
router.post('/auth/register', Register)

// login route
router.post('/auth/login', Login)

// get users
router.get('/api/get-users', GetUsers)


module.exports = router