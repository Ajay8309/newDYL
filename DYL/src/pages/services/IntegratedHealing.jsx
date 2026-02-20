import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, CheckCircle, Sparkles } from 'lucide-react';
import heroImg from '../../assets/yunchuan-luo-7emiteIwfuk-unsplash.jpg'; // Using the nature background as it fits the integrated theme

const IntegratedHealing = () => {
    return (
        <div className="min-h-screen bg-[var(--color-primary)] pb-20">
            {/* Hero Section */}
            <div className="relative h-[60vh] overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${heroImg})` }}
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative h-full container mx-auto px-6 flex flex-col justify-center">
                    <Link to="/services" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors">
                        <ArrowLeft size={20} /> Back to Services
                    </Link>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-serif font-bold mb-4"
                    >
                        Womb Healing & <span className="text-[var(--color-secondary)]">Ancestral Clearing</span>
                    </motion.h1>
                    <p className="text-xl text-white/90 max-w-2xl">
                        Our Signature Session: Womb Healing, Entity Attachment Removal, Past Life Healing, and Postpartum Trauma Recovery.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-6 -mt-20 relative z-10">
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="md:col-span-2 space-y-8"
                    >
                        <div className="glass p-8 rounded-2xl border border-[var(--color-secondary)]/30 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4">
                                <Sparkles className="text-[var(--color-secondary)]" size={32} />
                            </div>
                            <h2 className="text-2xl font-serif font-bold mb-4">About the Signature Session</h2>
                            <p className="text-[var(--color-text-muted)] leading-relaxed mb-6">
                                This is the complete "Delete & Reset" button for your life's software.
                                We don't just treat the symptom; we address the root cause across all dimensions: mental, emotional, spiritual, and energetic.
                            </p>
                            <p className="text-[var(--color-text-muted)] leading-relaxed">
                                In this 90-minute immersion, Aashna channels guidance and energy specifically tailored to your moment-to-moment needs.
                                It may act as a blend of Tarot to identify the block, Akashic Records to find its origin,
                                and Reiki or Healing Codes to release it permanently.
                            </p>
                        </div>

                        <div className="glass p-8 rounded-2xl">
                            <h2 className="text-2xl font-serif font-bold mb-4">Who is this for?</h2>
                            <ul className="space-y-4">
                                {[
                                    'Those feeling completely stuck despite trying other therapies',
                                    'Individuals facing major life transitions (divorce, career change)',
                                    'Seekers wanting a comprehensive "soul audit"',
                                    'Anyone dealing with complex, multi-layered issues',
                                    'If you don\'t know which service to pick — this covers it all'
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <CheckCircle size={20} className="text-[var(--color-secondary)] mt-1 flex-shrink-0" />
                                        <span className="text-[var(--color-text-muted)]">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>

                    {/* Sidebar / Booking Card */}
                    <div className="md:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="glass p-8 rounded-2xl sticky top-40 border-2 border-[var(--color-secondary)]/40 shadow-[0_0_30px_rgba(212,175,55,0.1)]"
                        >
                            <div className="uppercase tracking-widest text-xs font-bold text-[var(--color-secondary)] mb-4 text-center">Most Recommended</div>
                            <h3 className="text-xl font-bold mb-6">Session Details</h3>

                            <div className="space-y-6 mb-8">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-[var(--color-secondary)] text-[var(--color-primary)] flex items-center justify-center">
                                        <Clock size={20} />
                                    </div>
                                    <div>
                                        <div className="text-sm text-[var(--color-text-muted)]">Duration</div>
                                        <div className="font-semibold">Per Session</div>
                                        <div className="text-xs text-[var(--color-secondary)] mt-1">Starts from INR 16,000</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-[var(--color-secondary)] text-[var(--color-primary)] flex items-center justify-center">
                                        <Calendar size={20} />
                                    </div>
                                    <div>
                                        <div className="text-sm text-[var(--color-text-muted)]">Format</div>
                                        <div className="font-semibold">Online / In-Person (Goa)</div>
                                    </div>
                                </div>
                            </div>

                            <Link to="/booking?service=Karmic %2B Ancestral Healing / Entity Cord Cutting">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-full bg-[var(--color-secondary)] text-white py-4 font-bold rounded-xl mb-4 shadow-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all"
                                >
                                    Book Signature Session
                                </motion.button>
                            </Link>
                            <p className="text-xs text-center text-[var(--color-text-muted)]">
                                *Secure payment gateway
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IntegratedHealing;
