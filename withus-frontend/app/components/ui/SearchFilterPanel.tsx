'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface FilterGroup {
    id: string;
    label: string;
    type: 'range' | 'chips' | 'tags';
    options?: string[];
    currentValue?: any;
}

interface SearchFilterPanelProps {
    isOpen: boolean;
    groups?: FilterGroup[];
    className?: string;
}

/**
 * SearchFilterPanel - V4.8 Common UI Component
 * Extracted from Prepare page's SearchSection as requested by user.
 */
export const SearchFilterPanel = ({ isOpen, groups, className = "" }: SearchFilterPanelProps) => {
    // If no groups provided, use default ones from the "most liked" version
    const filterGroups = groups || [
        {
            id: 'price',
            label: '가격 범위',
            type: 'range'
        },
        {
            id: 'sort',
            label: '정렬 기준',
            type: 'chips',
            options: ['평점순', '낮은가격순', '추천순']
        },
        {
            id: 'extra',
            label: '추가 조건',
            type: 'chips',
            options: ['무료취소', '조식포함', '직항']
        }
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className={`overflow-hidden ${className}`}
                >
                    <div className="p-6 md:p-8 rounded-[32px] bg-slate-50 border border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-8 shadow-inner mb-6 mt-2">
                        {filterGroups.map((group) => (
                            <div key={group.id} className="space-y-4">
                                <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                    {group.label}
                                </h5>

                                {group.type === 'range' ? (
                                    <div className="pt-2">
                                        <div className="h-1.5 bg-slate-200 rounded-full relative">
                                            <div className="absolute left-[20%] right-[30%] h-full bg-orange-500 rounded-full" />
                                            {/* Handles */}
                                            <div className="absolute left-[20%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-orange-500 rounded-full shadow-sm cursor-pointer" />
                                            <div className="absolute right-[30%] top-1/2 translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-orange-500 rounded-full shadow-sm cursor-pointer" />
                                        </div>
                                        <div className="flex justify-between mt-3 text-[11px] font-bold text-slate-500">
                                            <span>최저가</span>
                                            <span>최고가</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-wrap gap-2">
                                        {group.options?.map((option) => (
                                            <button
                                                key={option}
                                                className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-[12px] font-bold text-slate-600 hover:border-orange-500 hover:text-orange-500 transition-all hover:shadow-sm"
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
