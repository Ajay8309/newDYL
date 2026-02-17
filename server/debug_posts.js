import mongoose from "mongoose";
import 'dotenv/config';

// Define minimal schema to read posts
const postSchema = new mongoose.Schema({
    title: String,
    image: String,
    category: String
});

const Post = mongoose.model('Post', postSchema);

const debugPosts = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB.");

        // Find latest 3 posts
        const posts = await Post.find().sort({ _id: -1 }).limit(3);

        console.log(`Found ${posts.length} recent posts.`);
        posts.forEach(p => {
            console.log(`- Title: ${p.title}`);
            console.log(`  Image URL: ${p.image}`);
            console.log('---');
        });

        process.exit(0);
    } catch (error) {
        console.error("Debug failed:", error);
        process.exit(1);
    }
};

debugPosts();
