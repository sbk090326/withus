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
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-2">인기 검색</span>
                    {['#파리에펠탑', '#제주한달살기', '#서핑클래스', '#유럽배낭여행', '#맛집탐방'].map((tag) => (
                        <button
                            key={tag}
                            className="px-4 py-1.5 rounded-full bg-white/40 backdrop-blur-sm border border-white/50 text-xs font-medium text-slate-600 hover:bg-white hover:text-orange-500 transition-all shadow-sm"
                        >
                            {tag}
                        </button>
                    ))}
                </div>

            </div>
        </section>
    );
};
