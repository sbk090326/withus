'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, MapPin, Navigation, BookOpen, ArrowRight, Star, Palmtree, Building2, Mountain, Utensils } from 'lucide-react';
import { palette, theme } from '@/app/components/design-system/constants';
import { GuideDetailModal } from './GuideDetailModal';

const guideThemes = [
    { id: 'all', label: '전체', icon: ShieldCheck },
    { id: 'healing', label: '힐링', icon: Palmtree },
    { id: 'city', label: '시티 투어', icon: Building2 },
    { id: 'nature', label: '자연/명소', icon: Mountain },
    { id: 'food', label: '로컬 맛집', icon: Utensils }
];

const officialGuides = [
    {
        id: 1,
        theme: 'city',
        title: "파리 첫 방문자를 위한 72시간 완벽 가이드",
        category: "City Guide",
        location: "프랑스, 파리",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=800",
        rating: 5.0,
        reviews: 1250,
        highlights: ["루브르 도슨트 투어", "센느강 디너 크루즈", "몽마르트르 숨은 골목"],
        author: "WithUs Official"
    },
    {
        id: 2,
        theme: 'food',
        title: "방콕 로컬 맛집 & 시티 투어 바이블",
        category: "Foodie Guide",
        location: "태국, 방콕",
        image: "https://images.unsplash.com/photo-1563492065538-4e8929e74bb3?auto=format&fit=crop&q=80&w=800",
        rating: 4.9,
        reviews: 840,
        highlights: ["아이콘시암 셔틀 꿀팁", "미슐랭 팟타이 지도", "루프탑 바 베스트 5"],
        author: "WithUs Official"
    },
    {
        id: 3,
        theme: 'city',
        title: "도쿄 MZ세대 핫플레이스 쇼핑 루트",
        category: "Trend Guide",
        location: "일본, 도쿄",
        image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80&w=800",
        rating: 4.9,
        reviews: 2100,
        highlights: ["시부야 스카이 예약법", "하라주쿠 편집숍 리스트", "긴자 한정판 투어"],
        author: "WithUs Official"
    },
    {
        id: 4,
        theme: 'healing',
        title: "발리 우붓 정글 속에서의 완전한 휴식",
        category: "Healing Guide",
        location: "인도네시아, 발리",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800",
        rating: 4.8,
        reviews: 920,
        highlights: ["뜨갈랑랑 논뷰 투어", "우붓 요가 클래스", "정글 스파 베스트 3"],
        author: "WithUs Official"
    },
    {
        id: 5,
        theme: 'nature',
        title: "아이슬란드 오로라 & 링로드 완전 정복",
        category: "Nature Guide",
        location: "아이슬란드",
        image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&q=80&w=800",
        rating: 5.0,
        reviews: 1560,
        highlights: ["골든서클 드라이브 코스", "오로라 관측 명소", "블루라군 예약 팁"],
        author: "WithUs Official"
    }
];

export const OfficialGuides = () => {
    const [activeTheme, setActiveTheme] = useState('all');
    const [selectedGuide, setSelectedGuide] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openGuide = (guide: any) => {
        setSelectedGuide(guide);
        setIsModalOpen(true);
    };

    const filteredGuides = activeTheme === 'all'
        ? officialGuides
        : officialGuides.filter(guide => guide.theme === activeTheme);

    return (
        <section className="w-full py-32 px-6 overflow-hidden relative" style={{ backgroundColor: palette.cream.base }}>
            {/* Decorative Background */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-orange-200/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-100/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

            <div className="max-w-[1400px] mx-auto relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <div className="space-y-4">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-2 text-orange-500"
                        >
                            <ShieldCheck size={20} className="fill-orange-500/10" />
                            <span className="text-xs font-black uppercase tracking-[0.3em]">WithUs Editorial</span>
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter"
                        >
                            WithUs가 직접 큐레이션한 <br />
                            <span className="text-transparent bg-clip-text" style={{ backgroundImage: theme.colors.gradients.brand }}>공식 여행 가이드</span>
                        </motion.h2>
                    </div>

                    {/* Theme Filters */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide shrink-0">
                        {guideThemes.map((theme) => {
                            const Icon = theme.icon;
                            return (
                                <button
                                    key={theme.id}
                                    onClick={() => setActiveTheme(theme.id)}
                                    className={`flex items-center gap-2 px-6 py-3.5 rounded-2xl whitespace-nowrap transition-all border font-black text-xs ${activeTheme === theme.id
                                        ? 'bg-slate-900 border-slate-900 text-white shadow-xl shadow-slate-900/10'
                                        : 'bg-white border-slate-100 text-slate-400 hover:border-slate-300 hover:text-slate-600 shadow-sm'
                                        }`}
                                >
                                    <Icon size={14} />
                                    {theme.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Guides Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 min-h-[500px]">
                    <AnimatePresence mode="popLayout">
                        {filteredGuides.map((guide, index) => (
                            <motion.div
                                key={guide.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                whileHover={{ y: -10 }}
                                className="group relative bg-white rounded-[2.5rem] border border-slate-50 overflow-hidden flex flex-col h-full shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(249,115,22,0.08)] transition-all duration-500"
                            >
                                {/* Image Section */}
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        src={guide.image}
                                        alt={guide.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />

                                    <div className="absolute top-6 left-6 px-4 py-2 rounded-2xl bg-white/95 backdrop-blur-md border border-white text-slate-900 text-[10px] font-black uppercase tracking-widest shadow-sm">
                                        {guide.category}
                                    </div>

                                    <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-white">
                                            <MapPin size={14} className="text-orange-400" strokeWidth={3} />
                                            <span className="text-xs font-black tracking-tight">{guide.location}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-500 text-white text-[10px] font-black shadow-lg">
                                            <Star size={12} fill="currentColor" />
                                            {guide.rating}
                                        </div>
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="p-8 flex-1 flex flex-col justify-between space-y-8">
                                    <div className="space-y-4">
                                        <h3 className="text-xl md:text-2xl font-black text-slate-900 leading-tight tracking-tighter group-hover:text-orange-500 transition-colors">
                                            {guide.title}
                                        </h3>

                                        <div className="space-y-3">
                                            {guide.highlights.map((item, i) => (
                                                <div key={i} className="flex items-center gap-2.5 text-slate-500">
                                                    <div className="w-1 h-1 rounded-full bg-orange-500" />
                                                    <span className="text-[13px] font-bold tracking-tight">{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => openGuide(guide)}
                                        className="w-full py-4 rounded-2xl bg-slate-50 text-slate-900 text-sm font-black flex items-center justify-center gap-2 hover:bg-slate-900 hover:text-white transition-all group/btn shadow-sm active:scale-95 border border-slate-100"
                                    >
                                        <BookOpen size={18} />
                                        전체 가이드 읽기
                                        <ArrowRight size={16} className="ml-1 transition-transform group-hover/btn:translate-x-1" />
                                    </button>
                                </div>

                                {/* Official Badge Decor */}
                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="w-10 h-10 rounded-full bg-white border border-orange-100 flex items-center justify-center text-orange-500 shadow-xl">
                                        <ShieldCheck size={20} className="fill-orange-100" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                <GuideDetailModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    guide={selectedGuide}
                />
            </div>
        </section>
    );
};
