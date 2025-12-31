'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { colors, animations } from '@/app/components/design-system/constants';

export function LandingHeader({ theme = 'dark' }: { theme?: 'light' | 'dark' }) {
    const [activeTab, setActiveTab] = useState('Destinations');

    const navLinks = [
        'Destinations', 'Experiences', 'Deals', 'Guides', 'About', 'Contact'
    ];

    const textColor = theme === 'dark' ? 'text-white' : 'text-[#1A3C5A]';
    const pillBg = theme === 'dark' ? 'bg-white/10 border-white/10' : 'bg-black/5 border-black/5';

    return (
        <motion.header
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-12 py-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: animations.duration.normal, ease: animations.easing.smooth }}
        >
            {/* Logo */}
            <div className="flex items-center gap-2">
                <div className={`text-2xl font-bold tracking-tight ${textColor}`}>
                    WITHUS
                </div>
            </div>

            {/* Navigation Pill */}
            <nav className={`hidden md:flex items-center p-1.5 rounded-full backdrop-blur-md border ${pillBg}`}>
                {navLinks.map((link) => (
                    <button
                        key={link}
                        onClick={() => setActiveTab(link)}
                        className={`relative px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${activeTab === link ? (theme === 'dark' ? 'text-[#1A3C5A]' : 'text-white') : `${textColor} hover:opacity-80`
                            }`}
                    >
                        {activeTab === link && (
                            <motion.div
                                layoutId="nav-pill"
                                className={`absolute inset-0 rounded-full shadow-sm ${theme === 'dark' ? 'bg-white' : 'bg-[#1A3C5A]'}`}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                style={{ borderRadius: 9999 }}
                            />
                        )}
                        <span className={`relative z-10 ${(activeTab === link && theme !== 'dark') ? 'text-white' : ''} ${(activeTab === link && theme === 'dark') ? 'text-[#1A3C5A]' : ''}`}>{link}</span>
                    </button>
                ))}
            </nav>

            {/* Sign Up Button */}
            <motion.button
                className={`px-8 py-3 rounded-full font-semibold text-sm transition-colors ${theme === 'dark'
                        ? 'bg-white text-[#1A3C5A] hover:bg-white/90'
                        : 'bg-[#1A3C5A] text-white hover:bg-[#1A3C5A]/90'
                    }`}
                whileTap={{ scale: 0.95 }}
            >
                Sign up
            </motion.button>
        </motion.header>
    );
}
