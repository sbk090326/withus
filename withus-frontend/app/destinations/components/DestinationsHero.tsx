'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react'; // AnimatePresence는 이제 사용하지 않으므로 삭제
import { Search, MapPin, Sparkles, X } from 'lucide-react';
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
            {/* 배경 및 애니메이션 오브젝트 (기존과 동일) */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-teal-50" />

            <div className="max-w-[1200px] mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center space-y-8"
                >
                    {/* 상단 배지 */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-orange-100 shadow-lg">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        >
                            <Sparkles size={16} className="text-orange-500" fill="currentColor" />
                        </motion.div>
                        <span className="text-sm font-bold text-slate-700">검증된 여행 루트 1,200+</span>
                    </div>

                    {/* 메인 타이틀 */}
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

                    {/* 수정된 검색창 섹션 */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="max-w-3xl mx-auto"
                    >
                        <motion.div
                            className="bg-white p-2 rounded-[32px] border-2 flex items-center gap-2 relative transition-all"
                            animate={{
                                // 포커스 시 테두리 색상과 부드러운 그림자만 적용
                                borderColor: '#f1f5f9',
                                boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.05)'
                            }}
                        >
                            <div className="flex-1 flex items-center gap-3 px-6 py-4 relative z-10">
                                <MapPin size={20} className="text-orange-500" />
                                <input
                                    type="text"
                                    placeholder="어디로 떠나고 싶으신가요? (예: 파리, 제주, 발리)"
                                    // 핵심 수정: outline-none과 focus 관련 속성 제거
                                    className="bg-transparent border-none outline-none focus:outline-none focus:ring-0 w-full text-slate-900 font-medium placeholder:text-slate-400"
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
                                className="px-10 py-4 rounded-full text-white font-bold shadow-lg flex items-center gap-2 relative z-10"
                                style={{ background: theme.colors.gradients.brand }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Search size={20} />
                                검색
                            </motion.button>
                        </motion.div>

                        {/* 인기 검색 태그 (기존과 동일) */}
                        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">인기 검색</span>
                            {['#파리', '#제주', '#발리', '#도쿄', '#유럽배낭여행'].map((tag, index) => (
                                <motion.button
                                    key={tag}
                                    onClick={() => handleQuickTag(tag)}
                                    className="px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-slate-100 text-sm font-medium text-slate-600 shadow-sm overflow-hidden group relative"
                                    whileHover={{ y: -2 }}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 + index * 0.05 }}
                                >
                                    <span className="relative z-10 group-hover:text-orange-600 transition-colors">{tag}</span>
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};