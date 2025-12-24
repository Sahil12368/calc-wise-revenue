const jwt = require('jsonwebtoken');
const pool = require('../config/database');

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};

const requireAdmin = async (req, res, next) => {
  try {
    const [rows] = await pool.execute(
      'SELECT role FROM user_roles WHERE user_id = ?',
      [req.user.id]
    );
    
    if (rows.length === 0 || rows[0].role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }
    
    next();
  } catch (error) {
    return res.status(500).json({ error: 'Error checking permissions' });
  }
};

module.exports = { authenticateToken, requireAdmin };
