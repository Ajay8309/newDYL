import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ children, className = '', hoverEffect = true }) => {
    return (
        <motion.div
            whileHover={hoverEffect ? { y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.2)' } : {}}
            className={`
        glass p-8 rounded-xl
        border border-white/10
        transition-all duration-300
        ${className}
      `}
        >
            {children}
        </motion.div>
    );
};

export default Card;
