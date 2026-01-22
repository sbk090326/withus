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
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 w-full">
                {/* 수평 카테고리 탭 */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                    {CATEGORIES.map((cat) => {
                        const Icon = cat.icon;
                        const isActive = activeCategory === cat.id;
                        return (
                            <button
                                key={cat.id}
                                onClick={() => onCategoryChange(cat.id)}
                                className={`relative flex items-center gap-2.5 px-6 py-3 rounded-2xl transition-all duration-300 shrink-0 ${isActive
                                    ? 'text-white'
                                    : 'text-slate-500 hover:text-slate-900'
                                    }`}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="activeCategoryBG"
                                        className="absolute inset-0 bg-slate-900 rounded-2xl shadow-lg shadow-slate-900/20"
                                        transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                                    />
                                )}
                                <div className="relative z-10 flex items-center gap-2.5">
                                    <Icon size={16} className={isActive ? 'text-white' : cat.color} />
                                    <span className="font-black text-[13px] tracking-tight whitespace-nowrap">
                                        {cat.label}
                                    </span>
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* 슬림 준비 현황 배지 */}
                <div className="flex items-center gap-4 bg-teal-50/50 px-5 py-3 rounded-2xl border border-teal-100/50 shrink-0">
                    <div className="flex flex-col items-end">
                        <span className="text-[9px] font-black text-teal-600 uppercase tracking-widest leading-none">준비 현황</span>
                        <span className="text-[13px] font-black text-slate-900 leading-tight">{progress}% 완료</span>
                    </div>
                    <div className="w-12 h-12 rounded-full border-[3px] border-teal-100 flex items-center justify-center relative">
                        <svg className="w-full h-full -rotate-90">
                            <circle
                                cx="24" cy="24" r="20"
                                fill="transparent"
                                stroke="currentColor"
                                strokeWidth="3"
                                className="text-teal-200/30"
                            />
                            <motion.circle
                                cx="24" cy="24" r="20"
                                fill="transparent"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeDasharray={125.6}
                                initial={{ strokeDashoffset: 125.6 }}
                                animate={{ strokeDashoffset: 125.6 * (1 - progress / 100) }}
                                className="text-teal-500"
                            />
                        </svg>
                        <BarChart3 size={14} className="absolute text-teal-600" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 sticky top-32">
            {/* 기존 수직 레이아웃 유지 */}
            <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm space-y-9">
                <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-orange-500 uppercase tracking-[0.3em] block">카테고리</span>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">준비 항목</h3>
                </div>

                <div className="flex flex-col gap-1">
                    {CATEGORIES.map((cat) => {
                        const Icon = cat.icon;
                        const isActive = activeCategory === cat.id;
                        return (
                            <button
                                key={cat.id}
                                onClick={() => onCategoryChange(cat.id)}
                                className={`relative w-full flex items-center justify-between px-5 py-4.5 rounded-2xl transition-all duration-300 group ${isActive
                                    ? 'text-white'
                                    : 'text-slate-500 hover:text-slate-900'
                                    }`}
                            >
                                <div className="flex items-center gap-4 relative z-10">
                                    <div className={`p-2.5 rounded-xl transition-colors ${isActive ? 'bg-white/20' : cat.bg}`}>
                                        <Icon size={18} className={isActive ? 'text-white' : cat.color} />
                                    </div>
                                    <span className="font-bold text-[14px] tracking-tight">
                                        {cat.label}
                                    </span>
                                </div>
                                {isActive && (
                                    <motion.div
                                        layoutId="activeCategoryTab"
                                        className="absolute inset-0 bg-slate-900 rounded-2xl shadow-xl shadow-slate-900/20"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                {isActive && (
                                    <CheckCircle2 size={16} className="relative z-10 text-orange-400" />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* 준비 요약 박스 (내 여행 데이터와 100% 연동) */}
            <div className="bg-slate-50/50 rounded-[32px] p-8 border border-slate-100 space-y-8 relative overflow-hidden group transition-all hover:bg-white hover:shadow-xl hover:shadow-slate-200/20">
                <div className="relative z-10 space-y-6">
                    <div className="space-y-5">
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-teal-600 uppercase tracking-[0.3em] flex items-center gap-2">
                                <BarChart3 size={14} />
                                실시간 준비 현황
                            </span>
                            <span className="text-[14px] font-black text-slate-900">{progress}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-200/50 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                className="h-full rounded-full"
                                style={{ background: theme.colors.gradients.brand }}
                            />
                        </div>
                        <div className="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm">
                            <p className="text-[13px] font-bold text-slate-600 leading-relaxed">
                                <span className="text-slate-900 font-black">{selectedTrip.title}</span><br />
                                총 {totalCount}개의 준비물 중 {completedCount}개를 완료했습니다!
                            </p>
                            <p className="text-[11px] font-bold text-teal-600 mt-2">
                                * 우측 공동 체크리스트에서 관리 가능
                            </p>
                        </div>
                    </div>

                    <div className="pt-2">
                        <div className="flex items-center justify-between text-[11px] font-bold text-slate-400">
                            동행과 실시간으로 공유되고 있어요
                            <CheckCircle2 size={12} className="text-teal-500" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
