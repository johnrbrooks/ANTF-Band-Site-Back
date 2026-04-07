const jwt = require('jsonwebtoken');
const { Admin } = require('../models/admin');

const JWT_KEY = process.env.JWT_KEY;

if (!JWT_KEY) {
    throw new Error('JWT_KEY is not set');
}

const requireAuth = async (req, res, next) => {
    try {
        let token = req.cookies?.token;

        if (!token) {
            return res
                .status(401)
                .json({ message: 'Not authenticated. Please log in.' });
        }

        const decoded = jwt.verify(token, JWT_KEY);
        const adminId = decoded.adminId;

        if (!adminId) {
            return res.status(401).json({ message: 'Invalid token.' });
        }

        const admin = await Admin.findById(adminId);

        if (!admin) {
            return res.status(401).json({ message: 'Admin does not exist.' });
        }

        req.adminId = admin._id;

        return next();
    } catch (error) {
        console.error('Verification error:', error.message);
        if (error.name === 'TokenExpiredError') {
            return res
                .status(401)
                .json({ message: 'Session expired. Please log in again.' });
        }
        return res
            .status(401)
            .json({ message: 'Invalid token. Please log in again.' });
    }
};

module.exports = {
    requireAuth,
};
