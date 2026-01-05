'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Apple, Smartphone, Sparkles } from 'lucide-react';
import { spacing } from '@/app/components/design-system/constants';

export function CallToActionSection() {
    return (
        <section className={`w-full relative z-10 overflow-hidden bg-[#FDFCFB]`}>
            {/* Background Image */}
            <div className="relative h-[500px] md:h-[600px] w-full bg-[#FDFCFB]">
                <Image
                    src="/cta-bg.png"
                    alt="Two travelers looking at hot air balloons over a scenic landscape"
                    fill
                    className="object-cover"
                    priority={false}
                />

                {/* Darker Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>

                {/* Content */}
                <div className={`relative h-full flex items-center justify-center ${spacing.section.px}`}>
                    <div className="max-w-[700px] text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-6">
                                <Sparkles size={16} className="text-orange-400" />
                                <span className="text-sm font-medium text-white/90">가장 빠르게 성장하는 여행 커뮤니티</span>
                            </div>

                            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                                준비 되셨나요? <br />
                                <span className="bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">다음 모험을 시작하세요</span>
                            </h2>

                            <p className="text-lg md:text-xl text-white/80 mb-10 leading-relaxed">
                                수많은 여행자들이 이미 완벽한 동행을 찾았습니다. <br className="hidden md:block" />
                                당신의 잊지 못할 여정이 여기에서 시작됩니다.
                            </p>

                            {/* App Store Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <motion.a
                                    href="#"
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="inline-flex items-center gap-3 px-6 py-3 bg-black text-white rounded-xl font-medium hover:bg-black/90 transition-colors shadow-lg"
                                >
                                    <Apple size={24} />
                                    <div className="text-left">
                                        <div className="text-xs opacity-80">Download on the</div>
                                        <div className="text-sm font-bold">App Store</div>
                                    </div>
                                </motion.a>

                                <motion.a
                                    href="#"
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="inline-flex items-center gap-3 px-6 py-3 bg-black text-white rounded-xl font-medium hover:bg-black/90 transition-colors shadow-lg"
                                >
                                    <Smartphone size={24} />
                                    <div className="text-left">
                                        <div className="text-xs opacity-80">GET IT ON</div>
                                        <div className="text-sm font-bold">Google Play</div>
                                    </div>
                                </motion.a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
