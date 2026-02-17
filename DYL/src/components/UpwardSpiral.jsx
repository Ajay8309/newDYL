import React from 'react';
import { motion } from 'framer-motion';

const UpwardSpiral = () => {
    return (
        <div className="relative w-full aspect-[3/4] max-w-[400px] mx-auto flex items-center justify-center">
            {/* Background Glow */}
            <div className="absolute inset-x-0 top-1/4 bottom-1/4 bg-emerald-500/5 rounded-full blur-[120px] animate-pulse" />

            <motion.svg
                viewBox="0 0 200 300"
                className="w-full h-full relative z-10 overflow-visible"
                initial="hidden"
                animate="visible"
            >
                <defs>
                    <linearGradient id="vortexGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                        <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.8" />
                        <stop offset="40%" stopColor="#10b981" stopOpacity="0.6" />
                        <stop offset="70%" stopColor="#3b82f6" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#a855f7" stopOpacity="0.7" />
                    </linearGradient>
                    <filter id="vortexGlow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    <radialGradient id="beamGradient">
                        <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
                        <stop offset="50%" stopColor="#fbbf24" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
                    </radialGradient>
                </defs>

                {/* Central Light Beam */}
                <motion.rect
                    x="99" y="20" width="2" height="260"
                    fill="url(#vortexGradient)"
                    filter="url(#vortexGlow)"
                    initial={{ scaleY: 0, opacity: 0 }}
                    animate={{ scaleY: 1, opacity: 1 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    style={{ originY: 1 }}
                />

                {/* Vortex Rings */}
                {[...Array(12)].map((_, i) => {
                    const yPos = 280 - (i * 22);
                    const width = 20 + (i * 12);
                    const height = 6 + (i * 3);
                    const delay = i * 0.15;

                    return (
                        <motion.ellipse
                            key={i}
                            cx="100"
                            cy={yPos}
                            rx={width / 2}
                            ry={height / 2}
                            fill="none"
                            stroke="url(#vortexGradient)"
                            strokeWidth="1.5"
                            filter="url(#vortexGlow)"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{
                                opacity: [0, 0.6, 0.3],
                                scale: [0.8, 1, 1.1],
                                y: [10, 0, -5]
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                delay: delay,
                                ease: "linear"
                            }}
                        />
                    );
                })}

                {/* Ascending Particles */}
                {[...Array(20)].map((_, i) => {
                    const delay = Math.random() * 5;
                    const duration = 3 + Math.random() * 2;
                    const startX = 90 + Math.random() * 20;

                    return (
                        <motion.circle
                            key={`p-${i}`}
                            r={Math.random() * 1.5 + 0.5}
                            fill="#fff"
                            filter="url(#vortexGlow)"
                            initial={{ x: startX, y: 280, opacity: 0 }}
                            animate={{
                                y: 20,
                                opacity: [0, 1, 1, 0],
                                x: [startX, startX + (Math.random() * 40 - 20)]
                            }}
                            transition={{
                                duration: duration,
                                repeat: Infinity,
                                delay: delay,
                                ease: "linear"
                            }}
                        />
                    );
                })}

                {/* Top Star/Light */}
                <motion.circle
                    cx="100" cy="20" r="4"
                    fill="#fff"
                    filter="url(#vortexGlow)"
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.7, 1, 0.7]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
            </motion.svg>
        </div>
    );
};

export default UpwardSpiral;
