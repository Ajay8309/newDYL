import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import axios from 'axios';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            const res = await axios.post('/api/auth/login', { username, password });
            localStorage.setItem('token', res.data.token);
            navigate('/admin/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Authentication failed. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#022C22] flex items-center justify-center px-6 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[var(--color-secondary)]/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-600/5 rounded-full blur-[120px]" />

                {/* Floating particles simplified for login */}
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-[var(--color-secondary)]/20 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -100, 0],
                            opacity: [0.1, 0.4, 0.1],
                        }}
                        transition={{
                            duration: 10 + Math.random() * 10,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 w-full max-w-md"
            >
                <div className="glass p-10 rounded-[2.5rem] border border-[var(--color-secondary)]/20 shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-2xl">
                    <div className="text-center mb-10">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.2 }}
                            className="w-20 h-20 bg-gradient-to-br from-[var(--color-secondary)]/20 to-amber-700/20 rounded-3xl flex items-center justify-center mx-auto mb-6 text-[var(--color-secondary)] border border-[var(--color-secondary)]/30"
                        >
                            <Lock size={36} />
                        </motion.div>
                        <h1 className="text-4xl font-serif font-bold mb-2 tracking-tight">Admin Portal</h1>
                        <p className="text-[var(--color-text-muted)] text-sm uppercase tracking-[0.2em]">Restricted Access</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="block text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] ml-1">Username</label>
                            <div className="relative group">
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[var(--color-secondary)]/50 focus:bg-white/10 transition-all duration-300"
                                    placeholder="Enter username"
                                    required
                                />
                                <div className="absolute inset-0 rounded-2xl border border-[var(--color-secondary)]/0 group-focus-within:border-[var(--color-secondary)]/20 pointer-events-none transition-all duration-300" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] ml-1">Password</label>
                            <div className="relative group">
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[var(--color-secondary)]/50 focus:bg-white/10 transition-all duration-300"
                                    placeholder="Enter password"
                                    required
                                />
                                <div className="absolute inset-0 rounded-2xl border border-[var(--color-secondary)]/0 group-focus-within:border-[var(--color-secondary)]/20 pointer-events-none transition-all duration-300" />
                            </div>
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center"
                            >
                                {error}
                            </motion.div>
                        )}

                        <motion.button
                            type="submit"
                            disabled={isLoading}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="group relative w-full overflow-hidden py-4 rounded-2xl font-bold tracking-widest uppercase text-xs transition-all duration-300 disabled:opacity-50"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-[#A98F47] via-[#A98F47] to-[#A98F47] opacity-100 group-hover:brightness-110 transition-all" />
                            <span className="relative text-[#022C22] flex items-center justify-center gap-2">
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-[#022C22]/30 border-t-[#022C22] rounded-full animate-spin" />
                                ) : (
                                    <>Access Dashboard <span className="text-lg group-hover:translate-x-1 transition-transform">→</span></>
                                )}
                            </span>
                        </motion.button>
                    </form>

                    <div className="mt-8 text-center">
                        <button
                            onClick={() => navigate('/')}
                            className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-secondary)] transition-colors uppercase tracking-widest"
                        >
                            ← Return to Website
                        </button>
                    </div>
                </div>

                <p className="text-center mt-8 text-[var(--color-text-muted)]/40 text-[10px] uppercase tracking-[0.3em]">
                    &copy; {new Date().getFullYear()} Decode Your Life. Protected Session.
                </p>
            </motion.div>

            {/* Inline CSS for the glass effect if needed, but Tailwind glass class should work */}
            <style jsx>{`
                .glass {
                    background: rgba(255, 255, 255, 0.03);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                }
            `}</style>
        </div>
    );
};

export default AdminLogin;
