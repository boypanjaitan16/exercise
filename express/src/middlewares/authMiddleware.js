const {responseError} = require('../helpers/authHelper')
const jwt   = require('jsonwebtoken')

exports.verifyToken = (req, res, next) => {
    // Gather the jwt access token from the request header
    const authHeader    = req.headers['authorization']
    const token         = authHeader && authHeader.split(' ')[1]
    if (!token){
        return responseError(res, {message : 'No authorization token submitted'}, 401)
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err){
            return responseError(res, 
                {message : 'Your session is expired, sign-in again to continue'}, 401)
        }

        req.user = user
        next() // pass the execution off to whatever request the client intended
    })
}