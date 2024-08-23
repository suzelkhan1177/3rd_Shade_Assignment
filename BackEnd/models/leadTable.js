const db = require('../config/mysql2');
const logger = require('../config/logger');

async function createLeadsTable() {
    try {
        const [rows] = await db.query("SHOW TABLES LIKE 'Leads';");

        if (rows.length === 0) {
            const createTableQuery = `
                CREATE TABLE Leads (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    partner_id INT NOT NULL,
                    name VARCHAR(100) NOT NULL,
                    contact_number VARCHAR(20) NOT NULL,
                    email VARCHAR(100) NOT NULL,
                    lead_source ENUM('Social Media', 'Referral', 'Website', 'Other') NOT NULL,
                    lead_interest TEXT,
                    additional_notes TEXT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (partner_id) REFERENCES ChannelPartners(id) ON DELETE CASCADE
                );
            `;

            await db.query(createTableQuery);
            logger.info('Leads table created successfully');
        } else {
            // logger.info('Leads table already exists');
        }
    } catch (error) {
        logger.error('Error creating Leads table:', error);
    }
}

createLeadsTable();