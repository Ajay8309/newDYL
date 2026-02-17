import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Calendar, User, Share2, ArrowRight, Zap } from 'lucide-react';
import axios from 'axios';

const BlogPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [relatedPosts, setRelatedPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch Post and Related
    useEffect(() => {
        const fetchPostData = async () => {
            setLoading(true);
            try {
                // Fetch single post
                const res = await axios.get(`/api/posts/${id}`);
                setPost(res.data);

                // Fetch all posts to find related ones (simple client-side filtering for now)
                const allPostsRes = await axios.get('/api/posts');
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
                <div className="w-12 h-12 border-4 border-[var(--color-secondary)] border-t-transparent rounded-full animate-spin"></div>
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
        <div className="min-h-screen bg-[#0f1410] pt-32 pb-20 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full -z-0" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-900/10 blur-[100px] rounded-full -z-0" />

            <article className="container mx-auto px-6 max-w-4xl relative z-10">
                {/* Back Link */}
                <Link to="/blog" className="inline-flex items-center gap-2 text-emerald-100/40 hover:text-emerald-400 transition-all mb-12 group">
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm uppercase tracking-widest">Back to Articles</span>
                </Link>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-950/30 backdrop-blur-sm mb-8"
                    >
                        <Zap size={14} className="text-emerald-400" />
                        <span className="text-xs tracking-[0.2em] text-emerald-300 uppercase">
                            {post.category}
                        </span>
                    </motion.div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-10 tracking-tight leading-[1.2]"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                        {post.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-8 text-sm text-emerald-100/40 border-b border-white/5 pb-10">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 text-xs font-bold border border-emerald-500/20">
                                AA
                            </div>
                            <span className="text-emerald-100 font-medium">{post.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar size={16} className="text-emerald-400/60" />
                            <span>{post.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock size={16} className="text-emerald-400/60" />
                            <span>{post.readTime} read</span>
                        </div>
                        <div className="ml-auto">
                            <button className="flex items-center gap-2 hover:text-emerald-300 transition-colors uppercase tracking-widest text-[10px] font-bold">
                                <Share2 size={16} /> Share Insight
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Featured Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mb-12 rounded-3xl overflow-hidden aspect-video relative"
                >
                    <div className={`absolute inset-0 bg-gradient-to-br ${post.gradient} mix-blend-overlay opacity-60`} />
                    <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                    />
                </motion.div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="prose prose-invert prose-lg max-w-none mb-16"
                >
                    {/* Render HTML content safely */}
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </motion.div>

                {/* Author Bio / Call to Action */}
                <div className="glass rounded-2xl p-8 mb-20 border border-[var(--color-secondary)]/20">
                    <div className="flex items-start gap-6">
                        <div className="w-16 h-16 rounded-full bg-[var(--color-secondary)] flex items-center justify-center text-[var(--color-primary)] font-bold text-2xl shrink-0">
                            AA
                        </div>
                        <div>
                            <h3 className="text-xl font-serif font-bold mb-2">About the Author</h3>
                            <p className="text-[var(--color-text-muted)] mb-4">
                                Aashna is a psychic mentor and spiritual guide dedicated to helping people decode their life patterns and step into their power.
                            </p>
                            <Link to="/booking">
                                <span className="text-[var(--color-secondary)] font-bold text-sm uppercase tracking-wider hover:underline">
                                    Book a Session with Aashna →
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Related Articles */}
                {relatedPosts.length > 0 && (
                    <div className="border-t border-white/10 pt-16">
                        <h3 className="text-2xl font-serif font-bold mb-8">Related Articles</h3>
                        <div className="grid md:grid-cols-2 gap-8">
                            {relatedPosts.map(related => (
                                <Link to={`/blog/${related._id}`} key={related._id} className="group">
                                    <div className="glass rounded-xl overflow-hidden h-full hover:border-[var(--color-secondary)]/30 transition-all">
                                        <div className={`h-48 bg-gradient-to-br ${related.gradient} relative`}>
                                            <img src={related.image} alt={related.title} className="w-full h-full object-cover opacity-50 mix-blend-overlay" />
                                        </div>
                                        <div className="p-6">
                                            <span className="text-xs uppercase tracking-widest text-[var(--color-secondary)] mb-2 block">
                                                {related.category}
                                            </span>
                                            <h4 className="text-xl font-bold mb-3 group-hover:text-[var(--color-secondary)] transition-colors">
                                                {related.title}
                                            </h4>
                                            <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
                                                <Clock size={12} /> {related.readTime}
                                            </div>
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
