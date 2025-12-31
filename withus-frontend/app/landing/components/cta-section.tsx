'use client';

import React from 'react';
import { motion } from 'motion/react';

export function CTASection() {
    return (
        <section
            className="py-32 px-8 relative overflow-hidden"
            style={{
                background: 'linear-gradient(to bottom, #F7F3F0 0%, #1A3C5A 30%)',
            }}
        >
            <div className="max-w-[1200px] mx-auto text-center relative z-10">
                {/* Main CTA Text */}
                <motion.h2
                    className="mb-12"
                    style={{
                        fontSize: '48px',
                        color: '#FFFFFF',
                        lineHeight: '1.3',
                    }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                    Your next adventure, start it not alone,
                    <br />
                    but <span style={{ color: '#A3836B' }}>Withus</span>.
                </motion.h2>

                {/* Pulsing CTA Button */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <motion.button
                        className="px-12 py-5 rounded-full text-white relative overflow-hidden"
                        style={{
                            background: 'radial-gradient(circle, #FF8A73 0%, #A3836B 100%)',
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
    );
}
