const pool = require('../config/mysql2');
const logger = require('../config/logger');

module.exports.NewLead = async (req, res) => {
    const { partnerCode, name, contact_number, email, lead_source, lead_interest, additional_notes } = req.body;

     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     const contactNumberRegex = /^\d{10}$/;
     const validLeadSources = ['Social Media', 'Referral', 'Website', 'Other'];
 
     if (!emailRegex.test(email)) {
         logger.warn(`Invalid email format: ${email}`);
         return res.status(400).json({ error: 'Invalid email format' });
     }
 
     if (!contactNumberRegex.test(contact_number)) {
         logger.warn(`Invalid contact number format: ${contact_number}`);
         return res.status(400).json({ error: 'Invalid contact number format' });
     }
 
     if (!validLeadSources.includes(lead_source)) {
        logger.warn(`Invalid lead source: ${lead_source}`);
        return res.status(400).json({ error: 'Invalid lead source' });
    }

    try {
        const [partner] = await pool.query('SELECT id FROM ChannelPartners WHERE code = ?', [partnerCode]);
        if (partner.length === 0) {
            logger.warn(`Invalid Channel Partner Code: ${partnerCode}`);
            return res.status(400).json({ error: 'Invalid Channel Partner Code' });
        }

        const partnerId = partner[0].id;
        await pool.query('INSERT INTO Leads (partner_id, name, contact_number, email, lead_source, lead_interest, additional_notes) VALUES (?, ?, ?, ?, ?, ?, ?)', 
        [partnerId, name, contact_number, email, lead_source, lead_interest, additional_notes]);

        logger.info(`New lead submitted by partner code ${partnerCode}`);
        res.status(201).json({ message: 'Lead submitted successfully' });
    } catch (err) {
        logger.error('Server error in NewLead:', err);
        res.status(500).json({ error: 'Server error' });
    }
}

module.exports.Filtering = async (req, res) => {
    const { partnerCode, timeframe, leadSource, leadInterest } = req.query;
    let query = 'SELECT * FROM Leads WHERE 1=1';
    let params = [];

    if (partnerCode) {
        query += ' AND partner_id = (SELECT id FROM ChannelPartners WHERE code = ?)';
        params.push(partnerCode);
    }

    if (timeframe) {
        query += ' AND created_at >= DATE_SUB(NOW(), INTERVAL ? DAY)';
        params.push(timeframe);
    }

    if (leadSource) {
        query += ' AND lead_source = ?';
        params.push(leadSource);
    }

    if (leadInterest) {
        query += ' AND lead_interest LIKE ?';
        params.push(`%${leadInterest}%`);
    }

    try {
        const [rows] = await pool.query(query, params);
        logger.info(`Filtering leads with params: ${JSON.stringify(req.query)}`);
        res.json(rows);
    } catch (err) {
        logger.error('Server error in Filtering:', err);
        res.status(500).json({ error: 'Server error' });
    }
}

module.exports.createCSV = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Leads');
        const csv = rows.map(row => Object.values(row).join(',')).join('\n');
        logger.info('CSV file created for all leads');
        res.header('Content-Type', 'text/csv');
        res.attachment('leads.csv');
        res.send(csv);
    } catch (err) {
        logger.error('Server error in createCSV:', err);
        res.status(500).json({ error: 'Server error' });
    }
}

module.exports.GetAllLeads = async (req, res) => {
    try {
        const [leads] = await pool.query(`
            SELECT 
                Leads.id AS lead_id,
                ChannelPartners.code AS partner_code,
                Leads.name AS lead_name,
                Leads.contact_number AS lead_contact_number,
                Leads.email AS lead_email,
                Leads.lead_source,
                Leads.lead_interest,
                Leads.additional_notes,
                Leads.created_at AS lead_created_at
            FROM 
                Leads
            JOIN 
                ChannelPartners ON Leads.partner_id = ChannelPartners.id;
        `);

        if (leads.length === 0) {
            logger.warn('No leads found');
            return res.status(404).json({ error: 'No leads found' });
        }

        logger.info('Leads fetched successfully');
        res.json(leads);
    } catch (err) {
        logger.error('Server error in GetAllLeads:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

