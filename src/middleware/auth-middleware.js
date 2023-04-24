const AuthMiddleware = (req, res, next) => {
    if (req.url === "/auth/login" || req.url === "/auth/register") {
        next()
    } else if (req.headers.authorization) {
        console.log(req.headers.authorization)
    } else {
        res.status(401).send({
            message: "Unauthorized"
        })
    }
}

module.exports = AuthMiddleware