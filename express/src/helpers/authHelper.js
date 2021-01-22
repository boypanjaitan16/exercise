const jwt   = require('jsonwebtoken')

exports.generateAccessToken = (userId) => {
    // expires after half and hour (1800 seconds = 30 minutes)
    return jwt.sign({userId}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1800s' });
}

exports.responseSuccess = (res, data = [], status = 200) => {
    return res.status(status).json({
        code    : status,
        status  : "success",
        data
    })
}

exports.responseError = (res, err, code = 403) => {
    return res.status(code).json({
        code,
        status  : "error",
        message : err.message
    })
}

exports.responseFailed = (res, errors, code = 403) => {
    const message   = errors[0]?.msg;

    return res.status(403).json({
        code,
        status  : "failed",
        message,
        errors
    })
}