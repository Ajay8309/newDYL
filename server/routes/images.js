import express from 'express';
import { getBucket } from '../utils/gridfsBucket.js';

const router = express.Router();

// @route GET /api/images/:filename
// @desc Display Image
router.get('/:filename', async (req, res) => {
    try {
        const bucket = getBucket();
        const filename = req.params.filename;

        const files = await bucket.find({ filename }).toArray();

        if (!files || files.length === 0) {
            return res.status(404).json({ err: 'No file exists' });
        }

        const file = files[0];

        // Determine content type if missing or undefined
        let contentType = file.contentType;
        if (!contentType || contentType === 'undefined') {
            if (file.filename.match(/\.jpg$|\.jpeg$/i)) contentType = 'image/jpeg';
            else if (file.filename.match(/\.png$/i)) contentType = 'image/png';
            else if (file.filename.match(/\.gif$/i)) contentType = 'image/gif';
            else if (file.filename.match(/\.webp$/i)) contentType = 'image/webp';
            else contentType = 'application/octet-stream';
        }

        // Allow image types or if we forced one
        if (contentType.startsWith('image/') || file.contentType === undefined) {
            res.set({
                'Content-Type': contentType,
                'Content-Length': file.length,
                'Cache-Control': 'public, max-age=31536000',
                'Accept-Ranges': 'bytes'
            });

            const downloadStream = bucket.openDownloadStreamByName(filename);
            downloadStream.pipe(res);

            downloadStream.on('error', (error) => {
                console.error("Stream error:", error);
                if (!res.headersSent) {
                    res.status(404).json({ message: "Error streaming image" });
                }
            });
        } else {
            res.status(404).json({ err: 'Not an image' });
        }
    } catch (error) {
        console.error("GridFS Hint Error:", error);
        res.status(500).json({ err: 'Server Error' });
    }
});

export default router;
