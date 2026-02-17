import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, CheckCircle, Sparkles, Moon, ArrowRight, Shield, Zap } from 'lucide-react';
import heroImg from '../../assets/tarot-card-7c5dj9kqjnwd4cwr.jpg';

const TarotGuidance = () => {
    const scrollRef = useRef(null);
    const { scrollY } = useScroll();

    // Parallax effect
    const heroY = useTransform(scrollY, [0, 500], [0, 150]);
    const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

    /* Floating particles animation state */
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div ref={scrollRef} className="min-h-screen bg-[var(--color-primary)] overflow-x-hidden relative pb-20">
            {/* Floating particles background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-[var(--color-secondary)] rounded-full opacity-20"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            x: [0, (mousePosition.x / 100) * (i % 2 ? 1 : -1)],
                            y: [0, (mousePosition.y / 100) * (i % 2 ? -1 : 1)],
                            scale: [1, 1.5, 1],
                            opacity: [0.1, 0.4, 0.1],
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>

            {/* ═══════════════════════════════════════════
                HERO SECTION
            ═══════════════════════════════════════════ */}
            <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
                <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: `url(${heroImg})`,
                            filter: 'brightness(0.3) contrast(1.1)'
                        }}
                    />
                </motion.div>

                {/* Gradients */}
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-primary)]/30 via-transparent to-[var(--color-primary)] z-0" />

                <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center">
                    <Link to="/services" className="inline-flex items-center gap-2 text-white/60 hover:text-[var(--color-secondary)] mb-8 transition-colors w-fit group">
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="uppercase tracking-widest text-xs font-bold">Back to Services</span>
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-indigo-500/30 mb-6 w-fit bg-indigo-500/10"
                    >
                        <Moon size={16} className="text-indigo-400" />
                        <span className="text-xs uppercase tracking-[0.25em] text-indigo-300">
                            Subconscious Mirror
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight"
                    >
                        Tarot <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-violet-300">Guidance</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="text-xl text-white/80 max-w-2xl leading-relaxed"
                    >
                        A diagnostic tool to unveil the energetic patterns shaping your reality. Not fortune telling—truth telling.
                    </motion.p>
                </div>
            </section>

            <div className="container mx-auto px-6 relative z-10 -mt-20">
                <div className="grid lg:grid-cols-3 gap-12">

                    {/* Main Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="lg:col-span-2 space-y-12"
                    >
                        {/* Session Flow */}
                        <div className="glass rounded-[2rem] p-8 border border-white/5">
                            <h3 className="text-2xl font-serif font-bold mb-8">Session Flow</h3>
                            <div className="space-y-8">
                                <div className="flex gap-6">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-300 font-bold text-xl border border-indigo-500/30">1</div>
                                    <div>
                                        <h4 className="text-xl font-bold mb-2">Grounding & Intentions</h4>
                                        <p className="text-[var(--color-text-muted)]">We begin by grounding our energy and setting a clear intention for the reading. What is the core question or area of focus?</p>
                                    </div>
                                </div>
                                <div className="flex gap-6">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-300 font-bold text-xl border border-indigo-500/30">2</div>
                                    <div>
                                        <h4 className="text-xl font-bold mb-2">The Spread & Analysis</h4>
                                        <p className="text-[var(--color-text-muted)]">I pull the cards using intuitive spreads tailored to your inquiry. We decode the symbolism, numerology, and energetic threads woven through the layout.</p>
                                    </div>
                                </div>
                                <div className="flex gap-6">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-300 font-bold text-xl border border-indigo-500/30">3</div>
                                    <div>
                                        <h4 className="text-xl font-bold mb-2">Actionable Guidance</h4>
                                        <p className="text-[var(--color-text-muted)]">We don't leave you with just "information." We translate the insights into practical steps and energetic shifts you can make immediately.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* What We Uncover */}
                        <div>
                            <h3 className="text-xl font-serif font-bold mb-4 flex items-center gap-3">
                                <Sparkles className="text-indigo-400" size={18} /> What We Uncover
                            </h3>
                            <div className="grid md:grid-cols-2 gap-2">
                                {[
                                    { text: 'Relationship Dynamics & Harmony', icon: '❤️' },
                                    { text: 'Career Crossroads & Decisions', icon: '⚡' },
                                    { text: 'Root Causes of Emotional Blocks', icon: '🔐' },
                                    { text: 'Shadow Work & Hidden Influences', icon: '🌑' },
                                    { text: 'Spiritual Growth Path', icon: '✨' },
                                    { text: 'Aligning with Life Purpose', icon: '🧭' }
                                ].map((item, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-3 px-3 py-2 rounded-lg border border-white/5 bg-white/[0.02]"
                                    >
                                        <span className="text-lg">{item.icon}</span>
                                        <span className="text-indigo-100 font-medium text-sm">{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Overview Card */}
                        <div className="glass rounded-[2rem] p-6 md:p-8 border border-white/5 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[80px] rounded-full group-hover:bg-indigo-500/20 transition-all duration-700" />

                            <h2 className="text-2xl font-serif font-bold mb-4 relative z-10">The Mirror of the Soul</h2>
                            <p className="text-[var(--color-text-muted)] leading-relaxed relative z-10">
                                More than fortune telling — tarot reading is a powerful diagnostic tool for your subconscious mind. Uncover hidden patterns in relationships, career, and personal growth to shift outcomes with clarity and intention.
                            </p>
                        </div>

                    </motion.div>

                    {/* Booking Sidebar */}
                    <div className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 }}
                            className="sticky top-32 space-y-6"
                        >
                            <div className="glass p-8 rounded-[2rem] border border-indigo-500/30 shadow-[0_0_30px_rgba(99,102,241,0.1)] relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent pointer-events-none" />

                                <h3 className="text-2xl font-bold mb-8">Book Your Session</h3>

                                <div className="space-y-6 mb-8">
                                    <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                                        <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                                            <Clock size={20} />
                                        </div>
                                        <div>
                                            <div className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider">Duration</div>
                                            <div className="font-bold">30 Minutes</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                                        <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                                            <Zap size={20} />
                                        </div>
                                        <div>
                                            <div className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider">Fee</div>
                                            <div className="font-bold">₹1,500</div>
                                        </div>
                                    </div>
                                </div>

                                <Link to="/booking?service=Tarot Reading">
                                    <motion.button
                                        whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(99,102,241,0.4)' }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
                                    >
                                        Book Now <ArrowRight size={18} />
                                    </motion.button>
                                </Link>

                                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-[var(--color-text-muted)]">
                                    <Shield size={12} /> Secure Payment • 100% Confidential
                                </div>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default TarotGuidance;
