import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    excerpt: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    readTime: {
        type: String,
        default: '5 min'
    },
    author: {
        type: String,
        default: 'Aashna Ahuja'
    },
    date: {
        type: String,
        default: () => new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    }
}, { timestamps: true });

export default mongoose.model('Post', postSchema);
