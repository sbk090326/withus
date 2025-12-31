'use client';

// Imports updated
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import Link from 'next/link';
import { colors, animations } from '@/app/components/design-system/constants';

export function LandingHeader({ theme: initialTheme = 'dark' }: { theme?: 'light' | 'dark' }) {
    const [activeTab, setActiveTab] = useState('Destinations');
    const [isScrolled, setIsScrolled] = useState(false);
    const { scrollY } = useScroll();

    const navLinks = [
        'Destinations', 'Experiences', 'Deals', 'Guides', 'About', 'Contact'
    ];

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        if (latest > 50 && !isScrolled) {
            setIsScrolled(true);
        } else if (latest <= 50 && isScrolled) {
            setIsScrolled(false);
        }
    });

    // Effective theme based on scroll state
    const currentTheme = isScrolled ? 'light' : initialTheme;

    // Dynamic styles
    const textColor = currentTheme === 'dark' ? 'text-white' : `text-[${colors.primary.navy}]`;
    const pillBg = currentTheme === 'dark' ? 'bg-white/10 border-white/10' : 'bg-[#1A3C5A]/5 border-[#1A3C5A]/10';

    // Header container style
    // Increased z-index to 999 to ensure visibility over all sections
    const headerBgClass = isScrolled
        ? 'bg-white/95 backdrop-blur-md shadow-md py-4 border-b border-black/5' // Scrolled: High contrast, almost opaque white
        : 'bg-transparent py-8'; // Top: Transparent

    return (
        <motion.header
            className={`fixed top-0 left-0 right-0 z-[999] flex items-center justify-between px-12 transition-all duration-300 ${headerBgClass}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: animations.duration.normal, ease: animations.easing.smooth }}
        >
            {/* Logo */}
            <div className="flex items-center gap-2">
                <div className={`text-2xl font-bold tracking-tight transition-colors duration-300 ${textColor}`}>
                    WITHUS
                </div>
            </div>

            {/* Navigation Pill */}
            <nav className={`hidden md:flex items-center p-1.5 rounded-full transition-all duration-300 backdrop-blur-md border ${pillBg}`}>
                {navLinks.map((link) => (
                    <button
                        key={link}
                        onClick={() => setActiveTab(link)}
                        className={`relative px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${activeTab === link
                                ? (currentTheme === 'dark' ? `text-[${colors.primary.navy}]` : 'text-white')
                                : `${textColor} hover:opacity-80`
                            }`}
                    >
                        {activeTab === link && (
                            <motion.div
                                layoutId="nav-pill"
                                className={`absolute inset-0 rounded-full shadow-sm ${currentTheme === 'dark' ? 'bg-white' : `bg-[${colors.primary.navy}]`}`}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                style={{ borderRadius: 9999 }}
                            />
                        )}
                        <span className={`relative z-10 transition-colors duration-300 ${activeTab === link
                                ? (currentTheme === 'dark' ? `text-[${colors.primary.navy}]` : 'text-white')
                                : ''
                            }`}>
                            {link}
                        </span>
                    </button>
                ))}
            </nav>

            {/* Sign Up Button */}
            <motion.button
                className={`px-8 py-3 rounded-full font-semibold text-sm transition-colors duration-300 ${currentTheme === 'dark'
                        ? `bg-white text-[${colors.primary.navy}] hover:bg-white/90`
                        : `bg-[${colors.primary.navy}] text-white hover:bg-[${colors.primary.navy}]/90`
                    }`}
                whileTap={{ scale: 0.95 }}
            >
                Sign up
            </motion.button>
        </motion.header>
    );
}
