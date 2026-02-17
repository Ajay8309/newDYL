import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, ArrowRight, Search, X } from 'lucide-react';
import api from '../utils/api';

const Blog = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await api.get('/api/posts');
                if (Array.isArray(res.data)) {
                    setPosts(res.data);
                } else {
                    console.error("API response is not an array:", res.data);
                    setPosts([]);
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    // Get unique categories
    const categories = ['All', ...new Set(Array.isArray(posts) ? posts.map(post => post.category) : [])];

    // Filter posts
    const filteredPosts = posts.filter(post => {
        const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const featuredPost = posts[0];

    if (loading) {
        return (
            <div className="min-h-screen bg-[var(--color-primary)] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-[var(--color-secondary)] border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-[var(--color-text-muted)]">Loading insights...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[var(--color-primary)] pt-32 pb-20 relative overflow-hidden">
            {/* Background Decor — matching Home page */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-secondary)]/5 blur-[120px] rounded-full -z-0" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[var(--color-secondary)]/5 blur-[100px] rounded-full -z-0" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Header — matching Home page style */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <br />
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="uppercase tracking-[0.3em] text-sm text-[var(--color-secondary)] mb-6"
                    >
                        Real Experiences · Real Shifts
                    </motion.p>

                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-[1.1] mb-8">
                        Client Stories
                    </h1>

                    <div className="w-24 h-px bg-gradient-to-r from-transparent via-[var(--color-secondary)] to-transparent mx-auto mb-12" />

                    {/* Search Bar */}
                    <div className="max-w-md mx-auto relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--color-secondary)]/20 to-transparent rounded-full blur opacity-0 group-hover:opacity-100 transition duration-500" />
                        <div className="relative flex items-center glass border border-white/10 rounded-full px-6 py-4 focus-within:border-[var(--color-secondary)]/50 transition-all">
                            <Search size={20} className="text-[var(--color-secondary)] mr-4" />
                            <input
                                type="text"
                                placeholder="Search articles..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-transparent border-none text-white placeholder:text-white/20 focus:outline-none w-full text-lg"
                            />
                            {searchQuery && (
                                <button onClick={() => setSearchQuery('')} className="text-white/40 hover:text-white transition-colors">
                                    <X size={18} />
                                </button>
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* Category pills */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-3 mb-20"
                >
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-6 py-2 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold transition-all border ${cat === selectedCategory
                                ? 'bg-[var(--color-secondary)] text-[var(--color-primary)] border-[var(--color-secondary)] shadow-lg shadow-[var(--color-secondary)]/20'
                                : 'bg-white/5 text-white/40 border-white/5 hover:border-[var(--color-secondary)]/30 hover:text-[var(--color-secondary)]'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </motion.div>

                {/* Featured Article (Only show if no search/filter active and we have posts) */}
                {searchQuery === '' && selectedCategory === 'All' && featuredPost && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-16"
                    >
                        <Link to={`/blog/${featuredPost._id}`}>
                            <div className="glass rounded-2xl overflow-hidden border border-white/5 hover:border-[var(--color-secondary)]/30 transition-all duration-500 group">
                                <div className="md:flex">
                                    <div className={`md:w-2/5 bg-gradient-to-br ${featuredPost.gradient} p-12 flex items-center justify-center min-h-[250px] relative overflow-hidden`}>
                                        <img
                                            src={featuredPost.image}
                                            alt={featuredPost.title}
                                            className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="text-center relative z-10">
                                            <BookOpen className="mx-auto text-[var(--color-secondary)] mb-4" size={64} />
                                            <span className="text-xs uppercase tracking-[0.3em] text-[var(--color-secondary)] font-bold bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm">Featured</span>
                                        </div>
                                    </div>
                                    <div className="md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
                                        <span className="text-xs uppercase tracking-[0.2em] text-[var(--color-secondary)] mb-3">{featuredPost.category}</span>
                                        <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4 group-hover:text-[var(--color-secondary)] transition-colors">{featuredPost.title}</h2>
                                        <p className="text-[var(--color-text-muted)] leading-relaxed mb-6">{featuredPost.excerpt}</p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-[var(--color-text-muted)] flex items-center gap-2">
                                                <Clock size={14} /> {featuredPost.readTime} read
                                            </span>
                                            <span className="text-[var(--color-secondary)] font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                                                Read Article <ArrowRight size={16} />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                )}

                {/* Article Grid */}
                {filteredPosts.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {(searchQuery === '' && selectedCategory === 'All' ? filteredPosts.slice(1) : filteredPosts).map((article, i) => (
                            <Link to={`/blog/${article._id}`} key={article._id}>
                                <motion.article
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="glass rounded-2xl overflow-hidden border border-white/5 hover:border-[var(--color-secondary)]/30 transition-all duration-500 group h-full flex flex-col"
                                >
                                    {/* Gradient Header */}
                                    <div className={`bg-gradient-to-br ${article.gradient} h-48 relative overflow-hidden`}>
                                        <img
                                            src={article.image}
                                            alt={article.title}
                                            className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="bg-black/20 p-4 rounded-full backdrop-blur-sm text-[var(--color-secondary)] group-hover:scale-110 transition-transform duration-300">
                                                {article.icon}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 flex flex-col flex-grow">
                                        <span className="text-xs uppercase tracking-[0.2em] text-[var(--color-secondary)] mb-2 block">{article.category}</span>
                                        <h3 className="text-xl font-serif font-bold mb-3 group-hover:text-[var(--color-secondary)] transition-colors">{article.title}</h3>
                                        <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-4 line-clamp-3 flex-grow">{article.excerpt}</p>
                                        <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                                            <span className="text-xs text-[var(--color-text-muted)] flex items-center gap-2">
                                                <Clock size={12} /> {article.readTime}
                                            </span>
                                            <span className="text-[var(--color-secondary)] text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                                                Read <ArrowRight size={14} />
                                            </span>
                                        </div>
                                    </div>
                                </motion.article>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-xl text-[var(--color-text-muted)]">No articles found matching your criteria.</p>
                        <button
                            onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                            className="mt-4 text-[var(--color-secondary)] hover:underline"
                        >
                            Clear filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Blog;
