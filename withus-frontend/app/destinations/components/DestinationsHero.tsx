'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, MapPin, Calendar, Sparkles, X, SlidersHorizontal } from 'lucide-react';
import { palette, theme } from '@/app/components/design-system/constants';

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
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-teal-50" />

            {/* Floating Orbs with Animation */}
            <motion.div
                className="absolute top-20 right-20 w-[400px] h-[400px] bg-orange-200/30 rounded-full blur-[100px]"
                animate={{
                    scale: [1, 1.2, 1],
                    x: [0, 50, 0],
                    y: [0, -30, 0]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute bottom-20 left-20 w-[500px] h-[500px] bg-teal-100/40 rounded-full blur-[120px]"
                animate={{
                    scale: [1, 1.1, 1],
                    x: [0, -40, 0],
                    y: [0, 40, 0]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-pink-100/20 rounded-full blur-[80px]"
                animate={{
                    scale: [1, 1.3, 1],
                    rotate: [0, 180, 360]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />

            <div className="max-w-[1200px] mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center space-y-8"
                >
                    {/* Animated Badge */}
                    <motion.div
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-orange-100 shadow-lg"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400 }}
                    >
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        >
                            <Sparkles size={16} className="text-orange-500" fill="currentColor" />
                        </motion.div>
                        <span className="text-sm font-bold text-slate-700">검증된 여행 루트 1,200+</span>
                    </motion.div>

                    {/* Headline with Gradient Animation */}
                    <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight">
                        당신의 다음 계절은 <br />
                        <motion.span
                            className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-orange-500 bg-[length:200%_auto]"
                            animate={{ backgroundPosition: ['0% center', '100% center', '0% center'] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                        >
                            어디인가요?
                        </motion.span>
                    </h1>

                    <p className="text-lg md:text-xl text-slate-600 font-medium max-w-2xl mx-auto">
                        실제 여행자들이 다녀온 검증된 루트를 둘러보고, <br />
                        클릭 한 번으로 내 플래너에 담아보세요. 🗺️✨
                    </p>

                    {/* Enhanced Search Bar */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="max-w-3xl mx-auto"
                    >
                        <motion.div
                            className="bg-white p-2 rounded-[32px] border-2 flex items-center gap-2 relative overflow-hidden"
                            animate={{
                                borderColor: isSearchFocused ? '#f97316' : '#f1f5f9',
                                boxShadow: isSearchFocused
                                    ? '0 20px 60px -15px rgba(249, 115, 22, 0.3)'
                                    : '0 20px 40px -15px rgba(0, 0, 0, 0.1)'
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* Animated Border Glow */}
                            <AnimatePresence>
                                {isSearchFocused && (
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-orange-500 via-pink-500 to-orange-500 opacity-20 blur-xl"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 0.2 }}
                                        exit={{ opacity: 0 }}
                                    />
                                )}
                            </AnimatePresence>

                            <div className="flex-1 flex items-center gap-3 px-6 py-4 relative z-10">
                                <MapPin size={20} className="text-orange-500" />
                                <input
                                    type="text"
                                    placeholder="어디로 떠나고 싶으신가요? (예: 파리, 제주, 발리)"
                                    className="bg-transparent border-none outline-none w-full text-slate-900 font-medium placeholder:text-slate-400"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onFocus={() => setIsSearchFocused(true)}
                                    onBlur={() => setIsSearchFocused(false)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                />
                                {searchQuery && (
                                    <motion.button
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        onClick={() => setSearchQuery('')}
                                        className="text-slate-400 hover:text-slate-600 transition-colors"
                                    >
                                        <X size={18} />
                                    </motion.button>
                                )}
                            </div>

                            <motion.button
                                onClick={handleSearch}
                                className="px-10 py-4 rounded-full text-white font-bold shadow-lg flex items-center gap-2 relative z-10"
                                style={{ background: theme.colors.gradients.brand }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Search size={20} />
                                검색
                            </motion.button>
                        </motion.div>

                        {/* Quick Tags with Hover Effects */}
                        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">인기 검색</span>
                            {['#파리', '#제주', '#발리', '#도쿄', '#유럽배낭여행'].map((tag, index) => (
                                <motion.button
                                    key={tag}
                                    onClick={() => handleQuickTag(tag)}
                                    className="px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-slate-100 text-sm font-medium text-slate-600 shadow-sm relative overflow-hidden group"
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 + index * 0.05 }}
                                >
                                    <span className="relative z-10 group-hover:text-orange-600 transition-colors">{tag}</span>
                                    <motion.div
                                        className="absolute inset-0 bg-orange-50"
                                        initial={{ scale: 0, opacity: 0 }}
                                        whileHover={{ scale: 1, opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};
