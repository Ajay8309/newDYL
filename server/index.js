import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
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
app.use(cors());
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
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static(path.join(__dirname, '../DYL/dist')));

    app.get('*', (req, res) => {
        // Skip API routes
        if (req.path.startsWith('/api')) {
            return res.status(404).json({ message: 'API endpoint not found' });
        }
        res.sendFile(path.resolve(__dirname, '../DYL', 'dist', 'index.html'));
    });
} else {
    app.get('/', (req, res) => {
        res.send('Decode Your Life Style API is running...');
    });
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
