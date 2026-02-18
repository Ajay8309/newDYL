import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import mentorImage from '../assets/mentorr.png';
import { Brain, Heart, Zap, Sparkles, Star, ArrowRight, Award, Users, MapPin } from 'lucide-react';

/* ── Data ──────────────────────────────────────────────── */
const certifications = [
    'Vedic Astrology', 'Vedic Numerology', 'Reiki Healing',
    'Crystal Healing', 'NLP', 'Tarot', 'Vedic Vastu', 'Akashic Records',
];

const timeline = [
    {
        year: 'Early Career',
        label: 'The Corporate Phase',
        text: 'Born and raised in Indore, Aashna followed a conventional corporate path — holding leadership roles at Amazon, Uber, and Zomato. Scaling teams, driving growth, and measuring success in KPIs and promotions.',
    },
    {
        year: '2021',
        label: 'The Turning Point',
        text: 'She left the corporate world to pursue the spiritual path in Goa, following a calling that had been building for years. She dove deep into the ancient technologies of the self.',
    },
    {
        year: 'Goa',
        label: 'The Hospitality Chapter',
        text: 'Alongside her spiritual practice, Aashna built Tanash Homes — boutique hospitality spaces for seekers and travellers. Previously owned a café and hostel in Vagator; later founded the luxury holiday-home brand that now hosts 150+ returning guests annually.',
    },
    {
        year: 'Now',
        label: 'The DYL Practice',
        text: 'Today she guides 30+ clients through emotional healing, past-life karma resolution, relationship clarity, and life-path alignment — offering sessions rooted in compassion, honesty, and deep energetic awareness.',
    },
];

/* ── Helpers ───────────────────────────────────────────── */
const GoldDivider = ({ label }) => (
    <div className="flex items-center gap-4 mb-7">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[var(--color-secondary)]" />
        <span className="text-[0.55rem] tracking-[0.4em] text-[var(--color-secondary)] uppercase whitespace-nowrap font-bold">
            {label}
        </span>
        <div className="flex-1 h-px bg-gradient-to-r from-[var(--color-secondary)] to-transparent" />
    </div>
);

/* ══════════════════════════════════════════════════════════
   COMPONENT
═══════════════════════════════════════════════════════════ */
const About = () => {
    return (
        <div className="min-h-screen bg-[var(--color-primary)] pt-20">

            {/* ══ HERO SPLIT ══════════════════════════════════════════ */}
            <section className="max-w-[1200px] mx-auto px-8 pt-16 pb-8 grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-12 items-start">

                {/* Left: Portrait */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    className="relative"
                >
                    {/* Offset decorative frame */}
                    <div className="absolute top-6 left-6 -right-6 -bottom-6 border border-[var(--color-secondary)]/20 pointer-events-none z-0" />
                    {/* Glow */}
                    <div className="absolute -inset-5 bg-[radial-gradient(ellipse_at_center,var(--color-secondary)/6%,transparent_70%)] pointer-events-none" />

                    <div className="relative z-[1] overflow-hidden">
                        <img
                            src={mentorImage}
                            alt="Aashna Ahuja – Psychic Mentor & Spiritual Guide"
                            className="w-full block object-cover object-[center_18%] aspect-[3/4] brightness-[0.92] contrast-[1.05] saturate-[0.9]"
                        />
                        {/* Bottom fade */}
                        <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-[var(--color-primary)]/75 to-transparent" />
                        {/* Name overlay */}
                        <div className="absolute bottom-7 left-7 right-7">
                            <div className="text-[1.6rem] font-serif font-normal text-[var(--color-cream)] leading-tight mb-1">
                                Aashna Ahuja
                            </div>
                            <div className="text-[0.55rem] tracking-[0.3em] text-[var(--color-secondary)] uppercase font-bold">
                                PSYCHIC MENTOR · SPIRITUAL GUIDE
                            </div>
                        </div>
                    </div>

                    {/* Certification pills */}
                    <div className="mt-8 flex flex-wrap gap-2">
                        {certifications.map(cert => (
                            <span
                                key={cert}
                                className="inline-block text-[0.5rem] tracking-[0.2em] text-[var(--color-secondary)] bg-[var(--color-secondary)]/8 border border-[var(--color-secondary)]/25 px-3 py-1.5 uppercase font-bold"
                            >
                                {cert}
                            </span>
                        ))}
                    </div>
                </motion.div>

                {/* Right: Bio */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                >
                    <span className="block text-[0.58rem] tracking-[0.42em] text-[var(--color-secondary)] uppercase mb-4 font-bold">
                        Psychic Mentor · Astrologer · Healing Guide · <br /> Airbnb Host @ Tanash Homes
                    </span>

                    <h1 className="font-serif font-light leading-[1.1] text-[clamp(2.8rem,5vw,4.2rem)] text-[var(--color-cream)] mb-2">
                        Meet the<br />
                        <span className="text-[var(--color-secondary)] italic">DYL Mentor</span>
                    </h1>

                    <div className="h-px bg-gradient-to-r from-[var(--color-secondary)] to-transparent my-7" />

                    <div className="space-y-5 text-[var(--color-text-muted)] leading-relaxed text-[15px]">
                        <p>
                            Aashna Ahuja is a psychic mentor and spiritual guide who helps individuals decode their life patterns, heal karmic imprints, and reconnect with their soul's truth. Her work blends{' '}
                            <span className="text-[var(--color-secondary)]">Akashic Records, Vedic Astrology, Numerology, Tarot, Reiki, Crystal Healing,</span> and{' '}
                            <span className="text-[var(--color-secondary)]">Vedic Vaastu</span> — creating a deeply intuitive yet grounded approach to inner transformation.
                        </p>
                        <p>
                            She has guided <strong className="text-[var(--color-cream)] font-normal">30+ clients</strong> through emotional healing, past-life karma resolution, relationship clarity, and life-path alignment — offering sessions rooted in compassion, honesty, and deep energetic awareness.
                        </p>
                    </div>

                    {/* Stats row */}
                    <div className="grid grid-cols-3 gap-px bg-[var(--color-secondary)]/12 border border-[var(--color-secondary)]/12 mt-10 mb-10">
                        {[['30+', 'Clients Guided'], ['200+', 'Sessions Held'], ['150+', 'Tanash Guests/yr']].map(([num, lbl]) => (
                            <div key={lbl} className="text-center py-6 px-4 bg-[var(--color-secondary)]/[0.02]">
                                <div className="font-serif text-[2.2rem] font-light text-[var(--color-secondary)] leading-none">{num}</div>
                                <div className="text-[0.65rem] tracking-[0.15em] text-[var(--color-text-muted)] uppercase mt-1.5">{lbl}</div>
                            </div>
                        ))}
                    </div>

                    {/* Former leadership */}
                    <div className="p-4 border border-[var(--color-secondary)]/12 bg-[var(--color-secondary)]/[0.02]">
                        <div className="text-[0.5rem] tracking-[0.35em] text-[var(--color-text-muted)] uppercase mb-2 text-center">Former Leadership At</div>
                        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
                            {['Amazon', 'Uber', 'Zomato', 'Tanash Homes', 'Mirashya Homes', 'Viking Homestays'].map(name => (
                                <span key={name} className="font-serif text-lg md:text-xl font-semibold text-white/30 tracking-[0.15em] uppercase select-none whitespace-nowrap">
                                    {name}
                                </span>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </section>

            <section className="py-12 text-center border-y border-white/5 bg-white/[0.02] relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-[radial-gradient(ellipse,var(--color-secondary)/5%,transparent_70%)] pointer-events-none" />
                <motion.blockquote
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative m-0"
                >
                    <div className="font-serif text-5xl text-[var(--color-secondary)]/20 leading-none mb-3">"</div>
                    <p className="font-serif text-[clamp(1.4rem,3vw,2rem)] italic font-light text-[var(--color-cream)] max-w-[720px] mx-auto mb-4 leading-relaxed px-4">
                        A hungry stomach can't let you sleep,<br />a hungry soul can't let you die.
                    </p>
                    <cite className="text-[0.58rem] tracking-[0.35em] text-[var(--color-secondary)] not-italic font-bold uppercase">
                        — Aashna Ahuja
                    </cite>
                </motion.blockquote>
            </section>

            {/* ══ JOURNEY TIMELINE ════════════════════════════════════ */}
            <section className="max-w-[1100px] mx-auto px-8 py-16">
                <div className="text-center mb-12">
                    <GoldDivider label="Her Story" />
                    <h2 className="font-serif font-light text-[clamp(2rem,4vw,3rem)] text-[var(--color-cream)] text-center leading-[1.1]">
                        From Corporate Life<br />
                        <span className="italic text-[var(--color-secondary)]">to </span>
                        <span className="italic text-[var(--color-cream)]">Conscious Living</span>
                    </h2>
                </div>

                <div className="relative">
                    {/* Vertical spine */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[var(--color-secondary)]/30 to-transparent -translate-x-1/2" />

                    {timeline.map((item, i) => {
                        const isLeft = i % 2 === 0;
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: i * 0.1 }}
                                className="grid grid-cols-[1fr_60px_1fr] items-center mb-8"
                            >
                                <div className="px-10">
                                    {isLeft && (
                                        <div className="p-8 border border-white/5 bg-[var(--color-secondary)]/[0.02] hover:border-[var(--color-secondary)]/20 transition-colors duration-500">
                                            <div className="text-[0.55rem] tracking-[0.3em] text-[var(--color-secondary)] mb-2.5 uppercase font-bold">
                                                {item.label.toUpperCase()}
                                            </div>
                                            <p className="text-[var(--color-text-muted)] text-[0.93rem] leading-relaxed m-0">{item.text}</p>
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-col items-center gap-1.5">
                                    <div className="w-3.5 h-3.5 rounded-full bg-[var(--color-secondary)] shadow-[0_0_16px_var(--color-secondary)/50] border-2 border-[var(--color-primary)] shrink-0" />
                                    <div className="text-[0.5rem] tracking-[0.15em] text-[var(--color-secondary)] text-center font-bold">{item.year}</div>
                                </div>

                                <div className="px-10">
                                    {!isLeft && (
                                        <div className="p-8 border border-white/5 bg-[var(--color-secondary)]/[0.02] hover:border-[var(--color-secondary)]/20 transition-colors duration-500">
                                            <div className="text-[0.55rem] tracking-[0.3em] text-[var(--color-secondary)] mb-2.5 uppercase font-bold">
                                                {item.label.toUpperCase()}
                                            </div>
                                            <p className="text-[var(--color-text-muted)] text-[0.93rem] leading-relaxed m-0">{item.text}</p>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* ══ DYL METHOD ══════════════════════════════════════════ */}
            <section className="bg-white/[0.02] border-y border-white/5 py-16 px-8">
                <div className="max-w-[1100px] mx-auto">
                    <div className="text-center mb-12">
                        <GoldDivider label="The Method" />
                        <h2 className="font-serif font-light text-[clamp(2rem,4vw,3rem)] text-[var(--color-cream)] text-center leading-[1.1]">
                            The{' '}
                            <span className="italic text-[var(--color-secondary)]">DYL</span>{' '}
                            Method
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-px bg-[var(--color-secondary)]/10">
                        {[
                            { icon: <Brain size={36} />, title: 'Pattern Recognition', step: '01', desc: 'Identifying the subconscious loops, core beliefs, and karmic cycles that keep you stuck in repetition. The map precedes the territory.' },
                            { icon: <Zap size={36} />, title: 'Consciousness Shift', step: '02', desc: 'Raising your vibrational frequency on the Hawkins scale — moving from force to power, from fear to love. Elevation is the mechanism.' },
                            { icon: <Heart size={36} />, title: 'Sustainable Evolution', step: '03', desc: 'Integrating changes into daily reality so transformation sticks — not a weekend high, but a permanent recalibration of self.' },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15, duration: 0.7 }}
                                className="py-14 px-10 bg-[var(--color-primary)] text-center relative overflow-hidden group hover:bg-[var(--color-secondary)]/[0.04] transition-colors duration-500"
                            >
                                <div className="absolute -top-2 right-4 font-serif text-[7rem] text-[var(--color-secondary)]/5 leading-none select-none">
                                    {item.step}
                                </div>
                                <div className="w-20 h-20 rounded-full border border-[var(--color-secondary)]/25 bg-[var(--color-secondary)]/5 flex items-center justify-center mx-auto mb-8 text-[var(--color-secondary)]">
                                    {item.icon}
                                </div>
                                <div className="text-[0.55rem] tracking-[0.3em] text-[var(--color-secondary)] mb-3 font-bold">STEP {item.step}</div>
                                <h3 className="font-serif text-2xl font-normal text-[var(--color-cream)] mb-4">{item.title}</h3>
                                <p className="text-[var(--color-text-muted)] text-sm leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ TANASH HOMES ════════════════════════════════════════ */}
            <section className="max-w-[1100px] mx-auto px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-[3fr_5fr] gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9 }}
                    >
                        <GoldDivider label="Beyond the Practice" />
                        <div className="font-serif text-[5rem] text-[var(--color-secondary)]/12 leading-none mb-4">⌂</div>
                        <h2 className="font-serif font-light text-[clamp(1.8rem,3vw,2.5rem)] text-[var(--color-cream)] leading-[1.1] mb-6">
                            Tanash<br /><span className="text-[var(--color-secondary)] italic">Homes</span>
                        </h2>
                        <a
                            href="https://www.tanashhomes.in"
                            target="_blank"
                            rel="noreferrer"
                            className="text-[0.55rem] tracking-[0.25em] text-[var(--color-secondary)] no-underline border-b border-[var(--color-secondary)]/40 pb-0.5 hover:border-[var(--color-secondary)] transition-colors"
                        >
                            TANASHHOMES.IN ↗
                        </a>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: 0.15 }}
                    >
                        <p className="text-[var(--color-text-muted)] leading-relaxed mb-6">
                            Alongside her spiritual practice, Aashna founded <strong className="text-[var(--color-cream)] font-normal">Tanash Homes</strong> — a luxury holiday-home brand in Goa built for seekers and conscious travellers. She previously owned a café and hostel in Vagator, and this hospitality chapter deeply shaped her understanding of people, patterns, emotions, and unspoken stories.
                        </p>
                        <p className="text-[var(--color-text-muted)] leading-relaxed mb-8">
                            The spaces are designed for those who arrive with questions and leave with clarity — a seamless extension of the DYL philosophy into physical form.
                        </p>
                        <div className="flex gap-10">
                            {[['150+', 'Returning Guests/yr'], ['Goa', 'India']].map(([n, l]) => (
                                <div key={l}>
                                    <div className="font-serif text-3xl font-light text-[var(--color-secondary)] leading-none">{n}</div>
                                    <div className="text-[0.65rem] tracking-[0.15em] text-[var(--color-text-muted)] uppercase mt-1">{l}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ══ BOTTOM CTA ══════════════════════════════════════════ */}
            <section className="py-16 px-8 text-center border-t border-white/5 bg-white/[0.01] relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,var(--color-secondary)/5%,transparent_70%)] pointer-events-none" />
                <div className="relative">
                    <GoldDivider label="Begin" />
                    <h2 className="font-serif font-light text-[clamp(2rem,4vw,3rem)] text-[var(--color-cream)] leading-[1.1] mb-5">
                        Ready to work with<br />
                        <span className="italic text-[var(--color-secondary)]">Aashna?</span>
                    </h2>
                    <p className="text-[var(--color-text-muted)] max-w-[400px] mx-auto mb-10 leading-relaxed">
                        Book a session and begin decoding the patterns that have shaped your life.
                    </p>
                    <Link to="/booking">
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: '0 16px 50px rgba(255, 255, 255, 0.3)' }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-black px-14 py-4 text-sm font-bold tracking-[0.3em] uppercase border-2 border-[var(--color-secondary)] cursor-pointer text-[var(--color-cream)]"
                        >
                            Book My Slot
                        </motion.button>
                    </Link>
                </div>
            </section>

        </div>
    );
};

export default About;