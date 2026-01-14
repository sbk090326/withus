'use client';

import React from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { Sparkles, ArrowRight, PenTool } from 'lucide-react';
import { palette, theme } from '@/app/components/design-system/constants';

export const DestinationsCTA = () => {
    return (
        <section className="w-full py-40 px-6 relative overflow-hidden" style={{ background: theme.colors.gradients.brand }}>
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-20 pointer-events-none" />

            {/* Decorative Elements */}
            <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-10 left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />

            <div className="max-w-[1000px] mx-auto text-center relative z-10 space-y-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="space-y-6"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30">
                        <Sparkles size={16} className="text-white" fill="white" />
                        <span className="text-sm font-bold text-white">Your Journey Starts Here</span>
                    </div>

                    <h2 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight">
                        마음에 드는 일정을 찾으셨나요? <br />
                        이제 당신만의 여행을 시작하세요.
                    </h2>

                    <p className="text-lg md:text-xl text-white/90 font-medium max-w-2xl mx-auto">
                        검증된 루트를 내 플래너에 담고, 나만의 스타일로 커스터마이징하세요. <br />
                        그리고 함께할 동행을 찾아 특별한 추억을 만들어보세요.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-6"
                >
                    <Link href="/my-trips/planner">
                        <button className="group px-10 py-5 rounded-full bg-white text-slate-900 font-black text-lg hover:shadow-2xl hover:scale-105 transition-all flex items-center gap-3">
                            <PenTool size={22} />
                            내 플래너 만들기
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </Link>

                    <Link href="/find-companion">
                        <button className="px-10 py-5 rounded-full bg-transparent border-2 border-white/30 text-white font-black text-lg hover:bg-white/10 hover:border-white transition-all flex items-center gap-3">
                            동행 찾아보기
                            <ArrowRight size={20} />
                        </button>
                    </Link>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="grid grid-cols-3 gap-8 pt-16 border-t border-white/20 max-w-2xl mx-auto"
                >
                    <div className="text-center">
                        <p className="text-4xl font-black text-white mb-2">1,200+</p>
                        <p className="text-sm text-white/80 font-medium">검증된 루트</p>
                    </div>
                    <div className="text-center">
                        <p className="text-4xl font-black text-white mb-2">15K+</p>
                        <p className="text-sm text-white/80 font-medium">활성 여행자</p>
                    </div>
                    <div className="text-center">
                        <p className="text-4xl font-black text-white mb-2">98%</p>
                        <p className="text-sm text-white/80 font-medium">만족도</p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
