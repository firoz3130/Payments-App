require('dotenv').config();
const jwt = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log(authHeader)
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({});
    }
    console.log("Inside authMiddleware else")
    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded contains "+JSON.stringify(decoded));
        req.userId = decoded.userId;

        next(); 
    } catch (err) {
        return res.status(403).json({});
    }
};

module.exports = {
    authMiddleware
}