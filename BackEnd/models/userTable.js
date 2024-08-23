const db = require('../config/mysql2');
const logger = require('../config/logger');

async function createUserTable() {
    try {
        const [rows] = await db.query("SHOW TABLES LIKE 'User';");

        if (rows.length === 0) {
            const createTableQuery = `
                CREATE TABLE User (
                    user_id INT AUTO_INCREMENT PRIMARY KEY,
                    username VARCHAR(50) UNIQUE NOT NULL,
                    password_hash VARCHAR(255) NOT NULL,
                    role ENUM('admin', 'manager', 'analyst') NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );
            `;

            await db.query(createTableQuery);
            logger.info('User table created successfully');
        } else {
            // logger.info('User table already exists');
        }
    } catch (error) {
        logger.error('Error creating User table:', error);
    }
}

createUserTable();
