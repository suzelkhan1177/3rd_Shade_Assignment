const db = require('../config/mysql2');
const logger = require('../config/logger');

async function createChannelPartnersTable() {
    try {
        const [rows] = await db.query("SHOW TABLES LIKE 'ChannelPartners';");

        if (rows.length === 0) {
            const createTableQuery = `
                CREATE TABLE ChannelPartners (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    code VARCHAR(50) UNIQUE NOT NULL,
                    name VARCHAR(100) NOT NULL,
                    contact_number VARCHAR(20) NOT NULL,
                    email VARCHAR(100) NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );
            `;

            await db.query(createTableQuery);
            logger.info('ChannelPartners table created successfully');
        } else {
            // logger.info('ChannelPartners table already exists');
        }
    } catch (error) {
        logger.error('Error creating ChannelPartners table:', error);
    }
}

createChannelPartnersTable();