const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/mysql2');
const cookie = require('cookie');
const logger = require('../config/logger');


// Register a new user
const validRoles = ['admin', 'manager', 'analyst'];

module.exports.register = async (req, res) => {
    const { username, password, role } = req.body;

    if (!username || !password || !role) {
        const missingFieldsLog = { username, role };
        logger.warn('Registration attempt with missing fields', missingFieldsLog);
        return res.status(400).json({
            success: false,
            message: 'All fields (username, password, role) are required',
            data: missingFieldsLog
        });
    }

    if (!validRoles.includes(role)) {
        logger.warn('Registration attempt with invalid role', { role });
        return res.status(400).json({
            success: false,
            message: 'Invalid role specified',
            data: { role }
        });
    }

    try {
        const [rows] = await db.query('SELECT * FROM User WHERE username = ?', [username]);

        if (rows.length > 0) {
            logger.info('Registration attempt with existing username', { username });
            return res.status(400).json({
                success: false,
                message: 'Username already exists',
                data: { username }
            });
        }

        const hashedPassword = bcrypt.hashSync(password, 8);
        await db.query('INSERT INTO User (username, password_hash, role) VALUES (?, ?, ?)', [username, hashedPassword, role]);

        logger.info('New user registered successfully', { username, role });
        return res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: { username, role }
        });
    } catch (err) {
        logger.error('Error during user registration', { error: err.message, username });
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: err.message,
            data: { username }
        });
    }
};

// Login user
module.exports.login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        logger.warn('Login failed: Missing username or password');
        return res.status(400).json({ error: 'Username and password are required' });
    }

    try {
        const query = 'SELECT * FROM User WHERE username = ?';
        const [results] = await db.query(query, [username]);

        if (results.length === 0) {
            logger.warn('Login failed: User not found', { username });
            return res.status(404).json({ error: 'User not found' });
        }

        const user = results[0];
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);

        if (!isPasswordValid) {
            logger.warn('Login failed: Invalid password', { username });
            return res.status(401).json({ error: 'Invalid password' });
        }

        const token = jwt.sign({ id: user.user_id, role: user.role }, process.env.SECRET_KEY, { expiresIn: '24h' });

        const isSecure = req.secure || req.headers['x-forwarded-proto'] === 'https';
        const cookieOptions = {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: isSecure,
        };

        const tokenCookie = cookie.serialize('token', token, cookieOptions);
        res.setHeader('Set-Cookie', tokenCookie);


        logger.info('User login successful', { username, role: user.role });
        res.json({ success: 'User login successful', username, role: user.role });
    } catch (err) {
        logger.error('Error logging in user', { error: err.message });
        res.status(500).json({ error: 'Error logging in user' });
    }
};

// Logout user
module.exports.logout = (req, res) => {
    const isSecure = req.secure || req.headers['x-forwarded-proto'] === 'https';
    const emptyCookie = cookie.serialize('token', '', {
        expires: new Date(0),
        httpOnly: true,
        secure: isSecure,
    });

    res.setHeader('Set-Cookie', emptyCookie);
    logger.info('User logged out successfully');
    res.json({ success: true, message: 'Logout successful' });
};
