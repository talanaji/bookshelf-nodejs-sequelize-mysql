const jwt = require('jsonwebtoken')

// eslint-disable-next-line consistent-return
function checkAuth(req, res, next) {
    try {
        // const token = req.headers.authorization.split(" ")[1];
        const { token } = req.cookies

        const decodedToken = jwt.verify(token, "secret");
        req.userData = decodedToken;
        next();

    } catch (e) {

        return res.redirect("/login");
        /* return res.status(401).json({
        'message': "Invalid or expired token provided ",
        "error": e
        }) */

    }
}
module.exports = {
    checkAuth,
}