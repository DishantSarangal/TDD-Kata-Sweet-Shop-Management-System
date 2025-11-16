const jwt = require('jsonwebtoken');
const User = require('../models/user.model.js');

module.exports = {
  authRequired: async (req, res, next) => {
    const header = req.headers.authorization;
    if(!header) return res.status(401).json({ message: 'No token' });
    const token = header.split(' ')[1];
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(payload.id).select('-password');
      next();
    } catch (e) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  },
  requireAdmin: (req, res, next) => {
    if(req.user && req.user.role === 'admin') return next();
    return res.status(403).json({ message: 'Admin required' });
  }
};
