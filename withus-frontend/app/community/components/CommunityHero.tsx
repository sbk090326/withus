'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, PenTool, LayoutGrid, MessageSquare } from 'lucide-react';
import { theme } from '@/app/components/design-system/constants';

interface CommunityHeroProps {
    onAddPost: () => void;
}

export const CommunityHero = ({ onAddPost }: CommunityHeroProps) => {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <section className="relative w-full pt-32 pb-20 px-6 overflow-hidden">
            {/* Background Decor - Unified style */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1400px] h-full pointer-events-none">
                <div className="absolute top-[-5%] right-[-10%] w-[600px] h-[600px] bg-orange-200/20 rounded-full blur-[120px] mix-blend-multiply" />
                <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-pink-100/20 rounded-full blur-[100px] mix-blend-multiply" />
                <div className="absolute top-[30%] left-[20%] w-[400px] h-[400px] bg-yellow-100/15 rounded-full blur-[100px] mix-blend-multiply" />
            </div>

            <div className="max-w-[1200px] mx-auto relative z-10">
                <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-2xl"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 backdrop-blur-md border border-slate-100 shadow-sm mb-6">
                            <MessageSquare size={16} className="text-teal-500" />
                            <span className="text-xs font-bold text-slate-600">WithUs Community</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-black text-slate-900 leading-[1.2] tracking-tight">
                            여행의 즐거움, <br />
                            <span className="text-transparent bg-clip-text" style={{ backgroundImage: theme.colors.gradients.brand }}>
                                함께 나누면 두 배
                            </span>
                        </h1>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <button
                            onClick={onAddPost}
                            className="flex items-center gap-3 px-8 py-4 rounded-3xl text-white font-bold shadow-xl hover:shadow-orange-500/30 transition-all hover:-translate-y-1"
                            style={{ background: theme.colors.gradients.brandDeep }}
                        >
                            <PenTool size={20} />
                            글쓰기
                        </button>
                    </motion.div>
                </div>

                {/* Search Bar - Glassmorphism (Restored original style) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="max-w-2xl"
                >
                    <div className="bg-white/60 backdrop-blur-xl border border-white p-2 rounded-[28px] shadow-xl flex items-center gap-2">
                        <div className="flex-1 flex items-center gap-3 px-6 py-3">
                            <Search size={20} className="text-slate-400" />
                            <input
                                type="text"
                                placeholder="궁금한 내용을 검색해보세요 (예: 파리 맛집, 비행기 지연)"
                                className="bg-transparent border-none outline-none w-full text-slate-900 font-medium placeholder:text-slate-400"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <button
                            className="px-8 py-3 rounded-[22px] bg-slate-900 text-white font-bold hover:bg-slate-800 transition-all text-sm"
                        >
                            검색
                        </button>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};
