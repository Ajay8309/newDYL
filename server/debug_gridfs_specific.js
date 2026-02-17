import mongoose from "mongoose";
import { initGridFS, getBucket } from "./utils/gridfsBucket.js";
import 'dotenv/config';

const debugGridFS = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB.");

        initGridFS();
        const bucket = getBucket();

        const filename = "1771054993334-AdobeStock_573925621-scaled.jpeg";
        console.log(`Checking for file: ${filename}`);

        const files = await bucket.find({ filename }).toArray();

        if (files.length > 0) {
            files.forEach(f => {
                console.log(` - Filename: ${f.filename}`);
                console.log(`   ContentType: ${f.contentType}`);
                console.log(`   Length: ${f.length}`);
                console.log(`   UploadDate: ${f.uploadDate}`);
                console.log('---');
            });
        } else {
            console.log(`File '${filename}' NOT found in GridFS.`);
        }

        process.exit(0);
    } catch (error) {
        console.error("Debug failed:", error);
        process.exit(1);
    }
};

debugGridFS();
