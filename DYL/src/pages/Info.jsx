import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, ChevronUp, Star, Sparkles } from 'lucide-react';

const faqs = [
    {
        q: 'Who are these modalities for?',
        a: 'These modalities are for anyone stuck in patterns — whether it\'s recurring relationship dynamics, addiction, blocked wealth and career stagnation, or soul seekers looking for deeper meaning and purpose in life.',
    },
    {
        q: 'How many sessions would I need?',
        a: 'That depends entirely on your situation and goals. However, even a single session gives immense insight and clarity. Many clients feel a significant shift after just one conversation.',
    },
    {
        q: 'Is this therapy or healing?',
        a: 'It\'s a mix of both. It\'s based on pattern recognition and therapeutic layers. We work at the intersection of psychology and energy, using ancient tools to address modern challenges.',
    },
    {
        q: 'Can I book for someone else?',
        a: 'Yes, you can gift a session. However, the recipient must be willing and open to the process for it to be effective.',
    },
    {
        q: 'Are sessions conducted online?',
        a: 'Yes. Most sessions are conducted online via Google Meet or Zoom. In-person sessions are available in Goa by prior arrangement.',
    },
];

const reviews = [
    {
        text: '"The guidance was gentle, honest, and surprisingly accurate in ways that mattered."',
        name: 'Constanza',
        location: 'Spain',
    },
    {
        text: '"One session gave me immense insight into patterns I\'d been repeating for years. The clarity was profound."',
        name: 'Priya M.',
        location: 'Mumbai',
    },
    {
        text: '"Aashna bridges science and spirituality like no one else. Every session is deeply transformative."',
        name: 'Rahul K.',
        location: 'Bangalore',
    },
];

const Info = () => {
    const [openFaq, setOpenFaq] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredFaqs = faqs.filter(faq =>
        faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.a.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#0f1410] pt-32 pb-20 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full -z-0" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-900/10 blur-[100px] rounded-full -z-0" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-20"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-950/30 backdrop-blur-sm mb-8"
                    >
                        <Sparkles size={14} className="text-emerald-400" />
                        <span className="text-xs tracking-[0.2em] text-emerald-300 uppercase">
                            Your Questions Answered
                        </span>
                    </motion.div>

                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-white mb-8 tracking-tight leading-[1.1]"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                        Client <br />
                        <span className="text-emerald-400 italic">Information</span>
                    </h1>

                    <div className="w-24 h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent mx-auto mb-8" />
                </motion.div>

                {/* ── FAQ Section ── */}
                <section className="mb-32 max-w-3xl mx-auto">
                    <h2 className="text-3xl font-serif font-bold mb-12 text-center text-white">
                        Frequently Asked <span className="text-emerald-400 italic">Questions</span>
                    </h2>

                    {/* Search */}
                    <div className="relative mb-12 group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/20 to-transparent rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
                        <div className="relative">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-emerald-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search FAQs…"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-4 focus:outline-none focus:border-emerald-500/50 transition-all text-white placeholder:text-white/20 backdrop-blur-md"
                            />
                        </div>
                    </div>

                    {/* Accordion */}
                    <div className="space-y-4">
                        {filteredFaqs.map((faq, index) => (
                            <div key={index} className="glass rounded-2xl overflow-hidden border border-white/5 hover:border-emerald-500/10 transition-all">
                                <button
                                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                    className="w-full text-left px-8 py-6 flex justify-between items-center hover:bg-white/5 transition-colors gap-4"
                                >
                                    <span className="text-emerald-50/90 font-medium">{faq.q}</span>
                                    {openFaq === index
                                        ? <ChevronUp size={18} className="flex-shrink-0 text-emerald-400" />
                                        : <ChevronDown size={18} className="flex-shrink-0 text-emerald-400/40" />
                                    }
                                </button>
                                <AnimatePresence>
                                    {openFaq === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="px-8 pb-6 text-emerald-100/60 border-t border-white/5 pt-5 text-sm leading-relaxed">
                                                {faq.a}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── What to Expect ── */}

                {/* ── What to Expect ── */}
                <section className="mb-24 max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl font-serif font-bold mb-4">
                            What to <span className="text-[var(--color-secondary)]">Expect</span>
                        </h2>
                        <p className="text-[var(--color-text-muted)]">
                            Your complete guide to preparing for and getting the most from your session.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            {
                                icon: '🧘',
                                title: 'Before Your Session',
                                points: [
                                    'Set an intention — what do you want clarity on?',
                                    'Be in a quiet, private space (for online sessions)',
                                    'Keep a notebook handy for insights',
                                    'Come with an open mind — no specific outcome expected',
                                    'Avoid alcohol/heavy meals for 4 hours prior',
                                ],
                            },
                            {
                                icon: '💫',
                                title: 'During Your Session',
                                points: [
                                    'The session begins with a brief centering exercise',
                                    'Aashna will use the chosen modality to read your energy',
                                    'You may share as much or as little as you like',
                                    'Expect honest, direct insights — not predictions',
                                    'Sessions typically last 45–90 minutes',
                                ],
                            },
                            {
                                icon: '🌱',
                                title: 'After Your Session',
                                points: [
                                    'Drink plenty of water — energy work can be dehydrating',
                                    'Journal your insights within 24 hours',
                                    'You may feel emotional shifts for 2–3 days (this is normal)',
                                    'Integration takes time — be patient with yourself',
                                    'Follow any specific guidance given during the session',
                                ],
                            },
                            {
                                icon: '📋',
                                title: 'Important Notes',
                                points: [
                                    'All sessions are strictly confidential',
                                    'This is NOT a replacement for medical/psychological care',
                                    'No diagnoses or medical advice will be given',
                                    'Results vary — your openness affects outcome',
                                    'Recordings are not permitted during sessions',
                                ],
                            },
                        ].map((card, i) => (
                            <motion.div
                                key={card.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="glass rounded-2xl p-8"
                            >
                                <div className="text-3xl mb-4">{card.icon}</div>
                                <h3 className="text-xl font-serif font-bold mb-4">{card.title}</h3>
                                <ul className="space-y-3">
                                    {card.points.map((point, j) => (
                                        <li key={j} className="flex items-start gap-3 text-sm text-[var(--color-text-muted)]">
                                            <span className="text-[var(--color-secondary)] mt-0.5 flex-shrink-0">✦</span>
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </section>

                <div className="section-divider mb-16" />
                <section className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-serif font-bold mb-12 text-center">
                        Client <span className="text-[var(--color-secondary)]">Reviews</span>
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {reviews.map((review, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="glass rounded-2xl p-8 relative pt-12"
                            >
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[var(--color-primary)] p-2 rounded-full border border-[var(--color-secondary)]/40">
                                    <Star className="text-[var(--color-secondary)] fill-[var(--color-secondary)]" size={16} />
                                </div>
                                <p className="italic text-[var(--color-text-muted)] mb-6 text-sm leading-relaxed">
                                    {review.text}
                                </p>
                                <div className="text-center border-t border-white/5 pt-4">
                                    <div className="font-serif font-bold text-sm">{review.name}</div>
                                    <div className="text-xs text-[var(--color-secondary)] uppercase tracking-widest">{review.location}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div >
        </div >
    );
};

export default Info;
