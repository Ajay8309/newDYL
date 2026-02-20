import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Calendar, Share2 } from 'lucide-react';
import api, { getImageUrl } from '../utils/api';

const BlogPost = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [relatedPosts, setRelatedPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPostData = async () => {
            setLoading(true);
            try {
                const res = await api.get(`/api/posts/${id}`);
                setPost(res.data);

                const allPostsRes = await api.get('/api/posts');
                const related = allPostsRes.data
                    .filter(p => p.category === res.data.category && p._id !== id)
                    .slice(0, 2);
                setRelatedPosts(related);
            } catch (error) {
                console.error("Error fetching post:", error);
                setPost(null);
            } finally {
                setLoading(false);
                window.scrollTo(0, 0);
            }
        };
        fetchPostData();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[var(--color-primary)] flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-[var(--color-secondary)] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen bg-[var(--color-primary)] flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-3xl font-serif font-bold mb-4">Article Not Found</h2>
                    <Link to="/blog" className="text-[var(--color-secondary)] hover:underline">
                        Return to Blog
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[var(--color-primary)] pt-40 pb-24">
            <article className="container mx-auto px-6 max-w-3xl">

                {/* Back */}
                <Link
                    to="/blog"
                    className="inline-flex items-center gap-2 text-white/40 hover:text-[var(--color-secondary)] transition-colors mb-12 group"
                >
                    <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-xs uppercase tracking-widest">Back to Stories</span>
                </Link>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-10"
                >
                    <span
                        className="text-xs uppercase tracking-widest font-semibold mb-4 block"
                        style={{ color: "#C9A84C" }}
                    >
                        {post.category}
                    </span>

                    <h1 className="text-4xl md:text-5xl font-serif font-bold leading-tight mb-8">
                        {post.title}
                    </h1>

                    <div
                        className="flex flex-wrap items-center gap-6 text-xs text-white/35 pb-8"
                        style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
                    >
                        <span className="flex items-center gap-1.5">
                            <Calendar size={13} /> {post.date}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Clock size={13} /> {post.readTime}
                        </span>
                        <button
                            onClick={() => navigator.share?.({ title: post.title, url: window.location.href })}
                            className="ml-auto flex items-center gap-1.5 hover:text-white/70 transition-colors uppercase tracking-widest"
                        >
                            <Share2 size={13} /> Share
                        </button>
                    </div>
                </motion.div>

                {/* Featured Image */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.15 }}
                    className="mb-12 rounded-xl overflow-hidden aspect-video"
                >
                    <img
                        src={getImageUrl(post.image)}
                        alt={post.title}
                        className="w-full h-full object-cover"
                        style={{ filter: "brightness(0.85) saturate(0.9)" }}
                    />
                </motion.div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.25 }}
                    className="prose prose-invert prose-lg max-w-none mb-20"
                    style={{
                        "--tw-prose-body": "rgba(255,255,255,0.65)",
                        "--tw-prose-headings": "rgba(255,255,255,0.95)",
                        "--tw-prose-links": "#C9A84C",
                        "--tw-prose-bold": "rgba(255,255,255,0.9)",
                        "--tw-prose-hr": "rgba(255,255,255,0.08)",
                        "--tw-prose-quotes": "rgba(255,255,255,0.5)",
                        "--tw-prose-quote-borders": "#C9A84C",
                    }}
                >
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </motion.div>

                {/* Related Articles */}
                {relatedPosts.length > 0 && (
                    <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 48 }}>
                        <h3 className="text-xl font-serif font-bold mb-8">Related Stories</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            {relatedPosts.map((related) => (
                                <Link to={`/blog/${related._id}`} key={related._id}>
                                    <div className="group rounded-xl border border-white/8 hover:border-[#C9A84C]/30 bg-white/[0.02] overflow-hidden transition-colors duration-300">
                                        <div className="aspect-video relative overflow-hidden">
                                            <img
                                                src={getImageUrl(related.image)}
                                                alt={related.title}
                                                className="w-full h-full object-cover opacity-50 group-hover:opacity-65 group-hover:scale-105 transition-all duration-500"
                                            />
                                        </div>
                                        <div className="p-5">
                                            <span className="text-[10px] uppercase tracking-widest font-semibold mb-2 block" style={{ color: "#C9A84C" }}>
                                                {related.category}
                                            </span>
                                            <h4 className="font-serif font-bold text-base leading-snug group-hover:text-[#C9A84C] transition-colors duration-300 mb-2">
                                                {related.title}
                                            </h4>
                                            <span className="text-xs text-white/30 flex items-center gap-1">
                                                <Clock size={11} /> {related.readTime}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

            </article>
        </div>
    );
};

export default BlogPost;