'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Instagram, Facebook, Twitter } from 'lucide-react';
import Link from 'next/link';
import { colors } from '@/app/components/design-system/constants';

export function Footer() {
    const socialLinks = [
        { icon: Instagram, href: '#instagram' },
        { icon: Facebook, href: '#facebook' },
        { icon: Twitter, href: '#twitter' },
    ];

    const footerLinks = [
        { name: 'About Us', href: '#about' },
        { name: 'Terms of Service', href: '#terms' },
        { name: 'Privacy Policy', href: '#privacy' },
        { name: 'Contact Us', href: '#contact' },
        { name: 'Help Center', href: '#help' },
    ];

    return (
        <footer className="py-16 px-8" style={{ backgroundColor: colors.primary.navy }}>
            <div className="max-w-[1400px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    {/* Logo & Description */}
                    <div>
                        <Link href="/">
                            <h3 className="mb-4 cursor-pointer" style={{ fontSize: '28px', color: colors.neutral.white }}>
                                With<span style={{ color: colors.primary.tan }}>us</span>
                            </h3>
                        </Link>
                        <p style={{ fontSize: '16px', color: colors.neutral.white, opacity: 0.85 }}>
                            Connecting travelers with compatible companions for unforgettable shared
                            experiences around the world.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4
                            className="mb-4"
                            style={{ fontSize: '18px', color: colors.neutral.white, opacity: 0.95 }}
                        >
                            Quick Links
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.slice(0, 3).map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.href}
                                        className="transition-colors duration-300 hover:opacity-100"
                                        style={{ fontSize: '16px', color: colors.neutral.white, opacity: 0.85 }}
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4
                            className="mb-4"
                            style={{ fontSize: '18px', color: colors.neutral.white, opacity: 0.95 }}
                        >
                            Support
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.slice(3).map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.href}
                                        className="transition-colors duration-300 hover:opacity-100"
                                        style={{ fontSize: '16px', color: colors.neutral.white, opacity: 0.85 }}
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div
                    className="h-[1px] mb-8"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                />

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Copyright */}
                    <p style={{ fontSize: '14px', color: colors.neutral.white, opacity: 0.7 }}>
                        © 2025 Withus. All rights reserved.
                    </p>

                    {/* Social Media Icons */}
                    <div className="flex items-center gap-6">
                        {socialLinks.map((social, index) => {
                            const Icon = social.icon;
                            return (
                                <motion.a
                                    key={index}
                                    href={social.href}
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Icon size={24} style={{ color: colors.primary.tan }} />
                                </motion.a>
                            );
                        })}
                    </div>
                </div>
            </div>
        </footer>
    );
}
