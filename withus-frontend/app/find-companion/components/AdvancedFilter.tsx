'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, RotateCcw } from 'lucide-react';

interface AdvancedFilterProps {
    isOpen: boolean;
    filters: any;
    setFilters: (filters: any) => void;
}

/**
 * AdvancedFilter - FindCompanion specialized horizontal filter panel
 * Styled to match the Prepare page's filter as requested.
 */
export const AdvancedFilter = ({ isOpen, filters, setFilters }: AdvancedFilterProps) => {
    const filterOptions = {
        gender: ['전체', '남성만', '여성만', '성별 무관'],
        age: ['전체', '20대', '30대', '40대 이상'],
        style: ['액티비티', '휴양', '맛집', '문화/예술', '캠핑', '쇼핑'],
    };

    const toggleStyle = (style: string) => {
        const newStyles = filters.style.includes(style)
            ? filters.style.filter((s: string) => s !== style)
            : [...filters.style, style];
        setFilters({ ...filters, style: newStyles });
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden w-full"
                >
                    <div className="p-7 md:p-9 rounded-[32px] bg-white border border-slate-100 grid grid-cols-1 md:grid-cols-4 gap-8 shadow-2xl shadow-slate-200/20 mb-10 mt-2 relative overflow-hidden group">
                        {/* 배경 장식 */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50/50 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

                        {/* Gender */}
                        <div className="space-y-4 relative z-10">
                            <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">선호 성별</h5>
                            <div className="flex flex-wrap gap-2">
                                {filterOptions.gender.map((opt) => (
                                    <button
                                        key={opt}
                                        onClick={() => setFilters({ ...filters, gender: opt })}
                                        className={`px-4 py-2 rounded-xl text-[12px] font-bold transition-all border ${filters.gender === opt
                                                ? 'bg-orange-500 border-orange-500 text-white shadow-md shadow-orange-500/20'
                                                : 'bg-slate-50 border-transparent text-slate-500 hover:border-slate-200 hover:bg-white'
                                            }`}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Age */}
                        <div className="space-y-4 relative z-10">
                            <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">희망 연령대</h5>
                            <div className="flex flex-wrap gap-2">
                                {filterOptions.age.map((opt) => (
                                    <button
                                        key={opt}
                                        onClick={() => setFilters({ ...filters, age: opt })}
                                        className={`px-4 py-2 rounded-xl text-[12px] font-bold transition-all border ${filters.age === opt
                                                ? 'bg-pink-500 border-pink-500 text-white shadow-md shadow-pink-500/20'
                                                : 'bg-slate-50 border-transparent text-slate-500 hover:border-slate-200 hover:bg-white'
                                            }`}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Travel Style */}
                        <div className="md:col-span-2 space-y-4 relative z-10">
                            <div className="flex items-center justify-between">
                                <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">여행 스타일</h5>
                                <button
                                    onClick={() => setFilters({ ...filters, style: [], gender: '전체', age: '전체' })}
                                    className="text-[10px] font-bold text-slate-300 hover:text-orange-500 flex items-center gap-1 transition-colors"
                                >
                                    <RotateCcw size={10} />
                                    필터 초기화
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {filterOptions.style.map((opt) => (
                                    <button
                                        key={opt}
                                        onClick={() => toggleStyle(opt)}
                                        className={`px-4 py-2 rounded-xl text-[12px] font-bold transition-all border flex items-center gap-2 ${filters.style.includes(opt)
                                                ? 'bg-slate-900 border-slate-900 text-white shadow-md'
                                                : 'bg-slate-50 border-transparent text-slate-500 hover:border-slate-200 hover:bg-white'
                                            }`}
                                    >
                                        {filters.style.includes(opt) && <Check size={12} />}
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
