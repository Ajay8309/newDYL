import mongoose from "mongoose";
import { GridFSBucket } from "mongodb";

let gfsBucket;

/**
 * Initialize GridFS bucket
 * Call this AFTER MongoDB connection is established
 */
export const initGridFS = () => {
    try {
        // Relaxed check for testing environments
        if (mongoose.connection.readyState !== 1) {
            console.warn("⚠️ Warning: Mongoose readyState is not 1 (Connected), but continuing GridFS init...");
        }

        gfsBucket = new GridFSBucket(mongoose.connection.db, {
            bucketName: "uploads"
        });

        console.log("✅ GridFSBucket initialized (uploads)");
        return gfsBucket;
    } catch (error) {
        console.error("❌ GridFSBucket initialization failed:", error);
        throw error;
    }
};

/**
 * Get the GridFS bucket instance
 */
export const getBucket = () => {
    if (!gfsBucket) {
        // Attempt to initialize if not done yet (lazy init)
        if (mongoose.connection.readyState === 1) {
            return initGridFS();
        }
        throw new Error("GridFSBucket not initialized. Connection might not be ready.");
    }
    return gfsBucket;
};

/**
 * Check if GridFS is ready
 */
export const isGridFSReady = () => {
    return gfsBucket !== null && gfsBucket !== undefined;
};
