import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, Moon, Sun, Stars, Zap, Gem, Layers, Wind, ArrowRight } from 'lucide-react';

const services = [
    {
        id: 1,
        title: 'Tarot Guidance',
        icon: <Moon size={28} />,
        description: 'Focused on subconscious patterns and emotional blocks. Gain clarity on relationships, career crossroads, and internal conflicts.',
        span: 'md:col-span-2',
        link: '/services/tarot'
    },
    {
        id: 2,
        title: 'Astrology Reading',
        icon: <Stars size={28} />,
        description: 'Deep dive into the birth chart, karmic lessons, and timing cycles. Understand the cosmic forces shaping your life.',
        span: 'md:col-span-1',
        link: '/services/astrology'
    },
    {
        id: 3,
        title: 'Akashic Record Reading',
        icon: <Layers size={28} />,
        description: 'Accessing soul-level information and ancestral influences. Uncover the blueprint of your soul\'s journey.',
        span: 'md:col-span-1',
        link: '/services/akashic'
    },
    {
        id: 4,
        title: 'Guidance via Numerology',
        icon: <Sun size={28} />,
        description: 'Understanding the numeric frequency of your name and birth date. Decode the vibrational patterns encoded in your identity.',
        span: 'md:col-span-2',
        link: '/services/numerology'
    },
    {
        id: 5,
        title: 'Reiki Healing',
        icon: <Zap size={28} />,
        description: 'Subtle energy work to balance the nervous system and emotional body. Restore harmony to your chakras.',
        span: 'md:col-span-1',
        link: '/services/reiki'
    },
    {
        id: 6,
        title: 'Crystal & Gemstone Guidance',
        icon: <Gem size={28} />,
        description: 'Using mineral frequencies for grounding and protection. Harness the vibrational properties of the earth.',
        span: 'md:col-span-1',
        link: '/services/crystals'
    },
    {
        id: 7,
        title: 'Healing Codes, Symbols & Fragrances',
        icon: <Wind size={28} />,
        description: 'Subtle sensory tools to recalibrate the energetic field. A multi-sensory approach to deep healing.',
        span: 'md:col-span-1',
        link: '/services/healing-codes'
    },
];

// Generic staggering variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut"
        }
    }
};

const Services = () => {
    return (
        <div className="min-h-screen bg-[var(--color-primary)] pt-32 pb-20">
            <div className="container mx-auto px-6">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center mb-20"
                >
                    <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">Our Services</h1>
                    <p className="text-xl text-[var(--color-text-muted)] max-w-2xl mx-auto">
                        Ancient modalities for modern healing. Choose your path to clarity.
                    </p>
                </motion.div>

                {/* ── Bento Grid ── */}
                <motion.div
                    className="grid md:grid-cols-3 gap-6 mb-16"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {services.map((service) => (
                        <Link
                            to={service.link}
                            key={service.id}
                            className={`${service.span} block group`}
                        >
                            <motion.div
                                variants={itemVariants}
                                className="h-full shimmer-hover relative overflow-hidden rounded-2xl glass p-8 border border-white/5 hover:border-[var(--color-secondary)]/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-[var(--color-secondary)]/10"
                            >
                                <div className="text-[var(--color-secondary)] mb-4 w-fit group-hover:scale-110 origin-center transition-transform duration-300">{service.icon}</div>
                                <h3 className="text-2xl font-serif font-bold mb-3">{service.title}</h3>
                                <p className="text-[var(--color-text-muted)] text-sm leading-relaxed mb-6">{service.description}</p>
                                <div className="flex gap-3 mt-auto">
                                    <span className="bg-[var(--color-secondary)] text-[var(--color-primary)] px-5 py-2 text-sm font-bold rounded-lg inline-flex items-center gap-2 group-hover:bg-[#A98F47] transition-colors">
                                        More Info <ArrowRight size={16} />
                                    </span>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </motion.div>

                {/* ── Signature Service: Integrated Healing ── */}
                <motion.section
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8 }}
                    className="relative rounded-3xl overflow-hidden glass border border-[var(--color-secondary)]/30 p-12 md:p-24 text-center"
                >
                    {/* Glowing Aura */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[var(--color-secondary)] opacity-[0.08] blur-[120px] rounded-full animate-pulse pointer-events-none" />

                    <div className="relative z-10 max-w-3xl mx-auto">
                        <Sparkles className="mx-auto text-[var(--color-secondary)] mb-6" size={48} />
                        <div className="uppercase tracking-[0.3em] text-xs text-[var(--color-secondary)] mb-4">Signature Service</div>
                        <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6">
                            Integrated Healing Through Channeling
                        </h2>
                        <p className="text-lg mb-10 text-[var(--color-text-muted)] leading-relaxed max-w-2xl mx-auto">
                            A comprehensive session combining multiple modalities for deep-rooted shifts.
                            This is for those ready for a complete energetic overhaul — the most transformative offering at DYL.
                        </p>
                        <Link to="/services/integrated-healing">
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(212,175,55,0.5)' }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-[var(--color-secondary)] text-white px-10 py-4 text-lg font-bold tracking-wide rounded-lg inline-flex items-center gap-2 border-2 border-[var(--color-secondary)] shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                            >
                                Learn More <ArrowRight size={18} />
                            </motion.button>
                        </Link>
                    </div>
                </motion.section>
            </div>
        </div>
    );
};

export default Services;
