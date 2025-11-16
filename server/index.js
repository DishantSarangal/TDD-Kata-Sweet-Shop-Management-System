require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const sweetRoutes = require('./routes/sweets');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/sweets', sweetRoutes);

// Export app BEFORE connecting to DB or starting server
module.exports = app;

// Only start server if NOT in test environment
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      console.log('Mongo connected');
      app.listen(process.env.PORT || 5000, () =>
        console.log('Server running')
      );
    })
    .catch(err => console.error(err));
}
