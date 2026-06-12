require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes

// Get all members
app.get('/api/members', async (req, res) => {
    try {
        const allMembers = await pool.query('SELECT * FROM members ORDER BY id DESC');
        res.json(allMembers.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
});

// Get single member
app.get('/api/members/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const member = await pool.query('SELECT * FROM members WHERE id = $1', [id]);
        res.json(member.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
});

// Create new member
app.post('/api/members', async (req, res) => {
    try {
        const {
            surname, given_name, institution, dob, sex, marital_status,
            home_province, country, denomination, address, phone, mobile, email,
            college_university, member_role, year_of_graduation, field_of_study,
            graduate_program, fortnightly_amount, monthly_amount, yearly_amount,
            donation_amount, membership_type, membership_amount, membership_new_renewal,
            membership_number
        } = req.body;

        const newMember = await pool.query(
            `INSERT INTO members (
                surname, given_name, institution, dob, sex, marital_status,
                home_province, country, denomination, address, phone, mobile, email,
                college_university, member_role, year_of_graduation, field_of_study,
                graduate_program, fortnightly_amount, monthly_amount, yearly_amount,
                donation_amount, membership_type, membership_amount, membership_new_renewal,
                membership_number
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26) RETURNING *`,
            [
                surname, given_name, institution, dob, sex, marital_status,
                home_province, country, denomination, address, phone, mobile, email,
                college_university, member_role, year_of_graduation, field_of_study,
                graduate_program, fortnightly_amount, monthly_amount, yearly_amount,
                donation_amount, membership_type, membership_amount, membership_new_renewal,
                membership_number
            ]
        );
        res.json(newMember.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
});

// Update member status (for admin)
app.put('/api/members/:id/status', async (req, res) => {
    try {
        const { id } = req.params;
        const { application_status } = req.body;
        const updatedMember = await pool.query(
            'UPDATE members SET application_status = $1 WHERE id = $2 RETURNING *',
            [application_status, id]
        );
        res.json(updatedMember.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
});

// Delete member
app.delete('/api/members/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM members WHERE id = $1', [id]);
        res.json({ message: 'Member deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
