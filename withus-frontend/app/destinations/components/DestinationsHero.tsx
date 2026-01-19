'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react'; // AnimatePresence는 이제 사용하지 않으므로 삭제
import { Search, MapPin, Route, X } from 'lucide-react';
import { theme } from '@/app/components/design-system/constants';

interface DestinationsHeroProps {
    onSearch: (query: string) => void;
}

export const DestinationsHero = ({ onSearch }: DestinationsHeroProps) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    const handleSearch = () => {
        if (searchQuery.trim()) {
            onSearch(searchQuery);
        }
    };

    const handleQuickTag = (tag: string) => {
        const cleanTag = tag.replace('#', '');
        setSearchQuery(cleanTag);
        onSearch(cleanTag);
    };

    return (
        <section className="relative w-full pt-32 pb-24 px-6 overflow-hidden">
            {/* Background Decor - Unified with CompanionHero */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1400px] h-full pointer-events-none">
                <div className="absolute top-[-5%] right-[-10%] w-[600px] h-[600px] bg-orange-200/20 rounded-full blur-[120px] mix-blend-multiply" />
                <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-pink-100/20 rounded-full blur-[100px] mix-blend-multiply" />
                <div className="absolute top-[30%] left-[20%] w-[400px] h-[400px] bg-teal-100/15 rounded-full blur-[100px] mix-blend-multiply" />
            </div>

            <div className="max-w-[1200px] mx-auto relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* 상단 배지 - Unified style */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 backdrop-blur-md border border-orange-100 shadow-sm mb-8">
                        <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                        >
                            <Route size={16} className="text-orange-500" />
                        </motion.div>
                        <span className="text-xs font-bold text-slate-600">
                            검증된 여행 루트 <span className="text-orange-600">1,200+</span>
                        </span>
                    </div>

                    {/* 메인 타이틀 - Standard gradient */}
                    <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight mb-8">
                        당신의 다음 계절은 <br />
                        <span className="text-transparent bg-clip-text" style={{ backgroundImage: theme.colors.gradients.brand }}>
                            어디인가요?
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-slate-600 font-medium max-w-2xl mx-auto mb-12">
                        실제 여행자들이 다녀온 검증된 루트를 둘러보고, <br />
                        클릭 한 번으로 내 플래너에 담아보세요. 🗺️✨
                    </p>

                    {/* 검색창 섹션 - Glassmorphism unified with CompanionHero */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="max-w-3xl mx-auto space-y-6"
                    >
                        <div className="bg-white/70 backdrop-blur-xl border border-white p-2 rounded-[32px] shadow-2xl flex flex-col md:flex-row items-center gap-2">
                            <div className="flex-1 flex items-center gap-3 px-6 py-4 w-full">
                                <MapPin size={20} className="text-orange-500" />
                                <input
                                    type="text"
                                    placeholder="어디로 떠나고 싶으신가요? (예: 파리, 제주, 발리)"
                                    className="bg-transparent border-none outline-none w-full text-slate-900 font-medium placeholder:text-slate-400"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onFocus={() => setIsSearchFocused(true)}
                                    onBlur={() => setIsSearchFocused(false)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery('')}
                                        className="text-slate-400 hover:text-slate-600 transition-colors"
                                    >
                                        <X size={18} />
                                    </button>
                                )}
                            </div>

                            <motion.button
                                onClick={handleSearch}
                                className="w-full md:w-auto px-10 py-4 rounded-full text-white font-bold shadow-lg hover:shadow-orange-500/30 transition-all flex items-center justify-center gap-2"
                                style={{ background: theme.colors.gradients.brand }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Search size={20} />
                                검색
                            </motion.button>
                        </div>

                        {/* 인기 검색 태그 */}
                        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-2">인기 검색</span>
                            {['#파리', '#제주', '#발리', '#도쿄', '#유럽배낭여행'].map((tag, index) => (
                                <motion.button
                                    key={tag}
                                    onClick={() => handleQuickTag(tag)}
                                    className="px-4 py-1.5 rounded-full bg-white/40 backdrop-blur-sm border border-white/50 text-xs font-medium text-slate-600 hover:bg-white hover:text-orange-500 transition-all shadow-sm"
                                    whileHover={{ y: -2 }}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 + index * 0.05 }}
                                >
                                    {tag}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};
