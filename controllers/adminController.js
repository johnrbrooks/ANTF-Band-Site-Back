const { Admin } = require('../models');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

const JWT_KEY = process.env.JWT_KEY;
const DEV = process.env.DEV === 'true' ? true : false;

const getAdmin = async (req, res) => {
    try {
        const { email } = req.params;
        const admin = await Admin.findOne({ email: email }).select('-password');

        if (!admin) {
            return res.status(404).json({ message: 'Admin not found.' });
        }

        return res.json(admin);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: 'Email and password are required',
            });
        }

        const normalizedEmail = email.toLowerCase();

        const admin = await Admin.findOne({ email: normalizedEmail });

        if (!admin) {
            return res
                .status(404)
                .json({ message: 'No admin was found with that email.' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials. ' });
        }

        admin.lastLogin = new Date();
        await admin.save();

        const token = jwt.sign({ adminId: admin._id }, JWT_KEY, {
            expiresIn: '7d', // 7 days
        });

        res.cookie('token', token, {
            httpOnly: true,
            secure: !DEV,
            sameSite: DEV ? 'lax' : 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res
                .status(400)
                .json({ message: 'Email and password is required' });
        }

        const normalizedEmail = email.toLowerCase();

        const alreadyExists = await Admin.findOne({ email: normalizedEmail });

        if (alreadyExists) {
            return res
                .status(400)
                .json({ message: 'An admin with this email already exists.' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newAdmin = await Admin.create({
            email: normalizedEmail,
            password: hashedPassword,
            lastLogin: Date.now(),
            role: 'admin',
        });

        // const token = jwt.sign({ adminId: newAdmin._id }, JWT_KEY, {
        //     expiresIn: '7d', // 7 days
        // });

        // res.cookie('token', token, {
        //     httpOnly: true,
        //     sameSite: 'none',
        //     secure: !DEV,
        //     maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        // });

        return res.status(201).json({
            message: 'New admin created successfully.',
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const logoutAdmin = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: !DEV,
            sameSite: DEV ? 'lax' : 'none',
        });

        res.status(200).json({ message: 'Logged out successfully.' });
    } catch (error) {
        return res.status(500).json({ message: 'Error logging out.' });
    }
};

const checkAuth = async (req, res) => {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({ message: 'Authenticated: false' });
        }

        const decoded = jwt.verify(token, JWT_KEY);
        const admin = await Admin.findById(decoded.adminId);

        if (!admin) {
            return res.status(404).json({ message: 'Admin not found.' });
        }

        return res.status(200).json({ authenticated: true });
    } catch (error) {
        return res.status(500).json({ message: 'Invalid or expired token.' });
    }
};

module.exports = {
    getAdmin,
    createAdmin,
    loginAdmin,
    logoutAdmin,
    checkAuth,
};
