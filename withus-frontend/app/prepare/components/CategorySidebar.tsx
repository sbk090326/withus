'use client';

import React from 'react';
import { Home, Plane, Ticket, ShieldCheck, Smartphone, CheckCircle2, ChevronRight, BarChart3 } from 'lucide-react';
import { motion } from 'motion/react';
import { theme } from '@/app/components/design-system/constants';

const CATEGORIES = [
    { id: 'accomodation', label: '숙소 예약', icon: Home, color: 'text-orange-500', bg: 'bg-orange-50' },
    { id: 'flights', label: '항공권', icon: Plane, color: 'text-blue-500', bg: 'bg-blue-50' },
    { id: 'activity', label: '액티비티', icon: Ticket, color: 'text-teal-500', bg: 'bg-teal-50' },
    { id: 'insurance', label: '여행자 보험', icon: ShieldCheck, color: 'text-indigo-500', bg: 'bg-indigo-50' },
    { id: 'network', label: '유심/이심', icon: Smartphone, color: 'text-rose-500', bg: 'bg-rose-50' },
];

interface CategorySidebarProps {
    activeCategory: string;
    onCategoryChange: (id: string) => void;
    selectedTrip: any;
    progress: number;
    completedCount: number;
    totalCount: number;
    isHorizontal?: boolean;
}

export const CategorySidebar = ({
    activeCategory,
    onCategoryChange,
    selectedTrip,
    progress,
    completedCount,
    totalCount,
    isHorizontal = false
}: CategorySidebarProps) => {

    if (isHorizontal) {
        return (
            <div className="flex flex-col xl:flex-row items-center justify-between gap-6 w-full">
                {/* 🚀 프리미엄 퀵배너 (공간 최적화 수평 카테고리) */}
                <div className="flex items-center gap-1.5 p-1.5 bg-slate-50/50 rounded-[22px] border border-slate-100 shadow-inner overflow-x-auto scrollbar-hide w-full xl:w-auto">
                    {CATEGORIES.map((cat) => {
                        const Icon = cat.icon;
                        const isActive = activeCategory === cat.id;
                        return (
                            <button
                                key={cat.id}
                                onClick={() => onCategoryChange(cat.id)}
                                className={`relative flex items-center gap-2.5 px-4.5 py-3 rounded-[18px] transition-all duration-500 shrink-0 group ${isActive
                                    ? 'text-white'
                                    : 'text-slate-500 hover:text-slate-900 hover:bg-white/50'
                                    }`}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="activeCategoryBG_Horizontal"
                                        className="absolute inset-0 rounded-[18px] shadow-lg shadow-orange-500/20"
                                        style={{ background: theme.colors.gradients.brand }}
                                        transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}
                                    />
                                )}
                                <div className="relative z-10 flex items-center gap-2.5">
                                    <div className={`p-1 rounded-lg transition-transform duration-500 ${isActive ? 'bg-white/20' : 'bg-transparent group-hover:scale-110'}`}>
                                        <Icon size={16} className={isActive ? 'text-white' : cat.color} />
                                    </div>
                                    <span className="font-black text-[13.5px] tracking-tight whitespace-nowrap">
                                        {cat.label}
                                    </span>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 sticky top-32">
            {/* 📍 프리미엄 사이드 배너 (공간 최적화) */}
            <div className="bg-white/90 backdrop-blur-2xl rounded-[32px] p-7 border border-white shadow-xl shadow-slate-200/30 space-y-6">
                <div className="space-y-1 px-1">
                    <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                        <span className="text-[10px] font-black text-orange-500 uppercase tracking-[0.2em]">Category</span>
                    </div>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">준비 항목</h3>
                </div>

                <nav className="flex flex-col gap-1.5">
                    {CATEGORIES.map((cat) => {
                        const Icon = cat.icon;
                        const isActive = activeCategory === cat.id;
                        return (
                            <button
                                key={cat.id}
                                onClick={() => onCategoryChange(cat.id)}
                                className={`relative w-full flex items-center justify-between px-5 py-3.5 rounded-[20px] transition-all duration-500 group ${isActive
                                    ? 'text-white'
                                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                                    }`}
                            >
                                <div className="flex items-center gap-4 relative z-10">
                                    <div className={`w-10 h-10 rounded-1.5xl flex items-center justify-center transition-all duration-500 ${isActive ? 'bg-white/20 shadow-inner' : cat.bg}`}>
                                        <Icon size={18} className={isActive ? 'text-white' : cat.color} />
                                    </div>
                                    <div className="flex flex-col items-start translate-y-[0.5px]">
                                        <span className="font-black text-[14px] tracking-tight">{cat.label}</span>
                                        {!isActive && <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider group-hover:text-slate-500 transition-colors">보기</span>}
                                    </div>
                                </div>
                                {isActive && (
                                    <motion.div
                                        layoutId="activeCategoryTab_Vertical"
                                        className="absolute inset-0 rounded-[20px] shadow-lg shadow-orange-500/20"
                                        style={{ background: theme.colors.gradients.brand }}
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.7 }}
                                    />
                                )}
                                {isActive && (
                                    <div className="relative z-10 w-7 h-7 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
                                        <ChevronRight size={16} className="text-white" />
                                    </div>
                                )}
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* 준비 요약 박스 (슬림화) */}
            <div className="bg-white/80 backdrop-blur-xl rounded-[32px] p-6 border border-white shadow-lg shadow-slate-200/20 space-y-6 relative overflow-hidden group transition-all hover:bg-white">
                <div className="relative z-10 space-y-5">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-[9px] font-black text-teal-600 uppercase tracking-[0.2em] flex items-center gap-2">
                                <BarChart3 size={14} />
                                준비 현황
                            </span>
                            <span className="text-[13px] font-black text-slate-900">{progress}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                className="h-full rounded-full"
                                style={{ background: theme.colors.gradients.brand }}
                            />
                        </div>
                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100/50">
                            <p className="text-[12px] font-bold text-slate-600 leading-relaxed">
                                <span className="text-slate-900 font-black">{selectedTrip.title}</span><br />
                                {totalCount}개 중 {completedCount}개 완료!
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-bold text-slate-400">
                        동행과 실시간 공유 중
                        <CheckCircle2 size={12} className="text-teal-500" />
                    </div>
                </div>
            </div>
        </div>
    );
};
