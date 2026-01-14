'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, Map, Flame, Waves, Mountain, Building2, Landmark, Sparkles, MapPin, Users, TrendingUp } from 'lucide-react';
import { colors, spacing } from '@/app/components/design-system/constants';

interface Destination {
    id: string;
    name: string;
    region: string;
    themes: string[];
    gradient: string;
    icon: string;
    travelers: string;
    trending?: boolean;
}

const destinations: Destination[] = [
    { id: '1', name: '제주도', region: '제주도', themes: ['바다', '자연'], gradient: 'from-blue-400 to-cyan-300', icon: '🏝️', travelers: '3.2k', trending: true },
    { id: '2', name: '강릉', region: '강원권', themes: ['바다', '자연'], gradient: 'from-emerald-400 to-teal-300', icon: '🏖️', travelers: '2.1k', trending: true },
    { id: '3', name: '부산', region: '영남권', themes: ['바다', '도시'], gradient: 'from-orange-400 to-pink-400', icon: '🌃', travelers: '1.8k' },
    { id: '4', name: '여수', region: '호남권', themes: ['바다', '자연'], gradient: 'from-purple-400 to-pink-300', icon: '🌅', travelers: '1.5k' },
    { id: '5', name: '경주', region: '영남권', themes: ['문화', '역사'], gradient: 'from-amber-400 to-orange-300', icon: '🏛️', travelers: '1.3k' },
    { id: '6', name: '전주', region: '호남권', themes: ['문화', '음식'], gradient: 'from-red-400 to-orange-400', icon: '🍜', travelers: '1.2k' },
    { id: '7', name: '속초', region: '강원권', themes: ['바다', '산'], gradient: 'from-sky-400 to-blue-300', icon: '🏖️', travelers: '1.1k' },
    { id: '8', name: '평창', region: '강원권', themes: ['산', '자연'], gradient: 'from-indigo-400 to-purple-300', icon: '⛷️', travelers: '980' },
    { id: '9', name: '서울', region: '수도권', themes: ['도시', '문화'], gradient: 'from-slate-400 to-gray-300', icon: '🏙️', travelers: '2.5k' },
    { id: '10', name: '인천', region: '수도권', themes: ['도시', '바다'], gradient: 'from-cyan-400 to-blue-400', icon: '✈️', travelers: '890' },
    { id: '11', name: '대전', region: '충청권', themes: ['도시', '자연'], gradient: 'from-green-400 to-emerald-300', icon: '🌳', travelers: '750' },
    { id: '12', name: '대구', region: '영남권', themes: ['도시', '문화'], gradient: 'from-rose-400 to-pink-300', icon: '🎭', travelers: '820' },
];

const DestinationCard = ({ destination, index }: { destination: Destination; index: number }) => (
    <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        className="group relative overflow-hidden rounded-2xl cursor-pointer h-40"
        whileHover={{ scale: 1.02, y: -4 }}
    >
        {/* Gradient Background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${destination.gradient} opacity-90 group-hover:opacity-100 transition-opacity`} />

        {/* Content */}
        <div className="relative h-full p-5 flex flex-col justify-between text-white">
            {/* Top: Icon & Trending Badge */}
            <div className="flex items-start justify-between">
                <span className="text-4xl drop-shadow-lg">{destination.icon}</span>
                {destination.trending && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full"
                    >
                        <TrendingUp size={12} />
                        <span className="text-[10px] font-bold uppercase">Hot</span>
                    </motion.div>
                )}
            </div>

            {/* Bottom: Name & Stats */}
            <div>
                <h4 className="text-2xl font-bold mb-2 drop-shadow-md">{destination.name}</h4>
                <div className="flex items-center gap-3 text-sm">
                    <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                        <Users size={12} />
                        <span className="text-xs font-semibold">{destination.travelers}</span>
                    </div>
                    <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                        <MapPin size={12} />
                        <span className="text-xs">{destination.region}</span>
                    </div>
                </div>
            </div>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
    </motion.div>
);

const FilterButton = ({
    label,
    isActive,
    onClick,
    icon
}: {
    label: string;
    isActive: boolean;
    onClick: () => void;
    icon?: React.ReactNode;
}) => (
    <button
        onClick={onClick}
        className={`w-full text-left px-4 py-2.5 rounded-lg transition-all flex items-center gap-2 ${isActive
                ? 'bg-[#FF7E5F] text-white shadow-md'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
    >
        {icon}
        <span className="font-medium">{label}</span>
    </button>
);

export function RegionQuickExploreSection() {
    const [selectedRegion, setSelectedRegion] = useState<string>('전체');
    const [selectedTheme, setSelectedTheme] = useState<string>('전체');

    const regions = ['전체', '수도권', '강원권', '충청권', '호남권', '영남권', '제주도'];
    const themes = [
        { label: '전체', icon: <Sparkles size={16} /> },
        { label: '바다', icon: <Waves size={16} /> },
        { label: '산', icon: <Mountain size={16} /> },
        { label: '도시', icon: <Building2 size={16} /> },
        { label: '문화', icon: <Landmark size={16} /> },
    ];

    const filteredDestinations = destinations.filter(dest => {
        const regionMatch = selectedRegion === '전체' || dest.region === selectedRegion;
        const themeMatch = selectedTheme === '전체' || dest.themes.includes(selectedTheme);
        return regionMatch && themeMatch;
    });

    return (
        <section className={`w-full ${spacing.section.py} bg-[#FDFCFB] relative z-10`}>
            <div className={`max-w-[1400px] mx-auto ${spacing.section.px}`}>
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center justify-center p-3 mb-6 bg-white rounded-full shadow-md text-[#FF7E5F]">
                        <Globe size={24} />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
                        다음 여행지는 어디인가요?
                    </h2>
                    <p className="text-slate-600">
                        권역별 인기 여행지와 핫한 관광지를 빠르게 찾아보세요.
                    </p>
                </motion.div>

                {/* Main Content: Sidebar + Grid */}
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Sidebar - Filters */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:w-64 flex-shrink-0"
                    >
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 sticky top-24">
                            {/* Region Filter */}
                            <div className="mb-8">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-2">
                                    <Map size={16} /> 권역별
                                </h3>
                                <div className="space-y-2">
                                    {regions.map((region) => (
                                        <FilterButton
                                            key={region}
                                            label={region}
                                            isActive={selectedRegion === region}
                                            onClick={() => setSelectedRegion(region)}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Theme Filter */}
                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-2">
                                    <Flame size={16} /> 테마별
                                </h3>
                                <div className="space-y-2">
                                    {themes.map((theme) => (
                                        <FilterButton
                                            key={theme.label}
                                            label={theme.label}
                                            isActive={selectedTheme === theme.label}
                                            onClick={() => setSelectedTheme(theme.label)}
                                            icon={theme.icon}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Active Filters Display */}
                            {(selectedRegion !== '전체' || selectedTheme !== '전체') && (
                                <div className="mt-6 pt-6 border-t border-slate-100">
                                    <button
                                        onClick={() => {
                                            setSelectedRegion('전체');
                                            setSelectedTheme('전체');
                                        }}
                                        className="text-sm text-[#FF7E5F] hover:underline font-medium"
                                    >
                                        필터 초기화
                                    </button>
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {/* Right Grid - Destination Cards */}
                    <div className="flex-1">
                        <div className="mb-4 flex items-center justify-between">
                            <p className="text-sm text-slate-600">
                                <span className="font-bold text-slate-900">{filteredDestinations.length}개</span>의 여행지
                            </p>
                        </div>

                        <motion.div
                            layout
                            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
                        >
                            <AnimatePresence mode="popLayout">
                                {filteredDestinations.map((dest, index) => (
                                    <DestinationCard
                                        key={dest.id}
                                        destination={dest}
                                        index={index}
                                    />
                                ))}
                            </AnimatePresence>
                        </motion.div>

                        {filteredDestinations.length === 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-20"
                            >
                                <div className="text-6xl mb-4">🔍</div>
                                <p className="text-slate-500 text-lg">해당 조건의 여행지가 없습니다.</p>
                                <button
                                    onClick={() => {
                                        setSelectedRegion('전체');
                                        setSelectedTheme('전체');
                                    }}
                                    className="mt-4 text-[#FF7E5F] hover:underline font-medium"
                                >
                                    필터 초기화
                                </button>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
