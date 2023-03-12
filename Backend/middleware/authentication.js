const jwt = require('jsonwebtoken')

exports.authenticate = (req, res, next) => {
    const authCookie = req.cookies.token;
    const authHeader = req.headers.token

    if (authHeader || authCookie) {
        jwt.verify(authHeader || authCookie, process.env.TOKEN_SCERET, (err, decodedToken) => {
            if (err) {
                if (err) res.status(401).json({ success: false, message: "Token is not valid!" })
            }
            else {
                // Add the decoded token to the request object
                req.admin = decodedToken;
                next()
            }
        })
    }
    else {
        res.status(401).json({ success: false, message: 'Unauthorized!' })
    }
}


