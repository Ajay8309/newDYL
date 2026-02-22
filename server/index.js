import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Route imports
import authRoutes from './routes/auth.js';
import postRoutes from './routes/posts.js';
import uploadRoutes from './routes/upload.js';
import imageRoutes from './routes/images.js';
import bookingRoutes from './routes/bookings.js';
import { initGridFS } from './utils/gridfsBucket.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
    helmet({
        crossOriginResourcePolicy: false,
    })
);
app.use(cors({
    origin: process.env.NODE_ENV === 'production'
        ? ['https://decodeyourlife.in', 'https://www.decodeyourlife.in']// Replace with actual production domain
        : ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true
}));
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB Connected');
        initGridFS();
    })
    .catch(err => console.error('MongoDB Connection Error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/images', imageRoutes);
app.use('/api/bookings', bookingRoutes);

// Serve static assets in production
const clientDistPath = path.join(__dirname, '../DYL/dist');
const clientIndexHtml = path.join(clientDistPath, 'index.html');

console.log('Static configuration:');
console.log('- __dirname:', __dirname);
console.log('- clientDistPath:', clientDistPath);
console.log('- index.html exists:', fs.existsSync(clientIndexHtml));

if (process.env.NODE_ENV === 'production') {
    // We try to serve static files if the directory exists, even if index.html isn't there yet
    if (fs.existsSync(clientDistPath)) {
        app.use(express.static(clientDistPath));
    }

    // Explicitly serve sitemap.xml and robots.txt
    app.get('/sitemap.xml', (req, res) => {
        const sitemapPath = path.join(clientDistPath, 'sitemap.xml');
        if (fs.existsSync(sitemapPath)) {
            res.header('Content-Type', 'application/xml');
            res.sendFile(sitemapPath);
        } else {
            res.status(404).send('Sitemap not found');
        }
    });

    app.get('/robots.txt', (req, res) => {
        const robotsPath = path.join(clientDistPath, 'robots.txt');
        if (fs.existsSync(robotsPath)) {
            res.header('Content-Type', 'text/plain');
            res.sendFile(robotsPath);
        } else {
            res.status(404).send('Robots.txt not found');
        }
    });

    app.get(/.*/, (req, res) => {
        // Skip API routes
        if (req.path.startsWith('/api')) {
            return res.status(404).json({ message: 'API endpoint not found' });
        }

        // Skip common static file extensions to prevent serving index.html for missing assets
        if (req.path.match(/\.(xml|txt|png|jpg|jpeg|gif|svg|ico|css|js|mp4|webm)$/) || req.path.includes('/assets/')) {
            return res.status(404).send('Not found');
        }

        res.sendFile(clientIndexHtml);
    });
} else {
    app.get('/', (req, res) => {
        res.send('Decode Your Life Style API is running...');
    });
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
