import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import api from '../utils/api';
import { Check, Calendar, Upload, QrCode, Clock, Shield, Sparkles, Heart, Zap, X, Loader } from 'lucide-react';
import qrCodeImg from '../assets/qr.png';

const pricingData = [
    { service: 'Tarot Reading', price: '₹1,500', duration: '30 mins' },
    { service: 'Vedic Astrology', price: '₹2,000', duration: '30 mins' },
    { service: 'Vedic Numerology', price: '₹1,500', duration: '30 mins' },
    { service: 'Akashic Records Reading', price: '₹4,000', duration: '30 mins' },
    { service: 'Reiki Healing & Aura Cleansing', price: '₹2,000', duration: 'Per session' },
    { service: 'General Consultation', price: '₹300', duration: '15 mins' },
    { service: 'General Counseling', price: '₹1,000/hr (Block) / ₹2,000 (Single)', duration: '1 hour' },
    { service: 'Crystal Healing', price: '₹1,500', duration: '1 hour' },
    { service: 'Crystal, Switchwords & Frequency', price: '₹1,200', duration: 'Per session' },
    { service: 'Karmic + Ancestral Healing / Entity Cord Cutting', price: 'From ₹16,000', duration: 'Per session' },
];

const steps = ['Pay via QR', 'Upload Screenshot', 'Select Time'];

const CALENDLY_URL = 'https://calendly.com/ajaypanaskar8/30min';

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
            if (attempts > 100) { // 10 seconds timeout
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
            <div
                ref={containerRef}
                className="w-full h-full"
            />
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
            if (foundService) {
                setSelectedService(foundService);
            }
        }
    }, [searchParams]);

    // Form and Loading States

    const [uploading, setUploading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [screenshotUrl, setScreenshotUrl] = useState('');
    const [uploadError, setUploadError] = useState('');

    // New State for Data Collection
    const [userData, setUserData] = useState({ name: '', email: '', phone: '', transactionId: '' });
    const [calendlyBooked, setCalendlyBooked] = useState(false);

    // Calendly Event Listener
    useEffect(() => {
        const handleCalendlyEvent = (e) => {
            if (e.data.event && e.data.event === 'calendly.event_scheduled') {
                setCalendlyBooked(true);
            }
        };
        window.addEventListener('message', handleCalendlyEvent);
        return () => window.removeEventListener('message', handleCalendlyEvent);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
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
            const res = await api.post('/api/upload', uploadData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setScreenshotUrl(res.data);
            nextStep();
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
        const bookingData = {
            ...userData,
            service: selectedService.service,
            price: selectedService.price,
            duration: selectedService.duration,
            screenshotUrl
        };

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

    return (
        <div className="min-h-screen bg-[var(--color-primary)] pt-32 pb-20 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--color-secondary)]/5 blur-[120px] rounded-full -z-0" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[var(--color-secondary)]/10 blur-[100px] rounded-full -z-0" />

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
                            opacity: [0.2, 0.5, 0.2],
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-light font-serif text-[var(--color-secondary)] mb-8 tracking-tight leading-[1.1]">
                        Book Your Session
                    </h1>

                    <div className="w-24 h-px bg-gradient-to-r from-transparent via-[var(--color-secondary)] to-transparent mx-auto mb-8" />

                    <p className="text-xl text-[var(--color-text-muted)] max-w-2xl mx-auto font-light leading-relaxed mb-12">
                        Each session is a dedicated journey into your subconscious patterns, designed for clarity and transformation.
                    </p>

                    {/* Trust indicators */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="flex flex-wrap justify-center items-center gap-6 text-sm text-[var(--color-text-muted)]/70"
                    >
                        <div className="flex items-center gap-2">
                            <Shield size={16} className="text-[var(--color-secondary)]" />
                            <span>100% Confidential</span>
                        </div>
                        <div className="w-px h-4 bg-white/10" />
                        <div className="flex items-center gap-2">
                            <Heart size={16} className="text-[var(--color-secondary)]" />
                            <span>Safe Space</span>
                        </div>
                        <div className="w-px h-4 bg-white/10" />
                        <div className="flex items-center gap-2">
                            <Zap size={16} className="text-[var(--color-secondary)]" />
                            <span>Instant Confirmation</span>
                        </div>
                    </motion.div>
                </motion.div>

                {/* ── Pricing Table ── */}
                <section className="max-w-4xl mx-auto mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="glass rounded-3xl overflow-hidden border border-white/5 shadow-2xl shadow-black/20"
                    >
                        <div className="grid grid-cols-[2fr_1fr_1fr] px-8 py-6 border-b border-white/10 text-xs uppercase tracking-widest text-[var(--color-secondary)] bg-black/20 font-bold">
                            <span>Service</span>
                            <span>Duration</span>
                            <span className="text-right">Fee</span>
                        </div>

                        {/* Data Rows */}
                        <div className="divide-y divide-white/5">
                            {pricingData.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.05 }}
                                    onClick={() => setSelectedService(item)}
                                    className={`relative grid grid-cols-[2fr_1fr_1fr] px-8 py-6 cursor-pointer group transition-all duration-300 ${selectedService?.service === item.service
                                        ? 'bg-[var(--color-secondary)]/10'
                                        : 'hover:bg-white/5'
                                        }`}
                                >
                                    {/* Active Indicator Line */}
                                    <div className={`absolute left-0 top-0 bottom-0 w-1 bg-[var(--color-secondary)] transition-transform duration-300 ${selectedService?.service === item.service ? 'scale-y-100' : 'scale-y-0'}`} />

                                    <span className={`font-medium transition-colors text-lg ${selectedService?.service === item.service ? 'text-[var(--color-secondary)] font-bold' : 'text-white group-hover:text-[var(--color-secondary)]'}`}>
                                        {item.service}
                                    </span>
                                    <span className="text-[var(--color-text-muted)] flex items-center gap-2">
                                        <Clock size={16} className="text-[var(--color-secondary)]/50" /> {item.duration}
                                    </span>
                                    <span className="text-right font-sans font-bold text-xl text-[var(--color-secondary)]">{item.price}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <p className="text-center text-[var(--color-text-muted)] text-sm mt-6 flex items-center justify-center gap-2">
                        <span className="animate-pulse">👆</span> Select a service above to proceed with booking
                    </p>
                </section>

                {/* ── Success ── */}
                <AnimatePresence>
                    {isSuccess && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="max-w-xl mx-auto text-center glass p-16 rounded-[2.5rem] border border-[var(--color-secondary)]/30 shadow-[0_0_50px_rgba(212,175,55,0.1)] mt-20"
                        >
                            <div className="w-24 h-24 rounded-full bg-[var(--color-secondary)] text-[var(--color-primary)] flex items-center justify-center mx-auto mb-10 shadow-xl">
                                <Check size={48} />
                            </div>
                            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Booking Confirmed!</h2>
                            <p className="text-[var(--color-text-muted)] mb-10 text-lg leading-relaxed">
                                Thank you for choosing <strong className="text-[var(--color-secondary)]">Decode Your Life</strong>.<br />
                                Your payment proof is under review. You will receive a confirmation shortly.
                            </p>
                            <Link to="/">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    className="px-10 py-4 rounded-xl glass border border-[var(--color-secondary)]/30 text-[var(--color-secondary)] hover:bg-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-all duration-300 font-bold uppercase tracking-widest text-sm"
                                >
                                    Return Home
                                </motion.button>
                            </Link>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* ── Booking Modal (Sticky Footer Layout) ── */}
            {createPortal(
                <AnimatePresence mode="wait">
                    {selectedService && !isSuccess && (
                        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-[var(--color-primary)]/95" onClick={() => setSelectedService(null)}>
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                                onClick={(e) => e.stopPropagation()}
                                className="bg-[var(--color-primary)] w-full max-w-5xl h-[85vh] rounded-[3rem] border border-[var(--color-secondary)]/30 shadow-[0_0_100px_rgba(212,175,55,0.1)] relative overflow-hidden flex flex-col"
                                style={{ WebkitOverflowScrolling: 'touch' }}
                            >
                                {/* Decorative Elements */}
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--color-secondary)] to-transparent opacity-80 z-20" />
                                <div className="absolute -top-40 -right-40 w-96 h-96 bg-[var(--color-secondary)]/5 rounded-full blur-[100px] pointer-events-none" />

                                {/* Close Button */}
                                <button
                                    onClick={() => setSelectedService(null)}
                                    className="absolute top-6 right-6 p-3 rounded-full bg-white/5 hover:bg-[var(--color-secondary)] hover:text-[var(--color-primary)] text-white/50 transition-all duration-300 z-[60] group border border-white/5"
                                >
                                    <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
                                </button>

                                {/* Scrollable Content Area */}
                                <div className="flex-1 overflow-y-auto p-8 md:p-12 pb-32 scrollbar-thin scrollbar-thumb-[var(--color-secondary)]/20 scrollbar-track-transparent">
                                    <div className="text-center mb-10">
                                        <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-[var(--color-secondary)]/30 bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] text-[10px] tracking-[0.2em] font-bold uppercase mb-4">
                                            Selected Session
                                        </div>
                                        <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4 text-[var(--color-cream)]">
                                            {selectedService.service}
                                        </h2>
                                        <div className="flex items-center justify-center gap-6 text-[var(--color-text-muted)] font-serif text-lg italic">
                                            <span className="flex items-center gap-2">
                                                <Clock size={16} className="text-[var(--color-secondary)]" /> {selectedService.duration}
                                            </span>
                                            <span className="w-1 h-1 rounded-full bg-[var(--color-secondary)]" />
                                            <span className="flex items-center gap-2">
                                                <span className="text-[var(--color-secondary)]">₹</span> {selectedService.price}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Progress */}
                                    <div className="flex justify-between items-center mb-12 relative max-w-xl mx-auto px-4">
                                        <div className="absolute top-1/2 left-4 right-4 h-px bg-white/10 -translate-y-1/2 -z-10" />
                                        {steps.map((step, index) => (
                                            <div key={index} className="flex flex-col items-center gap-3 z-10 bg-[var(--color-primary)]">
                                                <motion.div
                                                    animate={{
                                                        scale: index === currentStep ? 1.1 : 1,
                                                        borderColor: index <= currentStep ? 'var(--color-secondary)' : 'rgba(255, 255, 255, 0.1)',
                                                        backgroundColor: index <= currentStep ? 'var(--color-secondary)' : 'var(--color-primary)',
                                                        color: index <= currentStep ? 'var(--color-primary)' : 'rgba(255, 255, 255, 0.3)'
                                                    }}
                                                    className="w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-500"
                                                >
                                                    {index < currentStep ? <Check size={16} /> : <span className="text-sm font-bold">{index + 1}</span>}
                                                </motion.div>
                                                <span className={`text-[10px] tracking-[0.2em] uppercase font-bold transition-colors duration-300 ${index <= currentStep ? 'text-[var(--color-secondary)]' : 'text-white/20'
                                                    }`}>{step}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Step Content Card */}
                                    <div className="bg-white/[0.02] p-8 md:p-12 rounded-[2rem] min-h-[400px] border border-white/5 relative flex flex-col justify-center">

                                        <AnimatePresence mode="wait">
                                            {/* Step 1: QR Code */}
                                            {currentStep === 0 && (
                                                <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="relative z-10">
                                                    <div className="flex flex-col md:flex-row items-center justify-center gap-12">
                                                        <div className="w-64 h-64 bg-white p-3 rounded-2xl shadow-2xl relative group shrink-0">
                                                            <div className="absolute inset-0 bg-[var(--color-secondary)]/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                                            <img src={qrCodeImg} alt="Payment QR Code" className="w-full h-full object-cover rounded-xl relative z-10" />
                                                        </div>

                                                        <div className="text-center md:text-left flex-1">
                                                            <h3 className="text-2xl font-serif mb-4 text-[var(--color-secondary)]">Scan & Pay</h3>
                                                            <p className="text-[var(--color-text-muted)] mb-6 max-w-xs mx-auto md:mx-0">
                                                                Please transfer <span className="text-white font-bold">{selectedService.price}</span> to complete your booking.
                                                            </p>
                                                            <div className="space-y-4 text-sm border-l-2 border-[var(--color-secondary)]/30 pl-6 text-left w-fit mx-auto md:mx-0 bg-white/5 p-4 rounded-r-xl">
                                                                <div>
                                                                    <div className="text-[var(--color-text-muted)] text-[10px] uppercase tracking-wider mb-1">Pay To</div>
                                                                    <div className="font-serif text-lg font-medium text-white tracking-wide">Aashna Ahuja</div>
                                                                </div>
                                                                <div>
                                                                    <div className="text-[var(--color-text-muted)] text-[10px] uppercase tracking-wider mb-1">Bank</div>
                                                                    <div className="font-serif text-lg font-medium text-white tracking-wide">HDFC Bank</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}

                                            {/* Step 2: Upload Screenshot, Transaction ID & Details */}
                                            {currentStep === 1 && (
                                                <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="relative z-10 max-w-4xl mx-auto">
                                                    <h3 className="text-2xl font-serif mb-4 text-white text-center">Payment & Details</h3>
                                                    <p className="text-[var(--color-text-muted)] mb-8 text-center">
                                                        Upload payment proof and provide your contact details.
                                                    </p>

                                                    <div className="grid md:grid-cols-2 gap-8">
                                                        {/* Left Column: Upload & Tx ID */}
                                                        <div className="space-y-6">
                                                            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                                                                <h4 className="text-lg font-serif text-white mb-4">Payment Proof</h4>
                                                                <label className="group relative flex flex-col items-center justify-center w-full h-48 rounded-xl border-2 border-dashed border-[var(--color-secondary)]/30 bg-[var(--color-secondary)]/5 hover:bg-[var(--color-secondary)]/10 transition-all cursor-pointer overflow-hidden hover:border-[var(--color-secondary)]/50">
                                                                    <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} disabled={uploading} />
                                                                    {uploading ? (
                                                                        <div className="flex flex-col items-center gap-4">
                                                                            <Loader className="animate-spin text-[var(--color-secondary)]" size={32} />
                                                                            <p className="text-[var(--color-secondary)] animate-pulse uppercase tracking-[0.2em] text-[10px] font-bold">Uploading...</p>
                                                                        </div>
                                                                    ) : (
                                                                        <>
                                                                            <div className="w-10 h-10 rounded-full bg-[var(--color-secondary)]/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                                                                                <Upload size={20} className="text-[var(--color-secondary)]" />
                                                                            </div>
                                                                            <p className="font-serif text-white mb-1 font-medium text-sm">
                                                                                {screenshotUrl ? 'Receipt Uploaded ✓' : 'Upload Receipt'}
                                                                            </p>
                                                                            <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-widest font-bold">
                                                                                {screenshotUrl ? 'Click to change' : 'JPG, PNG or PDF'}
                                                                            </p>
                                                                            {uploadError && <p className="text-red-400 text-[10px] mt-2 font-bold uppercase tracking-widest">{uploadError}</p>}
                                                                        </>
                                                                    )}
                                                                </label>

                                                                <div className="text-left space-y-2 mt-6">
                                                                    <label className="block text-[10px] uppercase tracking-widest text-[var(--color-text-muted)] font-bold ml-1">Transaction ID *</label>
                                                                    <input
                                                                        type="text"
                                                                        value={userData.transactionId}
                                                                        onChange={(e) => setUserData({ ...userData, transactionId: e.target.value })}
                                                                        placeholder="e.g. UPI Ref No."
                                                                        className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 focus:border-[var(--color-secondary)]/50 focus:outline-none transition-all text-white placeholder-white/20 text-sm"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Right Column: User Details */}
                                                        <div className="space-y-6">
                                                            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 h-full">
                                                                <h4 className="text-lg font-serif text-white mb-4">Your Information</h4>
                                                                <div className="space-y-4">
                                                                    <div className="space-y-2">
                                                                        <label className="block text-[10px] uppercase tracking-widest text-[var(--color-text-muted)] font-bold ml-1">Full Name *</label>
                                                                        <input
                                                                            type="text"
                                                                            value={userData.name}
                                                                            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                                                                            placeholder="Your Name"
                                                                            className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 focus:border-[var(--color-secondary)]/50 focus:outline-none transition-all text-white text-sm"
                                                                        />
                                                                    </div>
                                                                    <div className="space-y-2">
                                                                        <label className="block text-[10px] uppercase tracking-widest text-[var(--color-text-muted)] font-bold ml-1">Email Address *</label>
                                                                        <input
                                                                            type="email"
                                                                            value={userData.email}
                                                                            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                                                                            placeholder="email@example.com"
                                                                            className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 focus:border-[var(--color-secondary)]/50 focus:outline-none transition-all text-white text-sm"
                                                                        />
                                                                    </div>
                                                                    <div className="space-y-2">
                                                                        <label className="block text-[10px] uppercase tracking-widest text-[var(--color-text-muted)] font-bold ml-1">Phone Number *</label>
                                                                        <input
                                                                            type="tel"
                                                                            value={userData.phone}
                                                                            onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                                                                            placeholder="+91 98765 43210"
                                                                            className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 focus:border-[var(--color-secondary)]/50 focus:outline-none transition-all text-white text-sm"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}

                                            {/* Step 3: Details & Calendly */}
                                            {currentStep === 2 && (
                                                <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="relative z-10">
                                                    <div className="max-w-5xl mx-auto">
                                                        <div className="space-y-4">
                                                            <h3 className="text-xl font-serif text-center text-white mb-2">Select Timing</h3>
                                                            <div className={`p-4 rounded-xl border max-w-xl mx-auto mb-6 ${calendlyBooked ? 'bg-emerald-900/20 border-emerald-500/30' : 'bg-[var(--color-secondary)]/5 border-[var(--color-secondary)]/20'} transition-colors`}>
                                                                <div className="flex items-center gap-3 mb-2 justify-center">
                                                                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${calendlyBooked ? 'bg-emerald-500 text-black' : 'bg-[var(--color-secondary)]/20 text-[var(--color-secondary)]'}`}>
                                                                        {calendlyBooked ? <Check size={12} /> : <div className="w-2 h-2 rounded-full bg-current" />}
                                                                    </div>
                                                                    <p className={`font-serif text-lg ${calendlyBooked ? 'text-emerald-400' : 'text-white'}`}>
                                                                        {calendlyBooked ? 'Slot Confirmed' : 'Book used slot below'}
                                                                    </p>
                                                                </div>
                                                            </div>

                                                            <div className="bg-black/20 rounded-2xl overflow-hidden border border-white/10 shadow-inner" style={{ minHeight: '600px' }}>
                                                                <CalendlyEmbed />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>

                                {/* Sticky Footer Nav (Absolute Positioning) */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-[var(--color-secondary)]/20 bg-[var(--color-primary)] shadow-[0_-10px_40px_rgba(0,0,0,0.5)] flex justify-between items-center z-50">
                                    <button
                                        onClick={prevStep}
                                        className={`text-xs font-bold uppercase tracking-widest text-white/50 hover:text-[var(--color-secondary)] transition-colors flex items-center gap-2 px-4 py-2 hover:bg-white/5 rounded-lg ${currentStep === 0 ? 'invisible pointer-events-none' : ''}`}
                                    >
                                        <span className="text-lg">←</span> Back
                                    </button>

                                    <div className="flex gap-2">
                                        {[0, 1, 2].map(i => (
                                            <div key={i} className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${i === currentStep ? 'bg-[var(--color-secondary)]' : 'bg-white/10'}`} />
                                        ))}
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={nextStep}
                                        disabled={submitting || (currentStep === 1 && (!screenshotUrl || !userData.transactionId || !userData.name || !userData.email || !userData.phone))}
                                        className="text-xs font-bold uppercase tracking-widest text-[var(--color-secondary)] hover:text-white transition-colors flex items-center gap-2 px-4 py-2 hover:bg-white/5 rounded-lg disabled:opacity-30 disabled:pointer-events-none"
                                    >
                                        {submitting ? (
                                            <Loader className="animate-spin" size={16} />
                                        ) : (
                                            currentStep === steps.length - 1 ? 'Confirm & Notify' : 'Next Step'
                                        )} <span className="text-lg">→</span>
                                    </motion.button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </div>
    );
};

export default Booking;
