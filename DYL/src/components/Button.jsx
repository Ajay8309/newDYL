import React from 'react';
import { motion } from 'framer-motion';
import '../index.css';

const Button = ({ children, onClick, variant = 'primary', className = '' }) => {
  const isPrimary = variant === 'primary';
  
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        relative px-8 py-3 font-medium text-lg tracking-wide overflow-hidden
        transition-all duration-300 ease-out
        ${isPrimary 
          ? 'bg-transparent text-[var(--color-secondary)] border border-[var(--color-secondary)]' 
          : 'bg-[var(--color-secondary)] text-[var(--color-primary)]'}
        ${className}
      `}
      onClick={onClick}
    >
      <span className="relative z-10">{children}</span>
      {isPrimary && (
        <div className="absolute inset-0 bg-[var(--color-secondary)] opacity-0 hover:opacity-10 transition-opacity duration-300" />
      )}
    </motion.button>
  );
};

export default Button;
