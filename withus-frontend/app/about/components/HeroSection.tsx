'use client';

import React from 'react';
import { motion } from 'motion/react';
import { palette, theme, animations } from '@/app/components/design-system/constants';

export const HeroSection = () => {
    return (
        <section className="relative w-full pt-32 md:pt-48 pb-24 md:pb-32 overflow-hidden" style={{ backgroundColor: palette.cream.section }}>
            {/* Background Decoration - Inspired by Contact Page */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-200/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-pink-200/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-teal-50/30 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: animations.easing.smooth as any }}
                        className="lg:col-span-7 space-y-8"
                    >
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white shadow-sm border border-slate-100/50">
                            <span className="flex h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
                            <span className="text-xs font-bold text-slate-600 tracking-tight">
                                함께라서 더 즐거운 여행, 위드어스 😊
                            </span>
                        </div>

                        <h1
                            className="text-5xl md:text-7xl font-black leading-[1.1] tracking-tight text-slate-900"
                        >
                            마음이 맞는 <br />
                            <span className="text-transparent bg-clip-text" style={{ backgroundImage: theme.colors.gradients.brand }}>
                                친구 같은 동행
                            </span>
                        </h1>

                        <p
                            className="text-lg md:text-xl leading-relaxed max-w-xl text-slate-600 font-medium"
                        >
                            낯선 곳에서의 막막함을 든든한 웃음으로 채워보세요. <br />
                            위드어스는 단순한 매칭을 넘어, 검증된 여행자들과 함께 <br />
                            당신의 매 순간을 특별한 추억으로 바꿉니다. 🙌
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, x: 30 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 1 }}
                        className="lg:col-span-5 relative"
                    >
                        <div className="relative aspect-[4/5] rounded-[40px] overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,0.15)] group bg-white">
                            <img
                                src="/about.png"
                                alt="Happy Friends"
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
