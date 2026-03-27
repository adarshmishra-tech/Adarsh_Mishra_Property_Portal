const express = require('express');
const cors = require('cors');
const path = require('path');
const { router: authRouter } = require('./auth');
const propertyRouter = require('./properties');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// UNIVERSAL PATH: Automatically finds the client folder on any machine
const clientPath = path.join(__dirname, '..', 'client');

// 1. Serve static files (CSS, JS, Images)
app.use(express.static(clientPath));

// 2. API Routes
app.use('/api/auth', authRouter);
app.use('/api/properties', propertyRouter);

/**
 * 3. THE CATCH-ALL FIX
 * Instead of using '*' which crashes Node v24, we use a middleware 
 * function to serve index.html for any non-API request.
 */
app.use((req, res, next) => {
    if (req.url.startsWith('/api')) return next();
    res.sendFile(path.join(clientPath, 'index.html'));
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`-------------------------------------------`);
    console.log(`🚀 Property Portal Server Running!`);
    console.log(`👉 Local URL: http://localhost:${PORT}`);
    console.log(`📂 Serving Client from: ${clientPath}`);
    console.log(`-------------------------------------------`);
});