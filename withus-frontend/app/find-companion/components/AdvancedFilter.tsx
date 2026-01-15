'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, RotateCcw, Check } from 'lucide-react';
import { palette } from '@/app/components/design-system/constants';

interface AdvancedFilterProps {
    isOpen: boolean;
    onClose: () => void;
    filters: any;
    setFilters: (filters: any) => void;
}

export const AdvancedFilter = ({ isOpen, onClose, filters, setFilters }: AdvancedFilterProps) => {
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
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[2000]"
                    />
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full max-w-[400px] bg-white shadow-2xl z-[2001] flex flex-col"
                    >
                        <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                            <h2 className="text-2xl font-black text-slate-900">상세 필터</h2>
                            <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-full text-slate-400">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-8 space-y-10">
                            {/* Gender */}
                            <div>
                                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">선호 성별</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {filterOptions.gender.map((opt) => (
                                        <button
                                            key={opt}
                                            onClick={() => setFilters({ ...filters, gender: opt })}
                                            className={`py-3 rounded-2xl text-sm font-bold transition-all border ${filters.gender === opt
                                                ? 'bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/20'
                                                : 'bg-white border-slate-100 text-slate-500 hover:border-slate-200'
                                                }`}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Age */}
                            <div>
                                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">희망 연령대</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {filterOptions.age.map((opt) => (
                                        <button
                                            key={opt}
                                            onClick={() => setFilters({ ...filters, age: opt })}
                                            className={`py-3 rounded-2xl text-sm font-bold transition-all border ${filters.age === opt
                                                ? 'bg-pink-500 border-pink-500 text-white shadow-lg shadow-pink-500/20'
                                                : 'bg-white border-slate-100 text-slate-500 hover:border-slate-200'
                                                }`}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Smoking */}
                            <div>
                                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">흡연 여부</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {['전체', '비흡연자만'].map((opt) => (
                                        <button
                                            key={opt}
                                            onClick={() => setFilters({ ...filters, smoking: opt })}
                                            className={`py-3 rounded-2xl text-sm font-bold transition-all border ${filters.smoking === opt
                                                ? 'bg-slate-900 border-slate-900 text-white shadow-lg'
                                                : 'bg-white border-slate-100 text-slate-500 hover:border-slate-200'
                                                }`}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Travel Style */}
                            <div>
                                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">여행 스타일</h3>
                                <div className="flex flex-wrap gap-2">
                                    {filterOptions.style.map((opt) => (
                                        <button
                                            key={opt}
                                            onClick={() => toggleStyle(opt)}
                                            className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all border flex items-center gap-2 ${filters.style.includes(opt)
                                                ? 'bg-orange-500 border-orange-500 text-white'
                                                : 'bg-white border-slate-100 text-slate-500 hover:border-slate-200'
                                                }`}
                                        >
                                            {filters.style.includes(opt) && <Check size={14} />}
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="p-8 bg-white border-t border-slate-100 flex gap-4">
                            <button
                                onClick={() => setFilters({ gender: '전체', age: '전체', style: [] })}
                                className="flex-1 py-4 rounded-2xl border border-slate-200 text-slate-500 font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                            >
                                <RotateCcw size={18} />
                                초기화
                            </button>
                            <button
                                onClick={onClose}
                                className="flex-[2] py-4 rounded-2xl text-white font-bold shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
                                style={{ background: 'linear-gradient(to right, #f97316, #ec4899)' }}
                            >
                                적용하기
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
