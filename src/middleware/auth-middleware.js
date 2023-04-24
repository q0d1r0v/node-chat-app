// imports
const jwt = require('jsonwebtoken')

// auth middleware
const AuthMiddleware = async (req, res, next) => {
    
    // operations
    if (req.url === "/auth/login" || req.url === "/auth/register") {
        next()
    } else if (req.headers.authorization) {
        try {
            await jwt.verify(req.headers.authorization.split("Bearer ")[1], process.env.JWT_SECRET_KEY)
            next()
        } catch (e) {
            res.status(401).send({
                message: "Unauthorized"
            })
        }
    } else {
        res.status(401).send({
            message: "Unauthorized"
        })
    }
}

module.exports = AuthMiddleware