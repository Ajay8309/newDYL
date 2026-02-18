import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import logo from '../assets/logo.jpeg';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location]);

    const leftLinks = [
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
        { name: 'The Mentor', path: '/about' },
    ];

    const rightLinks = [
        { name: 'Client Stories', path: '/blog' },
    ];

    const linkClass = (path) =>
        `text-xs uppercase tracking-[0.15em] transition-colors whitespace-nowrap ${location.pathname === path
            ? 'text-[var(--color-secondary)]'
            : 'text-white/70 hover:text-white'
        }`;

    return (
        <>
            <motion.nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass py-3' : 'bg-transparent py-5'
                    }`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="max-w-[1400px] mx-auto px-6">
                    {/* Desktop Layout — 3-column grid */}
                    <div className="hidden md:grid grid-cols-[1fr_auto_1fr] items-center gap-6">
                        {/* Left Links */}
                        <div className="flex items-center gap-8">
                            {leftLinks.map((link) => (
                                <Link key={link.name} to={link.path} className={linkClass(link.path)}>
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        {/* Center Logo */}
                        <Link to="/" className="flex items-center justify-center">
                            <img src={logo} alt="Decode Your Life" className="h-20 md:h-24 object-contain transition-all duration-300 hover:scale-105" />
                        </Link>

                        {/* Right Links + CTA */}
                        <div className="flex items-center justify-end gap-8">
                            {rightLinks.map((link) => (
                                <Link key={link.name} to={link.path} className={linkClass(link.path)}>
                                    {link.name}
                                </Link>
                            ))}
                            <Link to="/booking">
                                <motion.button
                                    whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(212,175,55,0.3)' }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{ backgroundColor: 'var(--color-secondary)', color: '#022C22' }}
                                    className="px-5 py-2 text-xs font-bold uppercase tracking-widest rounded-md ml-2"
                                >
                                    Book Now
                                </motion.button>
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Layout */}
                    <div className="flex md:hidden justify-between items-center">
                        <button onClick={() => setIsMobileMenuOpen(true)} className="text-white">
                            <Menu size={24} />
                        </button>

                        <Link to="/" className="flex items-center">
                            <img src={logo} alt="Decode Your Life" className="h-14 object-contain" />
                        </Link>

                        <Link to="/booking">
                            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--color-secondary)' }}>Book</span>
                        </Link>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Fullscreen Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '-100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '-100%' }}
                        transition={{ type: 'tween', duration: 0.3 }}
                        className="fixed inset-0 z-[60] bg-[var(--color-primary)] flex flex-col justify-center items-center gap-8"
                    >
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="absolute top-6 right-6 text-white"
                        >
                            <X size={28} />
                        </button>

                        {[...leftLinks, ...rightLinks].map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`text-2xl font-serif transition-colors ${location.pathname === link.path
                                    ? 'text-[var(--color-secondary)]'
                                    : 'text-white hover:text-[var(--color-secondary)]'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}

                        <Link to="/booking">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                style={{ backgroundColor: 'var(--color-secondary)', color: '#022C22' }}
                                className="px-8 py-3 font-bold rounded-lg mt-4"
                            >
                                Book Now
                            </motion.button>
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
