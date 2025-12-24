const express = require('express');
const pool = require('../config/database');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// Get featured calculators (public)
router.get('/featured', async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM featured_calculators ORDER BY display_order ASC'
    );
    res.json(rows);
  } catch (error) {
    console.error('Error fetching featured calculators:', error);
    res.status(500).json({ error: 'Failed to fetch calculators' });
  }
});

// Add featured calculator (admin only)
router.post('/featured', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { calculator_id, display_order } = req.body;
    
    const [result] = await pool.execute(
      'INSERT INTO featured_calculators (calculator_id, display_order) VALUES (?, ?)',
      [calculator_id, display_order || 0]
    );

    res.json({ id: result.insertId, calculator_id, display_order });
  } catch (error) {
    console.error('Error adding featured calculator:', error);
    res.status(500).json({ error: 'Failed to add calculator' });
  }
});

// Update featured calculator (admin only)
router.put('/featured/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { display_order } = req.body;
    
    await pool.execute(
      'UPDATE featured_calculators SET display_order = ?, updated_at = NOW() WHERE id = ?',
      [display_order, req.params.id]
    );

    res.json({ success: true });
  } catch (error) {
    console.error('Error updating featured calculator:', error);
    res.status(500).json({ error: 'Failed to update calculator' });
  }
});

// Delete featured calculator (admin only)
router.delete('/featured/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    await pool.execute('DELETE FROM featured_calculators WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting featured calculator:', error);
    res.status(500).json({ error: 'Failed to delete calculator' });
  }
});

module.exports = router;
