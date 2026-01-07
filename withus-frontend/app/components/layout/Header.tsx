'use client';

import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import { colors, animations } from '@/app/components/design-system/constants';

export function Header({ theme: initialTheme = 'light' }: { theme?: 'light' | 'dark' }) {
    const [activeTab, setActiveTab] = useState('Destinations');
    const [isScrolled, setIsScrolled] = useState(false);
    const { scrollY } = useScroll();

    const navLinks = [
        '동행 찾기', '추천 여행지', '커뮤니티', '내 여행', '소개', '문의'
    ];

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        if (latest > 50 && !isScrolled) {
            setIsScrolled(true);
        } else if (latest <= 50 && isScrolled) {
            setIsScrolled(false);
        }
    });

    // Always use light theme for the new design
    const currentTheme = 'light';

    // Dynamic styles - warm and friendly colors
    const textColor = 'text-slate-900';
    const pillBg = isScrolled
        ? 'bg-slate-50/80 border-slate-200'
        : 'bg-orange-50/40 border-orange-100/50';

    // Header container style
    const headerBgClass = isScrolled
        ? 'bg-white/95 backdrop-blur-md shadow-md py-4 border-b border-slate-200' // Scrolled: solid white
        : 'bg-gradient-to-b from-white/70 to-white/50 backdrop-blur-md py-6 border-b border-orange-100/30'; // Top: warm gradient

    return (
        <motion.header
            className={`fixed top-0 left-0 right-0 z-[999] flex items-center justify-between px-12 transition-all duration-300 ${headerBgClass}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: animations.duration.normal, ease: animations.easing.smooth }}
        >
            {/* Logo */}
            <div className="flex items-center gap-2">
                <div className="text-2xl font-bold tracking-tight bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                    WITHUS
                </div>
            </div>

            {/* Navigation Pill */}
            <nav className={`hidden md:flex items-center p-1.5 rounded-full transition-all duration-300 backdrop-blur-md border ${pillBg}`}>
                {navLinks.map((link) => (
                    <button
                        key={link}
                        onClick={() => setActiveTab(link)}
                        className={`relative px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${activeTab === link ? 'text-white' : `${textColor} hover:opacity-80`
                            }`}
                    >
                        {activeTab === link && (
                            <motion.div
                                layoutId="nav-pill"
                                className="absolute inset-0 rounded-full shadow-sm bg-gradient-to-r from-orange-500 to-pink-500"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                style={{ borderRadius: 9999 }}
                            />
                        )}
                        <span className={`relative z-10 transition-colors duration-300 ${activeTab === link ? 'text-white' : ''
                            }`}>
                            {link}
                        </span>
                    </button>
                ))}
            </nav>

            {/* Sign Up Button */}
            <motion.button
                className="px-8 py-3 rounded-full font-semibold text-sm transition-colors duration-300 bg-[#FF7E5F] text-white hover:bg-[#FF6B47] shadow-md"
                whileTap={{ scale: 0.95 }}
            >
                로그인
            </motion.button>
        </motion.header>
    );
}
