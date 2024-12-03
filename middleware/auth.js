const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId;
        const role = decodedToken.role;
        req.auth = {
            userId: userId,
            role: role
        };
        next(); // Call the next middleware function
    } catch (error) {
        return res.status(401).json({ message: "Vous n'êtes pas autorisé." }); // Correct message
    }
};

const roleMiddleware = (roles) => (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;
    const role = decodedToken.role;
    req.auth = {
        userId: userId,
        role: role
    };
if (!roles.includes(role)) {
        return res.status(403).json({ error: 'Access denied' });
    }
    next();
};

module.exports = { authMiddleware, roleMiddleware };
