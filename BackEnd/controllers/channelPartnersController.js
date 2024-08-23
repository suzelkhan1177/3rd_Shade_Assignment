const pool = require('../config/mysql2');
const logger = require('../config/logger');

module.exports.GetChannelPartner = async (req, res) => {
    try {
        logger.info('Fetching channel partners');
        const [channelPartners] = await pool.query('SELECT * FROM ChannelPartners');
        logger.info('Channel partners fetched successfully');
        res.status(200).json(channelPartners);
    } catch (err) {
        logger.error('Error fetching channel partners: ', err);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports.PostChannelPartner = async (req, res) => {
    const { name, contact_number, email } = req.body;
    const code = generateUniqueCode();

    if (!isValidEmail(email)) {
        logger.warn('Invalid email format: ', email);
        return res.status(400).json({ message: 'Invalid email format' });
    }

    if (!isValidPhoneNumber(contact_number)) {
        logger.warn('Invalid phone number format: ', contact_number);
        return res.status(400).json({ message: 'Invalid phone number format' });
    }

    try {
        logger.info('Checking for existing channel partner');
        const [existingContact] = await pool.query(
            'SELECT * FROM ChannelPartners WHERE email = ? OR contact_number = ?',
            [email, contact_number]
        );

        if (existingContact.length > 0) {
            if (existingContact[0].email === email) {
                logger.warn('Channel Partner with this email already exists: ', email);
                return res.status(400).json({ message: 'Channel Partner with this email already exists' });
            }
            if (existingContact[0].contact_number === contact_number) {
                logger.warn('Channel Partner with this phone number already exists: ', contact_number);
                return res.status(400).json({ message: 'Channel Partner with this phone number already exists' });
            }
        }

        // Check if the Channel Partner code is unique
        const [existingPartner] = await pool.query('SELECT * FROM ChannelPartners WHERE code = ?', [code]);
        if (existingPartner.length > 0) {
            logger.warn('Channel Partner with this code already exists: ', code);
            return res.status(400).json({ message: 'Channel Partner with this code already exists' });
        }

        // Insert the new Channel Partner
        await pool.query(
            'INSERT INTO ChannelPartners (code, name, contact_number, email) VALUES (?, ?, ?, ?)',
            [code, name, contact_number, email]
        );

        logger.info('Channel Partner created successfully: ', { name, contact_number, email });
        res.status(201).json({ message: 'Channel Partner created successfully' });
    } catch (err) {
        logger.error('Error creating channel partner: ', err);
        res.status(500).json({ message: 'Server error' });
    }
};

const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const isValidPhoneNumber = (phoneNumber) => {
    const phoneNumberRegex = /^\d{10}$/;
    return phoneNumberRegex.test(phoneNumber);
};

const generateUniqueCode = () => {
    return Math.random().toString(36).substr(2, 5).toUpperCase();
};
