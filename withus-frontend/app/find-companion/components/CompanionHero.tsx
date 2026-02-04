'use client';

import React from 'react';
import { motion } from 'motion/react';
import { palette } from '@/app/components/design-system/constants';
import { MapPin, Calendar } from 'lucide-react';
import { UnifiedSearchBar } from '@/app/components/ui/UnifiedSearchBar';

export const CompanionHero = () => {
    const [searchValues, setSearchValues] = React.useState({
        location: '',
        date: ''
    });

    const handleInputChange = (field: string, value: string) => {
        setSearchValues(prev => ({ ...prev, [field]: value }));
    };

    return (
        <section className="relative w-full pt-16 pb-20 px-6 overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: 'url(/travel-companions-hero.png)' }}
            />

            {/* Dark Overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/50 to-slate-900/70" />

            <div className="max-w-[1400px] mx-auto relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Live Counter Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-white/50 shadow-lg mb-4">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                        </span>
                        <span className="text-xs font-bold text-slate-700">
                            현재 <span className="text-orange-600">128명</span>의 여행자가 함께 보고 있어요
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-extrabold mb-6 tracking-tight text-white drop-shadow-lg">
                        <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(to right, #fbbf24, #f97316)' }}>
                            완벽한 여행 메이트
                        </span>
                        를 찾아보세요
                    </h1>
                </motion.div>

                {/* Search Bar - Unified */}
                <UnifiedSearchBar
                    fields={[
                        {
                            id: 'location',
                            icon: <MapPin size={20} />,
                            placeholder: '어디로 떠나시나요?',
                            value: searchValues.location,
                            onChange: (val) => handleInputChange('location', val)
                        },
                        {
                            id: 'dates',
                            icon: <Calendar size={20} />,
                            placeholder: '언제 떠나시나요?',
                            value: searchValues.date,
                            onChange: (val) => handleInputChange('date', val),
                            type: 'text'
                        }
                    ]}
                    onSearch={() => console.log('Searching for:', searchValues)}
                    buttonText="찾기"
                    className="max-w-4xl"
                />


                {/* 인기 검색 태그 */}
                <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
                    <span className="text-xs font-bold text-white/70 uppercase tracking-widest mr-2">인기 검색</span>
                    {['#파리에펠탑', '#제주한달살기', '#서핑클래스', '#유럽배낭여행', '#맛집탐방'].map((tag) => (
                        <button
                            key={tag}
                            className="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-xs font-medium text-white hover:bg-white hover:text-orange-500 transition-all shadow-sm"
                        >
                            {tag}
                        </button>
                    ))}
                </div>

            </div>
        </section>
    );
};
