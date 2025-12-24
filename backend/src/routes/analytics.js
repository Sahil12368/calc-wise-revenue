const express = require('express');
const pool = require('../config/database');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// Log page visit (public)
router.post('/visit', async (req, res) => {
  try {
    const { page_path, referrer, visitor_id, user_agent } = req.body;
    
    await pool.execute(
      'INSERT INTO page_visits (page_path, referrer, visitor_id, user_agent) VALUES (?, ?, ?, ?)',
      [page_path, referrer || null, visitor_id || null, user_agent || null]
    );

    res.json({ success: true });
  } catch (error) {
    console.error('Error logging visit:', error);
    res.status(500).json({ error: 'Failed to log visit' });
  }
});

// Get analytics (admin only)
router.get('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const [visits] = await pool.execute(
      `SELECT page_path, COUNT(*) as count, DATE(created_at) as date 
       FROM page_visits 
       WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
       GROUP BY page_path, DATE(created_at)
       ORDER BY date DESC`
    );

    res.json(visits);
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

module.exports = router;
