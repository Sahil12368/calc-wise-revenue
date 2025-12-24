const express = require('express');
const pool = require('../config/database');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// Get settings (public)
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT `key`, `value` FROM site_settings');
    const settings = {};
    rows.forEach(row => {
      settings[row.key] = row.value;
    });
    res.json(settings);
  } catch (error) {
    console.error('Error fetching settings:', error);
    res.status(500).json({ error: 'Failed to fetch settings' });
  }
});

// Update setting (admin only)
router.put('/:key', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { value } = req.body;
    const { key } = req.params;

    await pool.execute(
      `INSERT INTO site_settings (\`key\`, \`value\`, updated_by, updated_at) 
       VALUES (?, ?, ?, NOW())
       ON DUPLICATE KEY UPDATE \`value\` = ?, updated_by = ?, updated_at = NOW()`,
      [key, value, req.user.id, value, req.user.id]
    );

    res.json({ success: true });
  } catch (error) {
    console.error('Error updating setting:', error);
    res.status(500).json({ error: 'Failed to update setting' });
  }
});

module.exports = router;
