'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react'; // AnimatePresence는 이제 사용하지 않으므로 삭제
import { MapPin, Route } from 'lucide-react';
import { theme } from '@/app/components/design-system/constants';
import { UnifiedSearchBar } from '@/app/components/ui/UnifiedSearchBar';

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
            {/* Background Decor - Same as CommunityHero */}
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
                    {/* 상단 배지 */}
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

                    {/* 메인 타이틀 */}
                    <h1 className="text-3xl md:text-4xl font-black text-slate-900 leading-[1.2] tracking-tight mb-12">
                        어디로 떠날까? <br />
                        <span className="text-transparent bg-clip-text" style={{ backgroundImage: theme.colors.gradients.brand }}>
                            검증된 루트를 플래너에 담아보세요
                        </span>
                    </h1>

                    {/* 검색창 섹션 - Unified */}
                    <UnifiedSearchBar
                        fields={[
                            {
                                id: 'destination',
                                icon: <MapPin size={20} />,
                                placeholder: '어디로 떠나고 싶으신가요? (예: 파리, 제주, 발리)',
                                value: searchQuery,
                                onChange: setSearchQuery
                            }
                        ]}
                        onSearch={handleSearch}
                        className="max-w-3xl"
                    />
                </motion.div>
            </div>
        </section>
    );
};
