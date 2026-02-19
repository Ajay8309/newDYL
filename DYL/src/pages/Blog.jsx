import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Clock, ArrowRight } from "lucide-react";
import api, { getImageUrl } from "../utils/api";

const Blog = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await api.get("/api/posts");
                setPosts(Array.isArray(res.data) ? res.data : []);
            } catch (err) {
                console.error("Error fetching posts:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    const categories = ["All", ...new Set(posts.map((p) => p.category))];
    const filteredPosts = posts.filter(
        (p) => selectedCategory === "All" || p.category === selectedCategory
    );
    const featuredPost = posts[0];
    const gridPosts = selectedCategory === "All" ? filteredPosts.slice(1) : filteredPosts;

    if (loading) {
        return (
            <div className="min-h-screen bg-[var(--color-primary)] flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-[var(--color-secondary)] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[var(--color-primary)] pt-32 pb-24">
            <div className="container mx-auto px-6 max-w-5xl">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-14"
                >
                    <p className="text-xs uppercase tracking-widest text-[var(--color-secondary)] mb-3">
                        Real Experiences · Real Shifts
                    </p>
                    <h1 className="text-5xl md:text-6xl font-serif font-bold">Client Stories</h1>
                </motion.div>

                {/* Categories */}
                <div className="flex flex-wrap gap-2 mb-12">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className="px-5 py-1.5 rounded-full text-xs uppercase tracking-widest font-semibold transition-all border"
                            style={{
                                borderColor: "#C9A84C",
                                color: cat === selectedCategory ? "#0a2a1f" : "#C9A84C",
                                background: cat === selectedCategory ? "#C9A84C" : "transparent",
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Featured */}
                {selectedCategory === "All" && featuredPost && (
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-14"
                    >
                        <Link to={`/blog/${featuredPost._id}`}>
                            <div className="group flex flex-col md:flex-row gap-8 p-8 rounded-2xl border border-white/8 hover:border-[var(--color-secondary)]/25 bg-white/[0.02] transition-colors duration-300">
                                {/* Image */}
                                <div className="md:w-2/5 rounded-xl overflow-hidden aspect-video md:aspect-auto min-h-[200px] relative bg-white/5">
                                    {getImageUrl(featuredPost.image) && (
                                        <img
                                            src={getImageUrl(featuredPost.image)}
                                            alt={featuredPost.title}
                                            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-75 transition-opacity duration-300"
                                        />
                                    )}
                                </div>

                                {/* Text */}
                                <div className="md:w-3/5 flex flex-col justify-center">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="text-[10px] uppercase tracking-widest text-[var(--color-secondary)] font-semibold">
                                            {featuredPost.category}
                                        </span>
                                        <span className="w-1 h-1 rounded-full bg-white/20" />
                                        <span className="text-[10px] text-white/30 flex items-center gap-1">
                                            <Clock size={10} /> {featuredPost.readTime}
                                        </span>
                                    </div>

                                    <h2 className="text-2xl md:text-3xl font-serif font-bold mb-3 group-hover:text-[var(--color-secondary)] transition-colors duration-300 leading-snug">
                                        {featuredPost.title}
                                    </h2>

                                    <p className="text-sm text-white/40 leading-relaxed mb-5 line-clamp-3">
                                        {featuredPost.excerpt}
                                    </p>

                                    <span className="text-xs uppercase tracking-widest font-semibold text-[var(--color-secondary)] flex items-center gap-2 group-hover:gap-3 transition-all duration-200">
                                        Read Story <ArrowRight size={13} />
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                )}

                {/* Grid */}
                <AnimatePresence mode="wait">
                    {gridPosts.length > 0 ? (
                        <motion.div
                            key={selectedCategory}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {gridPosts.map((article, i) => (
                                <Link to={`/blog/${article._id}`} key={article._id}>
                                    <motion.article
                                        initial={{ opacity: 0, y: 16 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.07 }}
                                        className="group flex flex-col h-full rounded-xl border border-white/8 hover:border-[var(--color-secondary)]/25 bg-white/[0.02] overflow-hidden transition-colors duration-300"
                                    >
                                        {/* Image */}
                                        <div className="relative aspect-video bg-white/5 overflow-hidden">
                                            {getImageUrl(article.image) ? (
                                                <img
                                                    src={getImageUrl(article.image)}
                                                    alt={article.title}
                                                    className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-65 group-hover:scale-105 transition-all duration-500"
                                                />
                                            ) : (
                                                <div className={`absolute inset-0 bg-gradient-to-br ${article.gradient || "from-white/5 to-white/10"}`} />
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="p-5 flex flex-col flex-grow">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="text-[10px] uppercase tracking-widest text-[var(--color-secondary)] font-semibold">
                                                    {article.category}
                                                </span>
                                            </div>

                                            <h3 className="font-serif font-bold text-lg mb-2 leading-snug group-hover:text-[var(--color-secondary)] transition-colors duration-300">
                                                {article.title}
                                            </h3>

                                            <p className="text-sm text-white/35 leading-relaxed line-clamp-2 flex-grow mb-4">
                                                {article.excerpt}
                                            </p>

                                            <div className="flex items-center justify-between pt-3 border-t border-white/6">
                                                <span className="text-[10px] text-white/25 flex items-center gap-1">
                                                    <Clock size={10} /> {article.readTime}
                                                </span>
                                                <span className="text-[10px] uppercase tracking-widest font-semibold text-[var(--color-secondary)] flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
                                                    Read <ArrowRight size={11} />
                                                </span>
                                            </div>
                                        </div>
                                    </motion.article>
                                </Link>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.p
                            key="empty"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20 text-white/30"
                        >
                            No articles found in this category.
                        </motion.p>
                    )}
                </AnimatePresence>

            </div>
        </div>
    );
};

export default Blog;