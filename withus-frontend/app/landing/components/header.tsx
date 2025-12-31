'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Find Companions', href: '#companions' },
        { name: 'Trip Recommendations', href: '#trips' },
        { name: 'Community', href: '#community' },
        { name: 'Guide', href: '#guide' },
    ];

    return (
        <motion.header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${isScrolled ? 'backdrop-blur-xl bg-white/70' : 'backdrop-blur-md bg-white/40'
                }`}
            style={{
                boxShadow: isScrolled ? '0 4px 24px rgba(0, 0, 0, 0.06)' : 'none',
            }}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
            <div className="max-w-[1400px] mx-auto px-8">
                <div className="flex items-center justify-between h-[72px]">
                    {/* Logo */}
                    <div className="flex items-center">
                        <h1 className="text-[24px] font-semibold" style={{ color: '#1A3C5A' }}>
                            With<span style={{ color: '#A3836B' }}>us</span>
                        </h1>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex items-center gap-12">
                        {navLinks.map((link) => (
                            <div key={link.name} className="relative">
                                <a
                                    href={link.href}
                                    className="transition-colors duration-300"
                                    style={{ color: '#1A3C5A' }}
                                    onMouseEnter={() => setHoveredLink(link.name)}
                                    onMouseLeave={() => setHoveredLink(null)}
                                >
                                    {link.name}
                                </a>
                                {hoveredLink === link.name && (
                                    <motion.div
                                        className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full"
                                        style={{ backgroundColor: '#FF8A73' }}
                                        layoutId="navIndicator"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                    />
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* Auth Buttons */}
                    <div className="flex items-center gap-6">
                        <button
                            className="transition-colors duration-300"
                            style={{ color: '#1A3C5A' }}
                        >
                            Login
                        </button>
                        <motion.button
                            className="px-8 py-3 rounded-full text-white transition-all duration-300"
                            style={{ backgroundColor: '#A3836B' }}
                            whileHover={{
                                scale: 1.02,
                                backgroundColor: '#8e7260',
                                transition: { duration: 0.2 },
                            }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Free Sign Up
                        </motion.button>
                    </div>
                </div>
            </div>
        </motion.header>
    );
}
