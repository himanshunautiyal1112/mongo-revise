const jwt = require('jsonwebtoken');
const JWT_SECRATE = "12345ABCE";

function auth(req, res, next) {
    const token = req.headers.token;
    const decode = jwt.verify(token, JWT_SECRATE);

    if(decode) {
        req.userId = decode.userId;
        next();
    } else {
        res.status(403).json({
            message: "incorrect credential"
        })
    }
}

module.exports = {
    auth
}