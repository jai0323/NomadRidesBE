const jwt = require('jsonwebtoken');
const db = require('../config/dbConn');

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    const token = authHeader.split(' ')[1]
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403);
            try {
                let sqlGetUser = 'SELECT * FROM users WHERE user_id = ?';
                db.query(sqlGetUser, decoded.user_id, (error, result) => {
                    if (error) {
                        console.log("verifyJWT.js line:17");
                        console.log(error);
                        return res.status(500).json({ msg: "Database error" });
                    }
                    else if (result.length == 0 || result == null) {
                        return res.status(403).json({ msg: "user does not exist" });
                    }
                    req.user = result[0];
                    next();
                });
            }
            catch (error) {
                console.log("verifyJWT.js line:29");
                console.log(error);
                return res.status(500).json({ msg: "Internal server error" });
            }
        }
    )
}

module.exports = verifyJWT;