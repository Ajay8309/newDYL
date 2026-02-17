import React from 'react';
import { motion } from 'framer-motion';
import mentorImage from '../assets/mentorr.png';
import { Brain, Heart, Zap } from 'lucide-react';

const About = () => {
    return (
        <div className="min-h-screen bg-[var(--color-primary)] pt-36">

            {/* ── Split Hero ── */}
            <section className="container mx-auto px-6 py-20">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-[var(--color-secondary)]/10 translate-x-4 translate-y-4 rounded-2xl -z-10" />
                        <img
                            src={mentorImage}
                            alt="Aashna Ahuja – Psychic Mentor & Spiritual Guide"
                            className="rounded-2xl shadow-2xl w-full object-cover aspect-[3/4]"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <p className="uppercase tracking-[0.3em] text-xs text-[var(--color-secondary)] mb-4">
                            Psychic Mentor · Spiritual Guide
                        </p>
                        <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">Aashna Ahuja</h1>
                        <h2 className="text-xl text-[var(--color-text-muted)] mb-8 italic">
                            Certified in Vedic Vastu, NLP, and more.
                        </h2>

                        <div className="space-y-5 text-[var(--color-text-muted)] leading-relaxed">
                            <p>
                                <strong className="text-white">The Corporate Phase:</strong> For years, Aashna held leadership roles at
                                <span className="text-[var(--color-secondary)]"> Amazon</span>,
                                <span className="text-[var(--color-secondary)]"> Uber</span>, and
                                <span className="text-[var(--color-secondary)]"> Zomato</span>
                                — scaling teams, driving growth, and measuring success in KPIs and promotions.
                            </p>
                            <p>
                                <strong className="text-white">The Transition:</strong> In 2021, she left the corporate world to pursue the spiritual path in Goa,
                                following a calling that had been building for years. She dove deep into the ancient technologies of the self.
                            </p>
                            <p>
                                <strong className="text-white">The Hospitality Angle:</strong> Alongside her spiritual practice, Aashna built
                                <span className="text-[var(--color-secondary)]"> Tanash Homes</span> — boutique hospitality spaces for seekers and travelers looking for a conscious living experience.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── Philosophy Quote ── */}
            <section className="py-16 border-y border-white/5 bg-white/[0.02]">
                <div className="container mx-auto px-6 text-center">
                    <motion.blockquote
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-serif italic text-[var(--color-secondary)] max-w-3xl mx-auto leading-snug"
                    >
                        "Spirituality is not about escaping life, but understanding it deeply."
                    </motion.blockquote>
                </div>
            </section>

            {/* ── Credibility Bar (Scrolling Marquee) ── */}
            <section className="py-12 border-b border-white/5 overflow-hidden">
                <div className="container mx-auto px-6 mb-4 text-center text-sm uppercase tracking-widest text-[var(--color-text-muted)]">
                    Former leadership at
                </div>
                <div className="relative flex overflow-x-hidden">
                    <motion.div
                        animate={{ x: ['0%', '-50%'] }}
                        transition={{ repeat: Infinity, ease: 'linear', duration: 20 }}
                        className="flex gap-24 whitespace-nowrap py-4"
                    >
                        {['AMAZON', 'UBER', 'ZOMATO', 'TANASH HOMES', 'AMAZON', 'UBER', 'ZOMATO', 'TANASH HOMES'].map((company, i) => (
                            <span key={i} className="text-3xl font-serif font-bold text-white/20 select-none">
                                {company}
                            </span>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── The DYL Method ── */}
            <section className="py-24 container mx-auto px-6">
                <h2 className="text-4xl text-center font-serif font-bold mb-16">
                    The <span className="text-[var(--color-secondary)]">DYL</span> Method
                </h2>
                <div className="grid md:grid-cols-3 gap-12 text-center">
                    {[
                        { icon: <Brain size={48} />, title: 'Pattern Recognition', desc: 'Identifying the subconscious loops, core beliefs, and karmic cycles that keep you stuck in repetition.' },
                        { icon: <Zap size={48} />, title: 'Consciousness Shift', desc: 'Raising your vibrational frequency on the Hawkins scale — moving from force to power, from fear to love.' },
                        { icon: <Heart size={48} />, title: 'Sustainable Evolution', desc: 'Integrating changes into daily reality so transformation sticks — not a weekend high, but a permanent shift.' },
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15 }}
                            className="flex flex-col items-center"
                        >
                            <div className="w-24 h-24 rounded-full glass flex items-center justify-center text-[var(--color-secondary)] mb-6 border border-[var(--color-secondary)]/20">
                                {item.icon}
                            </div>
                            <h3 className="text-2xl font-serif font-bold mb-4">{item.title}</h3>
                            <p className="text-[var(--color-text-muted)] text-sm leading-relaxed">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default About;
