import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit, Trash2, LogOut, Check, X, Eye, FileText, ClipboardList, Loader } from 'lucide-react';
import axios from 'axios';

const AdminDashboard = () => {
    const [posts, setPosts] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [activeTab, setActiveTab] = useState('articles'); // 'articles' or 'bookings'
    const [loading, setLoading] = useState(true);
    const [viewingScreenshot, setViewingScreenshot] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/admin');
            return;
        }
        fetchData();
    }, [navigate]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const [postsRes, bookingsRes] = await Promise.all([
                axios.get('/api/posts'),
                axios.get('/api/bookings', { headers: { Authorization: token } })
            ]);
            setPosts(Array.isArray(postsRes.data) ? postsRes.data : []);
            setBookings(Array.isArray(bookingsRes.data) ? bookingsRes.data : []);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
            setPosts([]);
            setBookings([]);
        }
    };

    const handleDeletePost = async (id) => {
        if (window.confirm('Are you sure you want to delete this article?')) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`/api/posts/${id}`, {
                    headers: { Authorization: token }
                });
                setPosts(posts.filter(post => post._id !== id));
            } catch (error) {
                console.error("Error deleting post:", error);
            }
        }
    };

    const handleUpdateBookingStatus = async (id, status) => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.patch(`/api/bookings/${id}`, { status }, {
                headers: { Authorization: token }
            });
            setBookings(bookings.map(b => b._id === id ? res.data : b));
        } catch (error) {
            console.error("Error updating booking:", error);
            alert("Failed to update status");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/admin');
    };

    const pendingCount = Array.isArray(bookings) ? bookings.filter(b => b.status === 'pending').length : 0;

    return (
        <div className="min-h-screen bg-[#022C22] pt-32 px-8 pb-20 relative overflow-hidden text-white">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-secondary)]/5 rounded-full blur-[120px] -mr-64 -mt-64" />

            <div className="max-w-6xl mx-auto relative z-10">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                    <div>
                        <motion.h1
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-5xl font-serif font-bold mb-2"
                        >
                            Control <span className="text-[var(--color-secondary)] text-gradient">Center</span>
                        </motion.h1>
                        <p className="text-[var(--color-text-muted)] uppercase tracking-[0.3em] text-xs">Manage your content ecosystem</p>
                    </div>

                    <div className="flex gap-4">
                        <motion.button
                            whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(212,175,55,0.3)' }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => navigate('/admin/article/new')}
                            className="group relative flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-sm tracking-wide overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-[#A98F47] via-[#A98F47] to-[#A98F47] group-hover:brightness-110 transition-all font-bold" />
                            <span className="relative text-[#022C22] flex items-center gap-2">
                                <Plus size={18} /> New Article
                            </span>
                        </motion.button>

                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 bg-white/5 border border-white/10 text-white/60 px-6 py-4 rounded-2xl font-bold text-sm hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 transition-all duration-300"
                        >
                            <LogOut size={18} /> Logout
                        </button>
                    </div>
                </header>

                {/* Tabs */}
                <div className="flex gap-4 mb-10 p-1.5 bg-black/20 w-fit rounded-2xl border border-white/5">
                    <button
                        onClick={() => setActiveTab('articles')}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'articles' ? 'bg-[var(--color-secondary)] text-[#022C22]' : 'text-white/40 hover:text-white/60'}`}
                    >
                        <FileText size={18} /> Articles
                    </button>
                    <button
                        onClick={() => setActiveTab('bookings')}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'bookings' ? 'bg-[var(--color-secondary)] text-[#022C22]' : 'text-white/40 hover:text-white/60'}`}
                    >
                        <ClipboardList size={18} /> Session Bookings
                        {pendingCount > 0 && (
                            <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full ml-1 animate-pulse">
                                {pendingCount}
                            </span>
                        )}
                    </button>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32 gap-6">
                        <div className="w-12 h-12 border-4 border-[var(--color-secondary)]/20 border-t-[var(--color-secondary)] rounded-full animate-spin" />
                        <p className="text-[var(--color-text-muted)] uppercase tracking-widest text-sm animate-pulse">Synchronizing Data...</p>
                    </div>
                ) : activeTab === 'articles' ? (
                    <div className="grid gap-6">
                        {posts && posts.length > 0 ? (
                            posts.map((post, index) => (
                                <motion.div
                                    key={post._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="group glass rounded-[2rem] border border-white/5 p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-[var(--color-secondary)]/30 hover:bg-white/[0.05] transition-all duration-500"
                                >
                                    <div className="flex flex-col md:flex-row items-center gap-8 w-full">
                                        <div className="relative w-full md:w-32 h-40 md:h-24 rounded-2xl overflow-hidden bg-white/5 flex-shrink-0 border border-white/10 group-hover:border-[var(--color-secondary)]/20 transition-colors">
                                            {post.image ? (
                                                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-[var(--color-secondary)]/20">
                                                    <Edit size={24} />
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex-grow space-y-2 text-center md:text-left">
                                            <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-1">
                                                <span className="px-3 py-1 rounded-full bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] text-[10px] uppercase font-bold tracking-widest border border-[var(--color-secondary)]/20">
                                                    {post.category}
                                                </span>
                                                <span className="text-[10px] uppercase font-bold tracking-widest text-white/30 flex items-center">
                                                    {post.date}
                                                </span>
                                            </div>
                                            <h3 className="text-2xl font-serif font-bold group-hover:text-[var(--color-secondary)] transition-colors line-clamp-1">{post.title}</h3>
                                            <p className="text-sm text-white/50 line-clamp-1 max-w-2xl">{post.excerpt}</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-3 w-full md:w-auto">
                                        <Link to={`/admin/article/${post._id}`} className="flex-1 md:flex-none">
                                            <button className="w-full md:w-auto p-4 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:bg-[var(--color-secondary)]/10 hover:text-[var(--color-secondary)] hover:border-[var(--color-secondary)]/30 transition-all duration-300">
                                                <Edit size={20} />
                                            </button>
                                        </Link>
                                        <button
                                            onClick={() => handleDeletePost(post._id)}
                                            className="flex-1 md:flex-none p-4 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 transition-all duration-300"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="py-32 text-center glass rounded-[3rem] border border-dashed border-white/10">
                                <p className="text-[var(--color-text-muted)]">No articles found yet.</p>
                            </div>
                        )}
                    </div>
                ) : (
                    /* Bookings Tab */
                    <div className="overflow-x-auto rounded-[2rem] border border-white/5 glass">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-black/20 text-[10px] uppercase tracking-[0.2em] text-[var(--color-secondary)] font-bold">
                                    <th className="px-8 py-6">User Details</th>
                                    <th className="px-8 py-6">Session Info</th>
                                    <th className="px-8 py-6">Payment Proof</th>
                                    <th className="px-8 py-6">Status</th>
                                    <th className="px-8 py-6 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {bookings && bookings.length > 0 ? (
                                    bookings.map((booking, index) => (
                                        <motion.tr
                                            key={booking._id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="group hover:bg-white/[0.02] transition-colors"
                                        >
                                            <td className="px-8 py-6">
                                                <div className="font-bold text-white">{booking.name}</div>
                                                <div className="text-xs text-white/40">{booking.email}</div>
                                                <div className="text-[9px] text-white/20 mt-1 uppercase tracking-tighter">Ordered {booking.createdAt ? new Date(booking.createdAt).toLocaleDateString() : 'N/A'}</div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="text-[var(--color-secondary)] font-medium">{booking.service}</div>
                                                <div className="text-xs text-white/40">{booking.price} • {booking.duration}</div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <button
                                                    onClick={() => setViewingScreenshot(booking.screenshotUrl)}
                                                    className="group/btn flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] uppercase tracking-widest font-bold text-white/60 hover:text-[var(--color-secondary)] hover:border-[var(--color-secondary)]/30 transition-all font-bold"
                                                >
                                                    <Eye size={14} /> View SS
                                                </button>
                                            </td>
                                            <td className="px-8 py-6 text-sm">
                                                <span className={`px-3 py-1 rounded-full text-[9px] uppercase font-bold tracking-widest border ${booking.status === 'verified'
                                                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                                    : booking.status === 'rejected'
                                                        ? 'bg-red-500/10 text-red-400 border-red-500/20'
                                                        : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                                    }`}>
                                                    {booking.status}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    {booking.status !== 'verified' && (
                                                        <button
                                                            onClick={() => handleUpdateBookingStatus(booking._id, 'verified')}
                                                            className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all transition-colors"
                                                            title="Verify Payment"
                                                        >
                                                            <Check size={16} />
                                                        </button>
                                                    )}
                                                    {booking.status !== 'rejected' && (
                                                        <button
                                                            onClick={() => handleUpdateBookingStatus(booking._id, 'rejected')}
                                                            className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all transition-colors"
                                                            title="Reject Payment"
                                                        >
                                                            <X size={16} />
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-8 py-20 text-center text-white/20 italic">No bookings recorded yet.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Screenshot Modal */}
            <AnimatePresence>
                {viewingScreenshot && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-8 bg-black/90 backdrop-blur-md" onClick={() => setViewingScreenshot(null)}>
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative max-w-4xl max-h-full"
                            onClick={e => e.stopPropagation()}
                        >
                            <img src={viewingScreenshot} alt="Payment Proof" className="w-full h-auto rounded-2xl shadow-2xl border border-white/10" />
                            <button
                                onClick={() => setViewingScreenshot(null)}
                                className="absolute -top-12 -right-12 p-3 text-white/50 hover:text-white transition-colors"
                            >
                                <X size={32} />
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <style jsx>{`
                .text-gradient {
                    background: linear-gradient(to right, #A98F47, #A98F47, #A98F47);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .glass {
                    background: rgba(255, 255, 255, 0.03);
                    backdrop-filter: blur(15px);
                    -webkit-backdrop-filter: blur(15px);
                }
            `}</style>
        </div>
    );
};

export default AdminDashboard;
