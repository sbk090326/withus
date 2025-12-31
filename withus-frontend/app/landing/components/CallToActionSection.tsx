'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { colors, spacing } from '@/app/components/design-system/constants';

export function CallToActionSection() {
    return (
        <section className={`w-full ${spacing.section.py} relative z-10 overflow-hidden`}>
            {/* Background with Gradient and Noise/Pattern */}
            <div className="absolute inset-0 bg-[#1A3C5A]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1A3C5A] via-[#2A4C6A] to-[#1A3C5A]" />
                {/* Abstract Circles/Shapes for visual interest */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#FF8A73]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
            </div>

            <div className={`relative max-w-[1000px] mx-auto ${spacing.section.px} text-center text-white`}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-8">
                        <Sparkles size={16} className="text-[#FF8A73]" />
                        <span className="text-sm font-medium text-white/90">Join the fastest growing travel community</span>
                    </div>

                    <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                        Ready to start your <br />
                        <span className="text-[#FF8A73]">next adventure?</span>
                    </h2>

                    <p className="text-lg md:text-xl text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed">
                        Connect with fellow travelers, share expenses, and create memories that last a lifetime.
                        Sign up today and find your perfect travel companion.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full sm:w-auto px-10 py-4 rounded-full bg-white text-[#1A3C5A] font-bold text-lg shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center gap-2"
                        >
                            Sign up for free
                            <ArrowRight size={20} />
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full sm:w-auto px-10 py-4 rounded-full border border-white/30 text-white font-medium hover:bg-white/10 transition-colors"
                        >
                            View demo
                        </motion.button>
                    </div>

                    <p className="mt-8 text-sm text-white/40">
                        No credit card required · Free for early adopters
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
