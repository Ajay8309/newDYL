import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const OfferBanner = () => {
    return (
        <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full bg-[var(--color-secondary)] py-2 px-4 fixed top-0 left-0 right-0 z-[60] overflow-hidden shadow-md"
        >
            {/* Animated background highlights */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer pointer-events-none" />

            <div className="max-w-[1400px] mx-auto flex items-center justify-center gap-3 text-center">
                <Sparkles size={16} className="text-[#022C22] shrink-0" />
                <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.1em] text-[#022C22] leading-tight">
                    ✨ Website Launch Offer: Flat ₹499 for all services <span className="opacity-60">(excl. Integrated Healing)</span> for first 50 seekers! ✨
                </p>
                <Sparkles size={16} className="text-[#022C22] shrink-0" />
            </div>
        </motion.div>
    );
};

export default OfferBanner;
