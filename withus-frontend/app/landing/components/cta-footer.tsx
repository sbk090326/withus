'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Instagram, Facebook, Twitter } from 'lucide-react';
import { colors, animations } from '@/app/components/design-system/constants';

export function CTAFooter() {
    const ctaRef = useRef(null);
    const buttonRef = useRef(null);
    const isCTAInView = useInView(ctaRef, { once: true, amount: 0.3 });
    const isButtonInView = useInView(buttonRef, { once: true, amount: 0.3 });

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
        <div>
            {/* CTA Section */}
            <section
                className="py-32 px-8 relative overflow-hidden"
                style={{
                    background: `linear-gradient(to bottom, ${colors.neutral.cream} 0%, ${colors.primary.navy} 30%)`,
                }}
            >
                <div className="max-w-[1200px] mx-auto text-center relative z-10">
                    {/* Main CTA Text */}
                    <motion.h2
                        ref={ctaRef}
                        className="mb-12"
                        style={{
                            fontSize: '48px',
                            color: colors.neutral.white,
                            lineHeight: '1.3',
                        }}
                        initial={{ opacity: 0, y: 30 }}
                        animate={isCTAInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: animations.duration.normal, ease: animations.easing.smooth }}
                    >
                        Your next adventure, start it not alone,
                        <br />
                        but <span style={{ color: colors.primary.tan }}>Withus</span>.
                    </motion.h2>

                    {/* Pulsing CTA Button */}
                    <motion.div
                        ref={buttonRef}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isButtonInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <motion.button
                            className="px-12 py-5 rounded-full text-white relative overflow-hidden"
                            style={{
                                background: `radial-gradient(circle, ${colors.accent.coral} 0%, ${colors.primary.tan} 100%)`,
                                boxShadow: '0 8px 32px rgba(255, 138, 115, 0.4)',
                                fontSize: '20px',
                            }}
                            animate={{
                                scale: [1, 1.05, 1],
                                boxShadow: [
                                    '0 8px 32px rgba(255, 138, 115, 0.4)',
                                    '0 12px 48px rgba(255, 138, 115, 0.6)',
                                    '0 8px 32px rgba(255, 138, 115, 0.4)',
                                ],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                            whileHover={{
                                scale: 1.08,
                                boxShadow: '0 16px 64px rgba(255, 138, 115, 0.5)',
                                transition: { duration: 0.2 },
                            }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Find Your Companion Now
                        </motion.button>
                    </motion.div>
                </div>

                {/* Decorative elements */}
                <div
                    className="absolute inset-0 opacity-5 pointer-events-none"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                />
            </section>

            {/* Footer */}
            <footer className="py-16 px-8" style={{ backgroundColor: colors.primary.navy }}>
                <div className="max-w-[1400px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                        {/* Logo & Description */}
                        <div>
                            <h3 className="mb-4" style={{ fontSize: '28px', color: colors.neutral.white }}>
                                With<span style={{ color: colors.primary.tan }}>us</span>
                            </h3>
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
        </div>
    );
}
