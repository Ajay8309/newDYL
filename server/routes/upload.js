import express from 'express';
import multer from 'multer';
import { Readable } from 'stream';
import { getBucket } from '../utils/gridfsBucket.js';

const router = express.Router();

// Use memory storage
const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// @route POST /api/upload
// @desc  Uploads file to DB
router.post('/', upload.single('image'), async (req, res) => {
    console.log("Receiving upload request...");
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        console.log("File received:", req.file.originalname, "Mimetype:", req.file.mimetype);

        const bucket = getBucket();
        const filename = `${Date.now()}-${req.file.originalname}`;

        const uploadStream = bucket.openUploadStream(filename, {
            contentType: req.file.mimetype
        });

        const readable = Readable.from(req.file.buffer);
        readable.pipe(uploadStream);

        await new Promise((resolve, reject) => {
            uploadStream.on('finish', resolve);
            uploadStream.on('error', reject);
        });

        // Return the URL that the frontend expects
        const fileUrl = `http://localhost:${process.env.PORT}/api/images/${filename}`;

        res.json(fileUrl);
    } catch (err) {
        console.error("Upload Error:", err);
        res.status(500).json({
            message: 'Upload failed',
            error: err.message
        });
    }
});

export default router;
