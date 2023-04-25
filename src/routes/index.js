// imports
const express = require('express')

// router
const router = express()


// modules
const Register = require('../modules/auth/register')
const Login = require('../modules/auth/login')
const IndexRoute = require('../modules/index/index')
const GetUsers = require('../modules/users/get-users')

// index route
router.get('/', IndexRoute)

// register route
router.post('/auth/register', Register)

// login route
router.post('/auth/login', Login)

// get users
router.get('/api/get-users', GetUsers)


module.exports = router