'use client';

import React from 'react';
import { motion } from 'motion/react';
import { palette, theme, animations } from '@/app/components/design-system/constants';

export const StorySection = () => {
    return (
        <section className="w-full py-40 px-6 relative overflow-hidden" style={{ backgroundColor: palette.cream.section }}>
            {/* Subtle Gradient background matching Hero style */}
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-50/10 via-transparent to-pink-50/10 -z-10" />

            <div className="max-w-[1200px] mx-auto space-y-24 relative z-10">
                <div className="text-center space-y-6">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-[10px] font-black tracking-[0.5em] uppercase text-slate-400"
                    >
                        Our Mission
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-7xl font-black text-slate-900 tracking-tight leading-none"
                    >
                        다시 쓰는 <br />
                        <span className="text-transparent bg-clip-text" style={{ backgroundImage: theme.colors.gradients.brand }}>여행의 패러다임</span>
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl bg-white p-2"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1531058284639-8d2863810f87?auto=format&fit=crop&q=80&w=1000"
                            alt="Mission"
                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 rounded-2xl"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="space-y-8"
                    >
                        <p className="text-2xl leading-relaxed text-slate-900 font-bold">
                            위드어스는 단순한 동행 중개를 넘어, <br />
                            동행이라는 문화를 하나의 '표준'으로 정립하고자 합니다.
                        </p>
                        <p className="text-lg leading-relaxed text-slate-500 font-medium">
                            누구나 안전하게, 언제 어디서든 나와 결이 맞는 사람을 만날 수 있는 세상. 우리는 기술과 데이터, 그리고 인간에 대한 깊은 이해를 바탕으로 여행의 새로운 미래를 설계합니다.
                        </p>
                        <div className="flex items-center gap-6 pt-4">
                            <div className="text-center">
                                <p className="text-3xl font-black text-slate-900">1.5M</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Verified Users</p>
                            </div>
                            <div className="w-[1px] h-10 bg-slate-200" />
                            <div className="text-center">
                                <p className="text-3xl font-black text-slate-900">120k</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Monthly Matches</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
