const express = require('express');
const app = express();
const port = 3000;

// Import routes
const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protected');

// Middleware to parse JSON requests
app.use(express.json());

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
