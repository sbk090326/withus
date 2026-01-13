'use client';

import React from 'react';
import { motion } from 'motion/react';
import { palette } from '@/app/components/design-system/constants';
import { Search, MapPin, Calendar, Filter } from 'lucide-react';

export const CompanionHero = () => {
    return (
        <section className="relative w-full pt-32 pb-20 px-6 overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1400px] h-full pointer-events-none">
                <div className="absolute top-[-5%] right-[-10%] w-[600px] h-[600px] bg-orange-200/20 rounded-full blur-[120px] mix-blend-multiply" />
                <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-pink-100/20 rounded-full blur-[100px] mix-blend-multiply" />
                <div className="absolute top-[30%] left-[20%] w-[400px] h-[400px] bg-yellow-100/15 rounded-full blur-[100px] mix-blend-multiply" />
            </div>

            <div className="max-w-[1200px] mx-auto relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Live Counter Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 backdrop-blur-md border border-orange-100 shadow-sm mb-6">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                        </span>
                        <span className="text-xs font-bold text-slate-600">
                            현재 <span className="text-orange-600">128명</span>의 여행자가 함께 보고 있어요
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
                        함께할 때 더 즐거운 <br />
                        <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(to right, #f97316, #ec4899)' }}>
                            완벽한 여행 메이트
                        </span>
                    </h1>
                    <p className="text-lg text-slate-600 mb-12 max-w-2xl mx-auto">
                        당신의 여행 성향과 99% 일치하는 동행을 찾아보세요. <br />
                        검증된 사용자들과 안전하고 즐거운 여행이 시작됩니다.
                    </p>
                </motion.div>

                {/* Search Bar - Glassmorphism */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="max-w-4xl mx-auto space-y-4"
                >
                    <div className="bg-white/70 backdrop-blur-xl border border-white p-2 md:p-3 rounded-[32px] shadow-2xl flex flex-col md:flex-row items-center gap-2">
                        {/* ... (search inputs) */}
                        <div className="flex-1 flex items-center gap-3 px-6 py-3 border-b md:border-b-0 md:border-r border-slate-100 w-full">
                            <MapPin size={20} className="text-orange-500" />
                            <input
                                type="text"
                                placeholder="어디로 떠나시나요?"
                                className="bg-transparent border-none outline-none w-full text-slate-900 font-medium placeholder:text-slate-400"
                            />
                        </div>
                        <div className="flex-1 flex items-center gap-3 px-6 py-3 border-b md:border-b-0 md:border-r border-slate-100 w-full">
                            <Calendar size={20} className="text-orange-500" />
                            <input
                                type="text"
                                placeholder="언제 떠나시나요?"
                                className="bg-transparent border-none outline-none w-full text-slate-900 font-medium placeholder:text-slate-400"
                            />
                        </div>
                        <button
                            className="w-full md:w-auto px-10 py-4 rounded-full text-white font-bold shadow-lg hover:shadow-orange-500/30 transition-all flex items-center justify-center gap-2"
                            style={{ background: 'linear-gradient(to right, #f97316, #ec4899)' }}
                        >
                            <Search size={20} />
                            찾기
                        </button>
                    </div>

                    {/* Trending Keywords */}
                    <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-2">Trending</span>
                        {['#파리에펠탑', '#제주한달살기', '#서핑클래스', '#유럽배낭여행', '#맛집탐방'].map((tag) => (
                            <button
                                key={tag}
                                className="px-4 py-1.5 rounded-full bg-white/40 backdrop-blur-sm border border-white/50 text-xs font-medium text-slate-600 hover:bg-white hover:text-orange-500 transition-all shadow-sm"
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
