import mongoose from "mongoose";
import { initGridFS, getBucket } from "./utils/gridfsBucket.js";
import 'dotenv/config';

const debugGridFS = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB.");

        initGridFS();
        const bucket = getBucket();

        // Find latest 5 files
        const files = await bucket.find().sort({ uploadDate: -1 }).limit(5).toArray();
        console.log(`Found ${files.length} recent files in 'uploads' bucket.`);

        if (files.length > 0) {
            files.forEach(f => {
                console.log(` - Filename: ${f.filename}`);
                console.log(`   ContentType: ${f.contentType}`);
                console.log(`   Length: ${f.length}`);
                console.log(`   UploadDate: ${f.uploadDate}`);
                console.log('---');
            });
        } else {
            console.log("No files found.");
        }

        process.exit(0);
    } catch (error) {
        console.error("Debug failed:", error);
        process.exit(1);
    }
};

debugGridFS();
