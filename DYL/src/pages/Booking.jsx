import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import api from '../utils/api';
import { Check, Calendar, Upload, QrCode, Clock, Shield, Sparkles, Heart, Zap, X, Loader } from 'lucide-react';
import qrCodeImg from '../assets/qr.png';

const pricingData = [
    { service: 'Akashic Records Reading', original: '₹2,100', price: '₹499', duration: '30 mins' },
    { service: 'Crystal Healing', original: '₹1,500', price: '₹499', duration: '1 hour' },
    { service: 'Crystal, Switchwords & Frequency', original: '₹1,200', price: '₹499', duration: 'Per session' },
    { service: 'General Consultation', original: '₹800', price: '₹499', duration: '15 mins' },
    { service: 'Karmic + Ancestral Healing / Entity Cord Cutting', price: '₹16,000 Onwards', duration: 'Per session' },
    { service: 'Reiki Healing & Aura Cleansing', original: '₹1,800', price: '₹499', duration: 'Per session' },
    { service: 'Talk Therapy', original: '₹2,500', price: '₹499', duration: '1 hour' },
    { service: 'Tarot Reading', original: '₹1,500', price: '₹499', duration: '30 mins' },
    { service: 'Vedic Astrology', original: '₹2,100', price: '₹499', duration: '30 mins' },
    { service: 'Vedic Numerology', original: '₹2,100', price: '₹499', duration: '30 mins' },
];

const steps = ['Pay via QR', 'Upload Screenshot', 'Select Time'];

const CALENDLY_URL = 'https://calendly.com/decodeyourlife-12/1-hour-session';

const CalendlyEmbed = () => {
    const containerRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let attempts = 0;
        const interval = setInterval(() => {
            if (window.Calendly && containerRef.current) {
                clearInterval(interval);
                containerRef.current.innerHTML = '';
                try {
                    window.Calendly.initInlineWidget({
                        url: CALENDLY_URL + '?hide_gdpr_banner=1&background_color=1a1a2e&text_color=e0e0e0&primary_color=d4af37',
                        parentElement: containerRef.current,
                    });
                    setIsLoading(false);
                } catch (e) {
                    console.error("Calendly init error:", e);
                }
            }
            attempts++;
            if (attempts > 100) {
                clearInterval(interval);
                setIsLoading(false);
            }
        }, 100);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full h-[660px] bg-black/20">
            {isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-[var(--color-secondary)]">
                    <div className="w-12 h-12 border-4 border-[var(--color-secondary)]/30 border-t-[var(--color-secondary)] rounded-full animate-spin" />
                    <p className="text-sm uppercase tracking-widest animate-pulse">Loading Calendar...</p>
                </div>
            )}
            <div ref={containerRef} className="w-full h-full" />
        </div>
    );
};

/* ─── Step Label ─────────────────────────────────── */
const StepLabel = ({ index, currentStep, label }) => {
    const done = index < currentStep;
    const active = index === currentStep;
    return (
        <div className="flex flex-col items-center gap-2.5 z-10">
            <motion.div
                animate={{
                    scale: active ? 1.15 : 1,
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className={`relative w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500
          ${done ? 'bg-[var(--color-secondary)] text-[var(--color-primary)]' : ''}
          ${active ? 'bg-[var(--color-secondary)] text-[var(--color-primary)] shadow-[0_0_20px_rgba(228,154,6,0.55)]' : ''}
          ${!done && !active ? 'bg-white/5 text-white/25 border border-white/10' : ''}
        `}
            >
                {done ? <Check size={14} strokeWidth={3} /> : <span>{index + 1}</span>}
                {active && (
                    <span className="absolute inset-0 rounded-full animate-ping bg-[var(--color-secondary)]/30" />
                )}
            </motion.div>
            <span
                className={`text-[9px] tracking-[0.18em] uppercase font-bold transition-colors duration-300 whitespace-nowrap
          ${active ? 'text-[var(--color-secondary)]' : done ? 'text-[var(--color-secondary)]/60' : 'text-white/20'}
        `}
            >
                {label}
            </span>
        </div>
    );
};

const Booking = () => {
    const [searchParams] = useSearchParams();
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedService, setSelectedService] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const serviceParam = searchParams.get('service');
        if (serviceParam) {
            const foundService = pricingData.find(item => item.service.toLowerCase().includes(serviceParam.toLowerCase()) || item.service === serviceParam);
            if (foundService) setSelectedService(foundService);
        }
    }, [searchParams]);

    const [uploading, setUploading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [screenshotUrl, setScreenshotUrl] = useState('');
    const [uploadError, setUploadError] = useState('');
    const [userData, setUserData] = useState({ name: '', email: '', phone: '', transactionId: '' });
    const [calendlyBooked, setCalendlyBooked] = useState(false);

    useEffect(() => {
        const handleCalendlyEvent = (e) => {
            if (e.data.event && e.data.event === 'calendly.event_scheduled') setCalendlyBooked(true);
        };
        window.addEventListener('message', handleCalendlyEvent);
        return () => window.removeEventListener('message', handleCalendlyEvent);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploading(true);
        setUploadError('');
        const uploadData = new FormData();
        uploadData.append('image', file);
        try {
            const res = await api.post('/api/upload', uploadData, { headers: { 'Content-Type': 'multipart/form-data' } });
            setScreenshotUrl(res.data);
            // nextStep(); // Removed auto-navigation
        } catch (err) {
            console.error("Upload failed:", err);
            setUploadError("Click to retry upload. Please ensure file is an image under 5MB.");
        } finally {
            setUploading(false);
        }
    };

    const handleFinalSubmit = async () => {
        if (!userData.name || !userData.email || !userData.phone || !userData.transactionId) {
            alert("Please fill in all details.");
            return;
        }
        if (!calendlyBooked) {
            alert("Please book a slot on the calendar first.");
            return;
        }
        setSubmitting(true);
        const bookingData = { ...userData, service: selectedService.service, price: selectedService.price, duration: selectedService.duration, screenshotUrl };
        try {
            await api.post('/api/bookings', bookingData);
            setIsSuccess(true);
        } catch (err) {
            console.error("Booking error:", err);
            alert("Error submitting booking. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    const nextStep = () => {
        if (currentStep < steps.length - 1) setCurrentStep(prev => prev + 1);
        else handleFinalSubmit();
    };
    const prevStep = () => { if (currentStep > 0) setCurrentStep(prev => prev - 1); };

    // ── Modal close resets step
    const handleClose = () => {
        setSelectedService(null);
        setCurrentStep(0);
    };

    return (
        <div className="min-h-screen bg-[var(--color-primary)] pt-40 pb-20 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--color-secondary)]/5 blur-[120px] rounded-full -z-0" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[var(--color-secondary)]/10 blur-[100px] rounded-full -z-0" />

            {/* Floating particles background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-[var(--color-secondary)] rounded-full opacity-20"
                        style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                        animate={{
                            x: [0, (mousePosition.x / 100) * (i % 2 ? 1 : -1)],
                            y: [0, (mousePosition.y / 100) * (i % 2 ? -1 : 1)],
                            scale: [1, 1.5, 1],
                            opacity: [0.2, 0.5, 0.2],
                        }}
                        transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                ))}
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Header Section */}
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-light font-serif text-[var(--color-secondary)] mb-8 tracking-tight leading-[1.1]">
                        Book Your Session
                    </h1>
                    <div className="w-24 h-px bg-gradient-to-r from-transparent via-[var(--color-secondary)] to-transparent mx-auto mb-8" />
                    <p className="text-xl text-[var(--color-text-muted)] max-w-2xl mx-auto font-light leading-relaxed mb-12">
                        Each session is a dedicated journey into your subconscious patterns, designed for clarity and transformation.
                    </p>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }} className="flex flex-wrap justify-center items-center gap-6 text-sm text-[var(--color-text-muted)]/70">
                        <div className="flex items-center gap-2"><Shield size={16} className="text-[var(--color-secondary)]" /><span>100% Confidential</span></div>
                        <div className="w-px h-4 bg-white/10" />
                        <div className="flex items-center gap-2"><Heart size={16} className="text-[var(--color-secondary)]" /><span>Safe Space</span></div>
                        <div className="w-px h-4 bg-white/10" />
                        <div className="flex items-center gap-2"><Zap size={16} className="text-[var(--color-secondary)]" /><span>Instant Confirmation</span></div>
                    </motion.div>

                    {/* Launch Offer Banner */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="mt-12 max-w-2xl mx-auto px-6 py-4 rounded-2xl bg-gradient-to-r from-[var(--color-secondary)]/20 to-[var(--color-secondary)]/5 border border-[var(--color-secondary)]/30 backdrop-blur-md relative overflow-hidden group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        <p className="text-[var(--color-secondary)] font-bold tracking-widest uppercase text-xs mb-1 flex items-center justify-center gap-2">
                            <Sparkles size={14} className="animate-pulse" /> Website Launch Offer <Sparkles size={14} className="animate-pulse" />
                        </p>
                        <h3 className="text-xl md:text-2xl font-serif font-bold text-white">
                            Flat <span className="text-[var(--color-secondary)]">₹499</span> for the first 50 seekers
                        </h3>
                    </motion.div>
                </motion.div>

                {/* ── Pricing Table ── */}
                <section className="max-w-4xl mx-auto mb-24">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass rounded-3xl overflow-hidden border border-white/5 shadow-2xl shadow-black/20">
                        <div className="hidden md:grid grid-cols-[2fr_1fr_1fr] px-8 py-6 border-b border-white/10 text-xs uppercase tracking-widest text-[var(--color-secondary)] bg-black/20 font-bold">
                            <span>Service</span>
                            <span>Duration</span>
                            <span className="text-right">Fee</span>
                        </div>
                        <div className="divide-y divide-white/5">
                            {pricingData.map((item, i) => (
                                <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} onClick={() => setSelectedService(item)}
                                    className={`relative flex flex-col md:grid md:grid-cols-[2fr_1fr_1fr] gap-4 md:gap-0 px-6 md:px-8 py-6 cursor-pointer group transition-all duration-300 ${selectedService?.service === item.service ? 'bg-[var(--color-secondary)]/10' : 'hover:bg-white/5'}`}
                                >
                                    <div className={`absolute left-0 top-0 bottom-0 w-1 bg-[var(--color-secondary)] transition-transform duration-300 ${selectedService?.service === item.service ? 'scale-y-100' : 'scale-y-0'}`} />
                                    <span className={`font-medium transition-colors text-lg ${selectedService?.service === item.service ? 'text-[var(--color-secondary)] font-bold' : 'text-white group-hover:text-[var(--color-secondary)]'}`}>{item.service}</span>
                                    <div className="flex md:contents justify-between items-center mt-2 md:mt-0">
                                        <span className="text-[var(--color-text-muted)] flex items-center gap-2 text-sm md:text-base"><Clock size={16} className="text-[var(--color-secondary)]/50" /> {item.duration}</span>
                                        <div className="text-right flex flex-col items-end">
                                            {item.original && (
                                                <span className="text-[var(--color-text-muted)] line-through text-xs mb-0.5 opacity-50">{item.original}</span>
                                            )}
                                            <span className="font-sans font-bold text-xl text-[var(--color-secondary)]">{item.price}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                    <p className="text-center text-[var(--color-text-muted)] text-sm mt-6 flex items-center justify-center gap-2">
                        <span className="animate-pulse">👆</span> Proceed with the booking confirmation
                    </p>
                </section>

                {/* ── Success ── */}
                <AnimatePresence>
                    {isSuccess && (
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-xl mx-auto text-center glass p-16 rounded-[2.5rem] border border-[var(--color-secondary)]/30 shadow-[0_0_50px_rgba(212,175,55,0.1)] mt-20">
                            <div className="w-24 h-24 rounded-full bg-[var(--color-secondary)] text-[var(--color-primary)] flex items-center justify-center mx-auto mb-10 shadow-xl"><Check size={48} /></div>
                            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Booking Confirmed!</h2>
                            <p className="text-[var(--color-text-muted)] mb-10 text-lg leading-relaxed">Thank you for choosing <strong className="text-[var(--color-secondary)]">Decode Your Life</strong>.<br />Your payment proof is under review. You will receive a confirmation shortly.</p>
                            <Link to="/"><motion.button whileHover={{ scale: 1.05 }} className="px-10 py-4 rounded-xl glass border border-[var(--color-secondary)]/30 text-[var(--color-secondary)] hover:bg-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-all duration-300 font-bold uppercase tracking-widest text-sm">Return Home</motion.button></Link>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* ══════════════════════════════════════════════
                  REDESIGNED BOOKING MODAL
            ══════════════════════════════════════════════ */}
            {createPortal(
                <AnimatePresence mode="wait">
                    {selectedService && !isSuccess && (
                        <>
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.35 }}
                                className="fixed inset-0 z-[9998]"
                                style={{
                                    background: 'radial-gradient(ellipse at 60% 20%, rgba(228,154,6,0.07) 0%, transparent 60%), rgba(2,44,34,0.92)',
                                    backdropFilter: 'blur(16px)',
                                }}
                                onClick={handleClose}
                            />

                            {/* Modal Shell */}
                            <div className="fixed inset-0 z-[9999] overflow-y-auto flex items-center justify-center p-4 md:p-8">
                                <motion.div
                                    initial={{ opacity: 0, y: 40, scale: 0.97 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 30, scale: 0.97 }}
                                    transition={{ type: 'spring', stiffness: 280, damping: 32 }}
                                    onClick={(e) => e.stopPropagation()}
                                    className="relative w-full max-w-5xl my-8 flex flex-col"
                                    style={{
                                        background: 'linear-gradient(145deg, rgba(2,44,34,0.98) 0%, rgba(1,28,21,0.99) 100%)',
                                        borderRadius: '2.5rem',
                                        border: '1px solid rgba(228,154,6,0.18)',
                                        boxShadow: '0 0 0 1px rgba(255,255,255,0.04) inset, 0 40px 120px rgba(0,0,0,0.7), 0 0 80px rgba(228,154,6,0.07)',
                                    }}
                                >
                                    {/* ── Top accent bar ── */}
                                    <div
                                        className="absolute top-0 left-0 right-0 h-px rounded-t-[2.5rem]"
                                        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(228,154,6,0.7) 40%, rgba(228,154,6,1) 50%, rgba(228,154,6,0.7) 60%, transparent 100%)' }}
                                    />

                                    {/* ── Ambient glow ── */}
                                    <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 rounded-full pointer-events-none"
                                        style={{ background: 'radial-gradient(ellipse, rgba(228,154,6,0.12) 0%, transparent 70%)', filter: 'blur(20px)' }} />

                                    {/* ── Close button ── */}
                                    <motion.button
                                        whileHover={{ scale: 1.1, rotate: 90 }}
                                        whileTap={{ scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                        onClick={handleClose}
                                        className="absolute top-5 right-5 md:top-7 md:right-7 z-[60] w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 group"
                                        style={{
                                            background: 'rgba(255,255,255,0.04)',
                                            border: '1px solid rgba(255,255,255,0.08)',
                                        }}
                                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(228,154,6,0.15)'}
                                        onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
                                    >
                                        <X size={18} className="text-white/40 group-hover:text-[var(--color-secondary)] transition-colors duration-200" />
                                    </motion.button>

                                    {/* ── Scrollable content ── */}
                                    <div className="flex-1 p-6 md:p-12 pb-36 overflow-y-auto">

                                        {/* Service Badge + Title */}
                                        <div className="text-center mb-10">
                                            <motion.div
                                                initial={{ opacity: 0, y: -8 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.1 }}
                                                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 text-[10px] font-bold uppercase tracking-[0.2em]"
                                                style={{
                                                    background: 'rgba(228,154,6,0.08)',
                                                    border: '1px solid rgba(228,154,6,0.22)',
                                                    color: 'var(--color-secondary)',
                                                }}
                                            >
                                                <Sparkles size={10} />
                                                Selected Session
                                                <Sparkles size={10} />
                                            </motion.div>

                                            <motion.h2
                                                initial={{ opacity: 0, y: 8 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.15 }}
                                                className="text-3xl md:text-5xl font-serif font-bold mb-5 text-[var(--color-cream)] leading-tight"
                                            >
                                                {selectedService.service}
                                            </motion.h2>

                                            {/* Service meta pills */}
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.2 }}
                                                className="flex items-center justify-center gap-3 flex-wrap"
                                            >
                                                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium"
                                                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)' }}>
                                                    <Clock size={13} className="text-[var(--color-secondary)]" />
                                                    {selectedService.duration}
                                                </span>
                                                <span className="w-1 h-1 rounded-full bg-[var(--color-secondary)]/40" />
                                                <div className="flex items-center gap-2 px-3 py-1 rounded-full"
                                                    style={{ background: 'rgba(228,154,6,0.1)', border: '1px solid rgba(228,154,6,0.2)' }}>
                                                    {selectedService.original && (
                                                        <span className="text-[var(--color-text-muted)] line-through text-xs opacity-50">{selectedService.original}</span>
                                                    )}
                                                    <span className="text-sm font-bold text-[var(--color-secondary)]">
                                                        {selectedService.price}
                                                    </span>
                                                </div>
                                            </motion.div>
                                        </div>

                                        {/* ── Step Progress ── */}
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.25 }}
                                            className="relative flex justify-between items-start max-w-sm mx-auto mb-10 px-2"
                                        >
                                            {/* Track line */}
                                            <div className="absolute top-4 left-6 right-6 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
                                            {/* Filled track */}
                                            <motion.div
                                                className="absolute top-4 left-6 h-px origin-left"
                                                style={{ background: 'linear-gradient(90deg, var(--color-secondary), rgba(228,154,6,0.5))' }}
                                                animate={{ width: `${(currentStep / (steps.length - 1)) * (100 - 16)}%` }}
                                                transition={{ duration: 0.5, ease: 'easeInOut' }}
                                            />
                                            {steps.map((step, index) => (
                                                <StepLabel key={index} index={index} currentStep={currentStep} label={step} />
                                            ))}
                                        </motion.div>

                                        {/* ── Step Content ── */}
                                        <div className="rounded-2xl md:rounded-3xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                                            <AnimatePresence mode="wait">

                                                {/* STEP 1: QR */}
                                                {currentStep === 0 && (
                                                    <motion.div key="s1" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.3 }} className="p-8 md:p-12">
                                                        <div className="flex flex-col md:flex-row items-center justify-center gap-12">
                                                            {/* QR with frame */}
                                                            <div className="relative shrink-0">
                                                                <div className="w-56 h-56 bg-white p-3 rounded-2xl shadow-2xl relative z-10">
                                                                    <img src={qrCodeImg} alt="Payment QR Code" className="w-full h-full object-cover rounded-xl" />
                                                                </div>
                                                                {/* Corner accents */}
                                                                {[['top-0 left-0', 'border-t-2 border-l-2 rounded-tl-2xl'], ['top-0 right-0', 'border-t-2 border-r-2 rounded-tr-2xl'], ['bottom-0 left-0', 'border-b-2 border-l-2 rounded-bl-2xl'], ['bottom-0 right-0', 'border-b-2 border-r-2 rounded-br-2xl']].map(([pos, cls], i) => (
                                                                    <div key={i} className={`absolute ${pos} w-6 h-6 border-[var(--color-secondary)] ${cls} -m-1 z-20`} />
                                                                ))}
                                                                <div className="absolute inset-0 rounded-2xl blur-2xl opacity-30 -z-10" style={{ background: 'radial-gradient(circle, rgba(228,154,6,0.5) 0%, transparent 70%)' }} />
                                                            </div>

                                                            {/* Payment info */}
                                                            <div className="flex-1 w-full max-w-xs">
                                                                <h3 className="text-2xl font-serif font-bold mb-2 text-white">Scan & Pay</h3>
                                                                <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.45)' }}>
                                                                    Transfer <span className="text-white font-semibold">{selectedService.price}</span> to complete your booking.
                                                                </p>

                                                                <div className="space-y-3">
                                                                    {[
                                                                        { label: 'Pay To', value: 'Aashna Ahuja' },
                                                                        { label: 'UPI ID', value: 'ashvinay-1@okhdfcbank', selectable: true },
                                                                        { label: 'Bank', value: 'HDFC Bank' },
                                                                    ].map(({ label, value, selectable }) => (
                                                                        <div key={label} className="flex items-center justify-between px-4 py-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                                                                            <span className="text-[10px] uppercase tracking-widest font-bold" style={{ color: 'rgba(255,255,255,0.3)' }}>{label}</span>
                                                                            <span className={`font-medium text-sm text-white ${selectable ? 'select-all font-mono' : 'font-serif'}`}>{value}</span>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                )}

                                                {/* STEP 2: Upload + Details */}
                                                {currentStep === 1 && (
                                                    <motion.div key="s2" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.3 }} className="p-8 md:p-12">
                                                        <h3 className="text-2xl font-serif font-bold text-white text-center mb-2">Payment & Details</h3>
                                                        <p className="text-center text-sm mb-8" style={{ color: 'rgba(255,255,255,0.4)' }}>Upload your payment proof and fill in your contact info.</p>

                                                        <div className="grid md:grid-cols-2 gap-6">
                                                            {/* Upload + Tx */}
                                                            <div className="rounded-2xl p-6 space-y-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                                                                <h4 className="text-base font-serif font-bold text-white">Payment Proof</h4>

                                                                <label className="relative flex flex-col items-center justify-center w-full h-44 rounded-xl cursor-pointer transition-all duration-300 overflow-hidden group"
                                                                    style={{
                                                                        background: screenshotUrl ? 'rgba(228,154,6,0.07)' : 'rgba(228,154,6,0.03)',
                                                                        border: `2px dashed ${screenshotUrl ? 'rgba(228,154,6,0.5)' : 'rgba(228,154,6,0.18)'}`,
                                                                    }}
                                                                    onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(228,154,6,0.4)'}
                                                                    onMouseLeave={e => e.currentTarget.style.borderColor = screenshotUrl ? 'rgba(228,154,6,0.5)' : 'rgba(228,154,6,0.18)'}
                                                                >
                                                                    <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} disabled={uploading} />
                                                                    {uploading ? (
                                                                        <div className="flex flex-col items-center gap-3">
                                                                            <Loader className="animate-spin text-[var(--color-secondary)]" size={28} />
                                                                            <p className="text-[var(--color-secondary)] text-[10px] uppercase tracking-[0.2em] font-bold animate-pulse">Uploading...</p>
                                                                        </div>
                                                                    ) : (
                                                                        <div className="flex flex-col items-center gap-2 text-center px-4">
                                                                            <div className="w-10 h-10 rounded-full flex items-center justify-center mb-1 transition-transform duration-300 group-hover:scale-110"
                                                                                style={{ background: 'rgba(228,154,6,0.1)' }}>
                                                                                {screenshotUrl ? <Check size={18} className="text-[var(--color-secondary)]" /> : <Upload size={18} className="text-[var(--color-secondary)]" />}
                                                                            </div>
                                                                            <p className="text-sm font-medium text-white">{screenshotUrl ? 'Receipt Uploaded ✓' : 'Upload Receipt'}</p>
                                                                            <p className="text-[10px] uppercase tracking-widest font-bold" style={{ color: 'rgba(255,255,255,0.3)' }}>
                                                                                {screenshotUrl ? 'Click to change' : 'JPG · PNG · PDF — max 5MB'}
                                                                            </p>
                                                                            {uploadError && <p className="text-red-400 text-[10px] mt-1 font-bold uppercase tracking-widest">{uploadError}</p>}
                                                                        </div>
                                                                    )}
                                                                </label>

                                                                <div className="space-y-1.5">
                                                                    <label className="block text-[10px] uppercase tracking-widest font-bold ml-1" style={{ color: 'rgba(255,255,255,0.35)' }}>Transaction ID *</label>
                                                                    <input
                                                                        type="text"
                                                                        value={userData.transactionId}
                                                                        onChange={(e) => setUserData({ ...userData, transactionId: e.target.value })}
                                                                        placeholder="e.g. UPI Ref No."
                                                                        className="w-full px-4 py-3 rounded-xl text-white text-sm transition-all outline-none focus:ring-1 focus:ring-[var(--color-secondary)]/40"
                                                                        style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.08)' }}
                                                                        onFocus={e => e.target.style.border = '1px solid rgba(228,154,6,0.35)'}
                                                                        onBlur={e => e.target.style.border = '1px solid rgba(255,255,255,0.08)'}
                                                                    />
                                                                </div>
                                                            </div>

                                                            {/* Contact details */}
                                                            <div className="rounded-2xl p-6 space-y-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                                                                <h4 className="text-base font-serif font-bold text-white">Your Information</h4>
                                                                {[
                                                                    { label: 'Full Name', key: 'name', type: 'text', placeholder: 'Your Name' },
                                                                    { label: 'Email Address', key: 'email', type: 'email', placeholder: 'email@example.com' },
                                                                    { label: 'Phone Number', key: 'phone', type: 'tel', placeholder: '+91 98765 43210' },
                                                                ].map(({ label, key, type, placeholder }) => (
                                                                    <div key={key} className="space-y-1.5">
                                                                        <label className="block text-[10px] uppercase tracking-widest font-bold ml-1" style={{ color: 'rgba(255,255,255,0.35)' }}>{label} *</label>
                                                                        <input
                                                                            type={type}
                                                                            value={userData[key]}
                                                                            onChange={(e) => setUserData({ ...userData, [key]: e.target.value })}
                                                                            placeholder={placeholder}
                                                                            className="w-full px-4 py-3 rounded-xl text-white text-sm transition-all outline-none"
                                                                            style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.08)' }}
                                                                            onFocus={e => e.target.style.border = '1px solid rgba(228,154,6,0.35)'}
                                                                            onBlur={e => e.target.style.border = '1px solid rgba(255,255,255,0.08)'}
                                                                        />
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                )}

                                                {/* STEP 3: Calendly */}
                                                {currentStep === 2 && (
                                                    <motion.div key="s3" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.3 }} className="p-8 md:p-12">
                                                        <h3 className="text-2xl font-serif font-bold text-white text-center mb-2">Select a Time</h3>

                                                        {/* Status banner */}
                                                        <div className="max-w-md mx-auto mb-6">
                                                            <motion.div
                                                                animate={{
                                                                    background: calendlyBooked ? 'rgba(52,211,153,0.08)' : 'rgba(228,154,6,0.06)',
                                                                    borderColor: calendlyBooked ? 'rgba(52,211,153,0.3)' : 'rgba(228,154,6,0.2)',
                                                                }}
                                                                className="flex items-center justify-center gap-3 px-5 py-3 rounded-xl border transition-all duration-500"
                                                            >
                                                                <motion.div
                                                                    animate={{ scale: calendlyBooked ? [1, 1.3, 1] : 1 }}
                                                                    transition={{ duration: 0.4 }}
                                                                    className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${calendlyBooked ? 'bg-emerald-400 text-black' : 'bg-[var(--color-secondary)]/20'}`}
                                                                >
                                                                    {calendlyBooked ? <Check size={11} strokeWidth={3} /> : <div className="w-2 h-2 rounded-full bg-[var(--color-secondary)] animate-pulse" />}
                                                                </motion.div>
                                                                <p className={`text-sm font-medium ${calendlyBooked ? 'text-emerald-300' : 'text-white/60'}`}>
                                                                    {calendlyBooked ? 'Time slot confirmed — you\'re all set!' : 'Pick a slot from the calendar below'}
                                                                </p>
                                                            </motion.div>
                                                        </div>

                                                        <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.06)', minHeight: '600px' }}>
                                                            <CalendlyEmbed />
                                                        </div>
                                                    </motion.div>
                                                )}

                                            </AnimatePresence>
                                        </div>
                                    </div>

                                    {/* ── Sticky footer nav ── */}
                                    <div
                                        className="absolute bottom-0 left-0 right-0 rounded-b-[2.5rem] px-6 md:px-10 py-5 flex justify-between items-center z-50"
                                        style={{
                                            background: 'linear-gradient(0deg, rgba(2,44,34,1) 60%, rgba(2,44,34,0) 100%)',
                                            borderTop: '1px solid rgba(255,255,255,0.05)',
                                        }}
                                    >
                                        {/* Back */}
                                        <motion.button
                                            whileHover={{ x: -2 }}
                                            onClick={prevStep}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors duration-200 ${currentStep === 0 ? 'invisible pointer-events-none' : ''}`}
                                            style={{ color: 'rgba(255,255,255,0.35)' }}
                                            onMouseEnter={e => e.currentTarget.style.color = 'var(--color-secondary)'}
                                            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}
                                        >
                                            ← Back
                                        </motion.button>

                                        {/* Dot indicators */}
                                        <div className="flex gap-2 items-center">
                                            {[0, 1, 2].map(i => (
                                                <motion.div
                                                    key={i}
                                                    animate={{
                                                        width: i === currentStep ? 20 : 6,
                                                        background: i === currentStep ? 'var(--color-secondary)' : 'rgba(255,255,255,0.12)',
                                                    }}
                                                    className="h-1.5 rounded-full"
                                                    transition={{ duration: 0.3 }}
                                                />
                                            ))}
                                        </div>

                                        {/* Next / Confirm */}
                                        <motion.button
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.97 }}
                                            onClick={nextStep}
                                            disabled={submitting || (currentStep === 1 && (!screenshotUrl || !userData.transactionId || !userData.name || !userData.email || !userData.phone))}
                                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-200 disabled:opacity-30 disabled:pointer-events-none"
                                            style={{
                                                background: 'rgba(212,175,55,0.1)',
                                                border: '1px solid rgba(212,175,55,0.25)',
                                                color: 'var(--color-secondary)',
                                            }}
                                            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(212,175,55,0.18)'; e.currentTarget.style.borderColor = 'rgba(212,175,55,0.45)'; }}
                                            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(212,175,55,0.1)'; e.currentTarget.style.borderColor = 'rgba(212,175,55,0.25)'; }}
                                        >
                                            {submitting ? (
                                                <Loader className="animate-spin" size={14} />
                                            ) : (
                                                <>{currentStep === steps.length - 1 ? 'Confirm & Notify' : 'Next Step'} →</>
                                            )}
                                        </motion.button>
                                    </div>
                                </motion.div>
                            </div>
                        </>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </div>
    );
};

export default Booking;