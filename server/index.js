const express = require('express');
const cors = require('cors');
const path = require('path');
const { router: authRouter } = require('./auth');
const propertyRouter = require('./properties');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

/**
 * UNIVERSAL PATH LOGIC:
 * __dirname is the current folder (server).
 * '..' moves up one level to the project root.
 * 'client' moves into the frontend folder.
 * This works on YOUR computer and the RECRUITER'S computer.
 */
const clientPath = path.join(__dirname, '..', 'client');

// 1. Serve static files (CSS, JS, images)
app.use(express.static(clientPath));

// 2. API Routes
app.use('/api/auth', authRouter);
app.use('/api/properties', propertyRouter);

/**
 * 3. THE FIX FOR NODE v24 / EXPRESS v5
 * This function catches any request that isn't an API call 
 * and sends the index.html file.
 */
app.use((req, res, next) => {
    // If the request starts with /api, let it pass to see if it's a 404
    if (req.url.startsWith('/api')) {
        return next();
    }
    // Otherwise, serve the frontend
    res.sendFile(path.join(clientPath, 'index.html'));
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`-------------------------------------------`);
    console.log(`🚀 Server started!`);
    console.log(`👉 Access the app at: http://localhost:${PORT}`);
    console.log(`-------------------------------------------`);
});