import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import heroBg from '../assets/hero-bg-new.png';
import { Star, ChevronDown, ChevronUp, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import UpwardSpiral from '../components/UpwardSpiral';

import tarotCard from '../assets/tarot-card-7c5dj9kqjnwd4cwr.jpg';
import reikiImg from '../assets/reiki-2.jpg';
import akashicImg from '../assets/akashic-records.webp';
import numerologyImg from '../assets/numerology.jpg';
import pendulumImg from '../assets/Crystal-and-pendulum-healing-evening.jpg';
import zodiacImg from '../assets/Signs-of-the-Zodiac-astrology.jpg';
import faceImg from '../assets/lights-brain-frequencies-luminous-thought-lucid-mind-series-arrangement-d-rendering-glowing-wire-mesh-human-face-theme-189380655.jpg';
import innerChildImg from '../assets/iner-child-facebook-cover-5.jpg';
import alchemistImg from '../assets/alchemist.png';

/* Consciousness levels with Hawkins scale values */
const consciousnessLevels = [
    { level: '700+', name: 'Enlightenment', tier: 'peak', desc: 'Isness. Pure consciousness. Non-duality. The watcher becomes the watched.' },
    { level: '600', name: 'Peace', tier: 'peak', desc: 'Bliss. Transcendent stillness. Everything is alive, radiant, and continuously unfolding.' },
    { level: '540', name: 'Joy', tier: 'high', desc: 'Serenity. Healing occurs just by being in your presence. Effortless flow.' },
    { level: '500', name: 'Love', tier: 'high', desc: 'Reverence. Forgiveness. You see the essence rather than the details.' },
    { level: '400', name: 'Reason', tier: 'mid', desc: 'Understanding. Abstraction. Science. You seek meaning and logic in all things.' },
    { level: '350', name: 'Acceptance', tier: 'mid', desc: 'Forgiveness. "It is what it is." You stop resisting life and start navigating it.' },
    { level: '310', name: 'Willingness', tier: 'mid', desc: 'Optimism. "I can do this." You become friendly to life and its challenges.' },
    { level: '250', name: 'Neutrality', tier: 'mid', desc: 'Trust. "I am safe." You are easy-going and don\'t need to control outcomes.' },
    { level: '200', name: 'Courage', tier: 'threshold', desc: 'Empowerment. The tipping point. You take responsibility and action.' },
    { level: '175', name: 'Pride', tier: 'low', desc: 'Demanding. "My way." Defensive. Feels good but is brittle.' },
    { level: '150', name: 'Anger', tier: 'low', desc: 'Hate. "I want revenge." Can be a moving force or a destructive one.' },
    { level: '125', name: 'Desire', tier: 'low', desc: 'Craving. "I want." Never satisfied. The trap of addiction and accumulation.' },
    { level: '100', name: 'Fear', tier: 'low', desc: 'Anxiety. "The world is dangerous." Paranoia. You see threats everywhere.' },
    { level: '75', name: 'Grief', tier: 'low', desc: 'Regret. "I lost it." Sadness. You see the past as a series of losses.' },
    { level: '50', name: 'Apathy', tier: 'low', desc: 'Hopelessness. "I can\'t." The state of victimhood and helplessness.' },
    { level: '30', name: 'Guilt', tier: 'low', desc: 'Blame. "It\'s my fault." Self-recrimination and remorse.' },
    { level: '20', name: 'Shame', tier: 'low', desc: 'Humiliation. "I am bad." You want to disappear. The lowest vibration.' },
];

const tierColors = {
    peak: 'text-[var(--color-secondary)]',
    high: 'text-emerald-400',
    mid: 'text-sky-400',
    threshold: 'text-amber-400',
    low: 'text-[var(--color-text-muted)]',
};

const reviews = [
    {
        text: '"The guidance was gentle, honest, and surprisingly accurate in ways that mattered. Aashna picked up on things I hadn\'t shared with anyone — it felt like she was reading the blueprint of my life."',
        name: 'Constanza',
        location: 'Spain',
        modality: 'Tarot Guidance',
        stars: 5,
        initials: 'C',
    },
    {
        text: '"I finally understood why I kept attracting the same situations and relationships. One session gave me immense clarity. Within weeks, I noticed myself responding differently to old triggers."',
        name: 'Priya M.',
        location: 'Mumbai, India',
        modality: 'Integrated Healing',
        stars: 5,
        initials: 'PM',
    },
    {
        text: '"Aashna bridges science and spirituality like no one else. The session was deeply transformative. She explained every insight with logic and precision, yet it felt deeply intuitive at the same time."',
        name: 'Rahul K.',
        location: 'Bangalore, India',
        modality: 'Astrology Reading',
        stars: 5,
        initials: 'RK',
    },
    {
        text: '"I was skeptical, but after the Akashic reading, I felt a shift I can\'t explain. Three months later, a career opportunity I\'d chased for years materialized effortlessly. Coincidence? I don\'t think so."',
        name: 'Ananya S.',
        location: 'Delhi, India',
        modality: 'Akashic Records',
        stars: 5,
        initials: 'AS',
    },
    {
        text: '"The Reiki session was unlike anything I\'d experienced before. A deep, lasting calm settled in — something I hadn\'t felt in years. I\'ve booked three more sessions since. Life-changing doesn\'t begin to cover it."',
        name: 'David L.',
        location: 'London, UK',
        modality: 'Reiki Healing',
        stars: 5,
        initials: 'DL',
    },
    {
        text: '"Her integrated healing session was the most powerful 90 minutes of my life. Patterns I\'d carried for decades — in relationships, finances, self-worth — finally made sense. I left feeling lighter than I have in 20 years."',
        name: 'Meera J.',
        location: 'Pune, India',
        modality: 'Integrated Healing',
        stars: 5,
        initials: 'MJ',
    },
];

const Home = () => {
    const scrollRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: scrollRef, offset: ['start start', 'end end'] });

    /* Carousel state */
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [hoveredLevel, setHoveredLevel] = useState(null);
    const [openFaq, setOpenFaq] = useState(null);
    const slidesPerView = 3; // shows 3 at a time on desktop (1 on mobile via CSS)

    useEffect(() => {
        if (isPaused) return;
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % reviews.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [isPaused]);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % reviews.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + reviews.length) % reviews.length);

    /* Get visible slides wrapping around */
    const getVisibleReviews = () => {
        const visible = [];
        for (let i = 0; i < slidesPerView; i++) {
            visible.push(reviews[(currentSlide + i) % reviews.length]);
        }
        return visible;
    };

    return (
        <div className="min-h-screen bg-[var(--color-primary)] overflow-x-hidden">

            {/* ═══════════════════════════════════════════
          1 · HERO
      ═══════════════════════════════════════════ */}
            <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    webkit-playsinline="true"
                    preload="auto"
                    className="absolute inset-0 w-full h-full object-cover md:scale-110 z-0"
                    style={{ filter: 'brightness(0.45)' }}
                    poster={heroBg}
                >
                    <source src="/heroVid.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--color-primary)] z-0" />

                <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="uppercase tracking-[0.3em] text-sm text-[var(--color-secondary)] mb-6"
                    >
                        No marketing gimmick · Full transparency · Only care &amp; healing
                    </motion.p>

                    <motion.h1
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.6 }}
                        className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-[1.1] mb-4"
                    >
                        <span className="relative inline-block">
                            Decode
                            <motion.span
                                initial={{ width: 0 }}
                                animate={{ width: '100%' }}
                                transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
                                className="absolute left-0 bottom-1 md:bottom-2 h-[1px] bg-white/90"
                            />
                        </span> Your Life
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="text-2xl md:text-3xl lg:text-4xl font-serif tracking-[0.12em] uppercase text-[var(--color-secondary)] mb-8"
                    >
                        Science + <span className="relative inline-block">
                            Spirituality
                            <motion.span
                                initial={{ width: 0 }}
                                animate={{ width: '100%' }}
                                transition={{ duration: 1, delay: 1.4, ease: "easeOut" }}
                                className="absolute left-0 bottom-0 md:bottom-1 h-[1px] bg-white/90"
                            />
                        </span>
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1 }}
                        className="text-lg md:text-xl text-[var(--color-text-muted)] mb-12 max-w-2xl mx-auto tracking-wide italic"
                    >
                        Your Life isn&apos;t Random. It&apos;s Patterned. Decodable. Transformable.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 1.4 }}
                    >
                        <Link to="/booking">
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(212,175,55,0.4)' }}
                                whileTap={{ scale: 0.95 }}
                                style={{ backgroundColor: 'var(--color-secondary)', color: '#022C22' }}
                                className="px-10 py-4 text-lg font-bold tracking-wide rounded-lg transition-all duration-300"
                            >
                                Book My Slot
                            </motion.button>
                        </Link>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 2 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[var(--color-secondary)]"
                >
                    <ChevronDown size={32} />
                </motion.div>
            </section>

            {/* ═══════════════════════════════════════════
           1.5 · STATS BAR
       ═══════════════════════════════════════════ */}
            <section className="relative z-20">
                <div className="h-px bg-gradient-to-r from-transparent via-[var(--color-secondary)]/50 to-transparent" />
                <div className="py-10 md:py-12 bg-[var(--color-primary)]">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-[var(--color-secondary)]/15">
                            {[
                                { value: '40+', label: 'Clients Worldwide' },
                                { value: '200+', label: 'Sessions Conducted' },
                                { value: '20+', label: 'Countries Reached' },
                                { value: '7+', label: 'Healing Modalities' },
                            ].map((stat, i) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex flex-col items-center py-2"
                                >
                                    <span className="text-4xl md:text-5xl font-serif font-bold text-[var(--color-secondary)] mb-1">
                                        {stat.value}
                                    </span>
                                    <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                                        {stat.label}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="h-px bg-gradient-to-r from-transparent via-[var(--color-secondary)]/50 to-transparent" />
            </section>

            {/* ═══════════════════════════════════════════
          2 · HOW IT WORKS (Reordered)
      ═══════════════════════════════════════════ */}
            <section className="py-16">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-10"
                    >
                        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
                            How It <span className="text-[var(--color-secondary)]">Works</span>
                        </h2>
                        <p className="text-lg text-[var(--color-text-muted)] max-w-2xl mx-auto">
                            Your transformation journey in three simple steps.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto relative">
                        {/* Connecting line (desktop) */}
                        <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-[var(--color-secondary)]/30 to-transparent" />

                        {[
                            {
                                step: '01',
                                title: 'Book Your Session',
                                desc: 'Choose your modality, complete the payment, and select a convenient time slot through our simple booking system.',
                                icon: '📅',
                            },
                            {
                                step: '02',
                                title: 'Connect & Explore',
                                desc: 'In a safe, non-judgmental space, we explore your patterns, blocks, and the deeper forces at play in your life.',
                                icon: '🔮',
                            },
                            {
                                step: '03',
                                title: 'Transform & Integrate',
                                desc: 'Receive actionable insights and energy work that create lasting shifts. Watch the old patterns dissolve as new ones emerge.',
                                icon: '✨',
                            },
                        ].map((item, i) => (
                            <motion.div
                                key={item.step}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15 }}
                                className="text-center"
                            >
                                <div className="w-20 h-20 mx-auto mb-6 rounded-full glass border border-[var(--color-secondary)]/30 flex items-center justify-center text-3xl relative">
                                    {item.icon}
                                    <span className="absolute -top-2 -right-2 w-7 h-7 bg-[var(--color-secondary)] text-[var(--color-primary)] rounded-full text-xs font-bold flex items-center justify-center">
                                        {item.step}
                                    </span>
                                </div>
                                <h3 className="text-xl font-serif font-bold mb-3">{item.title}</h3>
                                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed line-clamp-3">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════
          3 · SCIENCE + SPIRITUALITY (New Section)
      ═══════════════════════════════════════════ */}
            <section className="py-16 relative overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-10 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8 leading-tight">
                                How do <span className="text-[var(--color-secondary)]">Science</span> and <span className="text-[var(--color-secondary)]">Spirituality</span> come together?
                            </h2>

                            <div className="space-y-6 text-lg text-[var(--color-text-muted)] leading-relaxed">
                                <p>
                                    Science decodes the patterns of life (what is De-synchronized)<br />
                                    Spirituality decodes the patterns within you (unprocessed truth)
                                </p>
                                <p>
                                    DNA holds a memory of both.<br />
                                    Different languages.<br />
                                    Same truth.<br />
                                    <strong className="text-[var(--color-secondary)]">Connection.</strong>
                                </p>
                                <p>
                                    Where science ends its equations,<br />
                                    spirituality begins its questions.<br />
                                    Together, they guide us...
                                </p>
                                <p className="text-xl font-serif italic text-[var(--color-secondary)]">
                                    Knowledge to knowing.<br />
                                    Knowing to healing.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="absolute inset-0 bg-[var(--color-secondary)]/20 blur-[100px] rounded-full" />
                            <img
                                src={alchemistImg}
                                alt="Alchemist Scholar"
                                className="relative z-10 w-full max-w-md mx-auto rounded-t-full border-4 border-white/5 shadow-2xl"
                            />
                        </motion.div>
                    </div>

                    <div className="mt-12 grid md:grid-cols-2 gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-[var(--color-secondary)]/10 border-l-4 border-[var(--color-secondary)] p-6 rounded-r-lg"
                        >
                            <p className="italic text-sm md:text-base text-white/90 mb-4">
                                "We perceive reality based on how our brain is wired. Most changes start with the simple process of something outside us changing something inside us."
                            </p>
                            <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-secondary)]">
                                — Dr. Joe Dispenza
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-[var(--color-secondary)]/10 border-l-4 border-[var(--color-secondary)] p-6 rounded-r-lg"
                        >
                            <p className="italic text-sm md:text-base text-white/90 mb-4">
                                "Your purpose in life is to find your purpose and give your whole heart and soul to it."
                            </p>
                            <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-secondary)]">
                                — Gautama Buddha
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>



            {/* ═══════════════════════════════════════════
          4 · PATTERN THEORY (Circle vs. Spiral)
      ═══════════════════════════════════════════ */}
            <section className="py-16 bg-black/20">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-10"
                    >
                        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
                            What are <span className="text-[var(--color-secondary)]">Patterns</span>?
                        </h2>
                        <p className="text-lg text-[var(--color-text-muted)] max-w-2xl mx-auto">
                            How to identify them? How to break them?
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
                        {/* Circle */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center glass rounded-2xl p-10"
                        >
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                                className="w-40 h-40 md:w-56 md:h-56 rounded-full border-2 border-dashed border-white/20 mx-auto mb-8 flex items-center justify-center"
                            >
                                <div className="w-3 h-3 bg-white/40 rounded-full" />
                            </motion.div>
                            <h3 className="text-3xl font-serif font-bold mb-4">Life as a Circle</h3>
                            <p className="text-[var(--color-text-muted)] leading-relaxed">
                                Stuck in core beliefs &amp; karma. Repeating the same relationship dynamics,
                                financial blocks, and emotional triggers. The scenery changes, but the script stays the same.
                            </p>
                        </motion.div>

                        {/* Spiral (3D UpwardSpiral Component) */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-center glass rounded-2xl p-10 border-[var(--color-secondary)]/20"
                        >
                            <div className="w-40 h-40 md:w-56 md:h-56 mx-auto mb-8 relative flex items-center justify-center">
                                <UpwardSpiral />
                            </div>
                            <h3 className="text-3xl font-serif font-bold mb-4 text-[var(--color-secondary)]">Life as a Spiral</h3>
                            <p className="text-[var(--color-text-muted)] leading-relaxed">
                                Higher awareness, maturity, and easier decision-making.
                                You revisit the same themes but from an elevated perspective — with growth, not repetition.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════
          5 · CONSCIOUSNESS SCALE
      ═══════════════════════════════════════════ */}
            <section ref={scrollRef} className="py-16 md:py-20">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-10"
                    >
                        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
                            Map of <span className="text-[var(--color-secondary)]">Consciousness</span>
                        </h2>
                        <p className="text-lg text-[var(--color-text-muted)] max-w-2xl mx-auto">
                            Where are you on the scale? Awareness is the first step to transformation.
                        </p>
                    </motion.div>

                    <div className="max-w-2xl mx-auto relative pl-4 md:pl-0">
                        <div className="absolute left-[22px] md:left-8 top-0 bottom-0 w-1 bg-gradient-to-t from-red-900/40 via-sky-800/40 to-[var(--color-secondary)]/60 rounded-full" />

                        <div className="space-y-1">
                            {consciousnessLevels.map((item, index) => (
                                <motion.div
                                    key={item.name}
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: '-5%' }}
                                    transition={{ duration: 0.4, delay: index * 0.04 }}
                                    onMouseEnter={() => setHoveredLevel(item.name)}
                                    onClick={() => setHoveredLevel(hoveredLevel === item.name ? null : item.name)}
                                    // Removed onMouseLeave to allow toggle on mobile without instant close on tap-off (unless clicking outside, but toggle is better)
                                    // Actually keeping onMouseLeave for desktop hover behavior is fine, but on mobile click should work.
                                    // Let's keep mouse events for desktop and click for mobile.
                                    onMouseLeave={() => setHoveredLevel(null)}
                                    className="relative flex items-center gap-6 pl-4 group cursor-help py-1"
                                >
                                    {/* Line connecting to timeline */}
                                    <div className={`absolute left-0 top-1/2 -translate-y-1/2 h-[1px] bg-white/20 transition-all duration-300 ${hoveredLevel === item.name ? 'w-8 bg-[var(--color-secondary)]' : 'w-4'}`} />

                                    {/* Node */}
                                    <div className={`relative z-10 w-4 h-4 rounded-full border-2 transition-all duration-300 group-hover:scale-150 ${item.tier === 'peak' ? 'border-[var(--color-secondary)] bg-[var(--color-secondary)]' :
                                        item.tier === 'high' ? 'border-emerald-400 bg-emerald-400/30' :
                                            item.tier === 'threshold' ? 'border-amber-400 bg-amber-400/30' :
                                                item.tier === 'mid' ? 'border-sky-400 bg-sky-400/20' :
                                                    'border-white/20 bg-white/5'
                                        }`} />

                                    {/* Level Value */}
                                    <span className="text-sm font-mono w-12 text-[var(--color-text-muted)] group-hover:text-white transition-colors">{item.level}</span>

                                    {/* Name & Expanded Desc */}
                                    <div className="flex-1 flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
                                        <span className={`text-lg md:text-xl font-serif font-bold transition-colors duration-300 whitespace-nowrap ${tierColors[item.tier]} group-hover:text-[var(--color-secondary)]`}>
                                            {item.name}
                                        </span>
                                        {item.name === 'Courage' && (
                                            <span className="text-xs bg-amber-400/20 text-amber-400 px-3 py-1 rounded-full uppercase tracking-widest whitespace-nowrap self-start md:self-auto">
                                                Threshold
                                            </span>
                                        )}

                                        <AnimatePresence>
                                            {(hoveredLevel === item.name || item.name === 'Courage') && (
                                                <motion.span
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -10 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="text-sm text-[var(--color-text-muted)] italic inline-block md:ml-2 border-l-2 border-[var(--color-secondary)]/30 md:border-white/20 pl-3 py-1"
                                                >
                                                    {item.desc}
                                                </motion.span>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>



            {/* ═══════════════════════════════════════════
          4 · TESTIMONIALS CAROUSEL
      ═══════════════════════════════════════════ */}
            <section className="py-16">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-10"
                    >
                        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
                            Client <span className="text-[var(--color-secondary)]">Transformations</span>
                        </h2>
                        <p className="text-lg text-[var(--color-text-muted)]">Real stories. Real shifts.</p>
                    </motion.div>

                    <div
                        className="relative max-w-5xl mx-auto"
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                    >
                        {/* Desktop: 3 visible */}
                        <div className="hidden md:grid grid-cols-3 gap-6">
                            <AnimatePresence mode="popLayout">
                                {getVisibleReviews().map((review, i) => (
                                    <motion.div
                                        key={`${review.name}-${currentSlide}-${i}`}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.4, delay: i * 0.1 }}
                                        className="h-full"
                                    >
                                        <div className="glass rounded-2xl p-8 h-full flex flex-col border border-white/5 hover:border-[var(--color-secondary)]/20 transition-all duration-500">
                                            {/* Header: Avatar + Info */}
                                            <div className="flex items-center gap-4 mb-5">
                                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-secondary)] to-amber-700 flex items-center justify-center text-[var(--color-primary)] font-bold text-sm flex-shrink-0">
                                                    {review.initials}
                                                </div>
                                                <div>
                                                    <div className="font-serif font-bold text-base">{review.name}</div>
                                                    <div className="text-xs text-[var(--color-text-muted)]">{review.location}</div>
                                                </div>
                                            </div>

                                            {/* Stars */}
                                            <div className="flex gap-1 mb-4">
                                                {[...Array(review.stars)].map((_, s) => (
                                                    <Star key={s} size={14} className="text-[var(--color-secondary)] fill-[var(--color-secondary)]" />
                                                ))}
                                            </div>

                                            {/* Quote */}
                                            <p className="italic text-[var(--color-text-muted)] leading-relaxed text-sm flex-1">
                                                {review.text}
                                            </p>

                                            {/* Modality tag */}
                                            <div className="mt-5 pt-4 border-t border-white/5">
                                                <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-secondary)] bg-[var(--color-secondary)]/10 px-3 py-1.5 rounded-full font-bold">
                                                    {review.modality}
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Mobile: 1 visible */}
                        <div className="md:hidden">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentSlide}
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -50 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="glass rounded-2xl p-8 border border-white/5">
                                        {/* Header: Avatar + Info */}
                                        <div className="flex items-center gap-4 mb-5">
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-secondary)] to-amber-700 flex items-center justify-center text-[var(--color-primary)] font-bold text-sm flex-shrink-0">
                                                {reviews[currentSlide].initials}
                                            </div>
                                            <div>
                                                <div className="font-serif font-bold text-base">{reviews[currentSlide].name}</div>
                                                <div className="text-xs text-[var(--color-text-muted)]">{reviews[currentSlide].location}</div>
                                            </div>
                                        </div>

                                        {/* Stars */}
                                        <div className="flex gap-1 mb-4">
                                            {[...Array(reviews[currentSlide].stars)].map((_, s) => (
                                                <Star key={s} size={14} className="text-[var(--color-secondary)] fill-[var(--color-secondary)]" />
                                            ))}
                                        </div>

                                        {/* Quote */}
                                        <p className="italic text-[var(--color-text-muted)] leading-relaxed text-sm">
                                            {reviews[currentSlide].text}
                                        </p>

                                        {/* Modality tag */}
                                        <div className="mt-5 pt-4 border-t border-white/5">
                                            <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-secondary)] bg-[var(--color-secondary)]/10 px-3 py-1.5 rounded-full font-bold">
                                                {reviews[currentSlide].modality}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Navigation */}
                        <div className="flex justify-center items-center gap-4 mt-8">
                            <button
                                onClick={prevSlide}
                                className="w-10 h-10 rounded-full glass flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-secondary)] transition-colors"
                            >
                                <ChevronLeft size={18} />
                            </button>
                            <div className="flex gap-2">
                                {reviews.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentSlide(i)}
                                        className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentSlide
                                            ? 'bg-[var(--color-secondary)] w-6'
                                            : 'bg-white/20 hover:bg-white/40'
                                            }`}
                                    />
                                ))}
                            </div>
                            <button
                                onClick={nextSlide}
                                className="w-10 h-10 rounded-full glass flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-secondary)] transition-colors"
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════
           5 · INSTAGRAM FEED (Curated Gallery)
       ═══════════════════════════════════════════ */}
            <section className="py-16 overflow-hidden relative">
                {/* Background decorative glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[300px] bg-[var(--color-secondary)]/5 blur-[120px] rounded-full pointer-events-none" />

                <div className="container mx-auto px-6 mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center"
                    >
                        <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">
                            Follow the <span className="text-[var(--color-secondary)]">Journey</span>
                        </h2>
                    </motion.div>
                </div>

                {/* Scrolling Image Grid */}
                <div className="relative">
                    {/* Gradient Masks for smooth fade out at edges */}
                    <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 z-10 bg-gradient-to-r from-[var(--color-primary)] to-transparent" />
                    <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 z-10 bg-gradient-to-l from-[var(--color-primary)] to-transparent" />

                    <motion.div
                        animate={{ x: ['0%', '-50%'] }}
                        transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
                        className="flex gap-6 md:gap-8 px-4"
                        style={{ width: 'max-content' }}
                    >
                        {[
                            { img: tarotCard, type: 'Tarot Wisdom', caption: 'The cards mirror your soul.' },
                            { img: reikiImg, type: 'Reiki Healing', caption: 'Universal energy flows.' },
                            { img: akashicImg, type: 'Akashic Records', caption: 'Access your soul\'s blueprint.' },
                            { img: numerologyImg, type: 'Numerology', caption: 'Numbers vibrate with meaning.' },
                            { img: pendulumImg, type: 'Crystal Healing', caption: 'Earth\'s ancient wisdom.' },
                            { img: zodiacImg, type: 'Astrology', caption: 'Written in the stars.' },
                            { img: faceImg, type: 'Consciousness', caption: 'Expand your awareness.' },
                            { img: innerChildImg, type: 'Inner Child', caption: 'Heal the root.' },
                        ]
                            .concat([
                                { img: tarotCard, type: 'Tarot Wisdom', caption: 'The cards mirror your soul.' },
                                { img: reikiImg, type: 'Reiki Healing', caption: 'Universal energy flows.' },
                                { img: akashicImg, type: 'Akashic Records', caption: 'Access your soul\'s blueprint.' },
                                { img: numerologyImg, type: 'Numerology', caption: 'Numbers vibrate with meaning.' },
                                { img: pendulumImg, type: 'Crystal Healing', caption: 'Earth\'s ancient wisdom.' },
                                { img: zodiacImg, type: 'Astrology', caption: 'Written in the stars.' },
                                { img: faceImg, type: 'Consciousness', caption: 'Expand your awareness.' },
                                { img: innerChildImg, type: 'Inner Child', caption: 'Heal the root.' },
                            ])
                            .map((post, idx) => (
                                <div
                                    key={idx}
                                    className="group relative flex-shrink-0 w-64 h-80 md:w-72 md:h-96 rounded-2xl overflow-hidden cursor-pointer border border-white/5 hover:border-[var(--color-secondary)]/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] hover:-translate-y-2"
                                >
                                    <img
                                        src={post.img}
                                        alt={post.type}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[0.3] group-hover:grayscale-0"
                                    />

                                    {/* Gradient Overlay (Always visible at bottom) */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                                    {/* Default content (Bottom) */}
                                    <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                        <div className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-secondary)] mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-y-2 group-hover:translate-y-0">
                                            {post.type}
                                        </div>
                                        <div className="h-[1px] w-0 group-hover:w-full bg-[var(--color-secondary)] mb-3 transition-all duration-500" />
                                        <p className="text-white/80 text-xs font-serif italic opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                            "{post.caption}"
                                        </p>
                                    </div>

                                    {/* Center Icon Overlay */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-white border border-white/20 backdrop-blur-md">
                                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <rect x="2" y="2" width="20" height="20" rx="5" />
                                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </motion.div>
                </div>
            </section >

            {/* ═══════════════════════════════════════════
           6 · FAQ (Restored)
       ═══════════════════════════════════════════ */}
            < section className="py-16" >
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
                            Frequently Asked <span className="text-[var(--color-secondary)]">Questions</span>
                        </h2>
                    </motion.div>

                    <div className="max-w-3xl mx-auto space-y-4">
                        {[
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
                                q: 'Who does this work for?',
                                a: 'It works for anyone open to understanding themselves at a deeper level — entrepreneurs, professionals, creatives, parents, seekers. The common thread is a willingness to look inward.',
                            },
                            {
                                q: 'How do I begin?',
                                a: 'Simply book a session through our booking page. Choose a modality that resonates, select a time slot, and complete the payment. You\'ll receive a confirmation with all the details you need.',
                            },
                        ].map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className="glass rounded-2xl overflow-hidden border border-white/5 hover:border-[var(--color-secondary)]/10 transition-all"
                            >
                                <button
                                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                    className="w-full text-left px-8 py-6 flex justify-between items-center hover:bg-white/5 transition-colors gap-4"
                                >
                                    <span className="text-white/90 font-medium">{faq.q}</span>
                                    {openFaq === index
                                        ? <ChevronUp size={18} className="flex-shrink-0 text-[var(--color-secondary)]" />
                                        : <ChevronDown size={18} className="flex-shrink-0 text-[var(--color-secondary)]/40" />
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
                                            <div className="px-8 pb-6 text-[var(--color-text-muted)] border-t border-white/5 pt-5 text-sm leading-relaxed">
                                                {faq.a}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section >
        </div >
    );
};

export default Home;