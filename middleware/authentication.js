const jwt = require('jsonwebtoken')

exports.authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const tokenFromHeader = authHeader && authHeader.split(" ")[1];
    const tokenFromCookie = req.cookies.token;
    if (tokenFromHeader || tokenFromCookie) {
        jwt.verify(tokenFromHeader || tokenFromCookie, process.env.TOKEN_SCERET, (err) => {
            if (err) {
                res.status(401).json({ success: false, eee: err.message, message: "Error occurred during authentication!" })
            }
            else {
                next()
            }
        })
    }
    else {
        res.status(401).json({ success: false, message: 'Unauthorized!' })
    }
}


