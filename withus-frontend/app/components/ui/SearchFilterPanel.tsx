'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, RotateCcw } from 'lucide-react';

export interface FilterGroup {
    id: string;
    label: string;
    type: 'chips' | 'range' | 'single-select';
    options?: string[];
    activeColor?: 'orange' | 'pink' | 'teal' | 'slate' | 'indigo';
}

interface SearchFilterPanelProps {
    isOpen: boolean;
    groups: FilterGroup[];
    activeFilters: Record<string, any>;
    onFilterChange: (groupId: string, value: any) => void;
    onReset?: () => void;
    className?: string;
}

const COLOR_MAP = {
    orange: {
        bg: 'bg-orange-500',
        text: 'text-white',
        light: 'bg-orange-50',
        border: 'border-orange-200',
        shadow: 'shadow-orange-500/20',
        sub: 'text-orange-500'
    },
    pink: {
        bg: 'bg-pink-500',
        text: 'text-white',
        light: 'bg-pink-50',
        border: 'border-pink-200',
        shadow: 'shadow-pink-500/20',
        sub: 'text-pink-500'
    },
    teal: {
        bg: 'bg-teal-500',
        text: 'text-white',
        light: 'bg-teal-50',
        border: 'border-teal-200',
        shadow: 'shadow-teal-500/20',
        sub: 'text-teal-500'
    },
    slate: {
        bg: 'bg-slate-900',
        text: 'text-white',
        light: 'bg-slate-50',
        border: 'border-slate-200',
        shadow: 'shadow-slate-900/20',
        sub: 'text-slate-900'
    },
    indigo: {
        bg: 'bg-indigo-600',
        text: 'text-white',
        light: 'bg-indigo-50',
        border: 'border-indigo-200',
        shadow: 'shadow-indigo-600/20',
        sub: 'text-indigo-600'
    }
};

/**
 * SearchFilterPanel - Unified V4.9 Standard Filtering Component
 * Used across Prepare, Find Companion, and Community pages.
 */
export const SearchFilterPanel = ({
    isOpen,
    groups,
    activeFilters,
    onFilterChange,
    onReset,
    className = ""
}: SearchFilterPanelProps) => {

    const handleToggle = (groupId: string, option: string, type: 'chips' | 'single-select') => {
        const current = activeFilters[groupId];

        if (type === 'single-select') {
            onFilterChange(groupId, current === option ? (groupId === 'gender' || groupId === 'age' ? '전체' : null) : option);
            return;
        }

        const isMulti = Array.isArray(current);
        if (isMulti) {
            const next = current.includes(option)
                ? current.filter((v: string) => v !== option)
                : [...current, option];
            onFilterChange(groupId, next);
        } else {
            onFilterChange(groupId, [option]);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className={`overflow-hidden w-full ${className}`}
                >
                    <div className="p-7 md:p-9 rounded-[32px] bg-white border border-slate-100 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 shadow-2xl shadow-slate-200/20 mb-10 mt-2 relative overflow-hidden group">
                        {/* Background Decor */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50/40 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

                        {groups.map((group) => {
                            const color = COLOR_MAP[group.activeColor || 'orange'];
                            const isActive = (val: string) => {
                                const current = activeFilters[group.id];
                                return Array.isArray(current) ? current.includes(val) : current === val;
                            };

                            return (
                                <div key={group.id} className={`space-y-4 relative z-10 ${group.type === 'chips' ? 'md:col-span-2' : ''}`}>
                                    <div className="flex items-center justify-between">
                                        <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{group.label}</h5>
                                        {group.id === groups[groups.length - 1].id && onReset && (
                                            <button
                                                onClick={onReset}
                                                className="text-[10px] font-bold text-slate-300 hover:text-orange-500 flex items-center gap-1 transition-colors"
                                            >
                                                <RotateCcw size={10} />
                                                초기화
                                            </button>
                                        )}
                                    </div>

                                    {group.type === 'range' ? (
                                        <div className="pt-2">
                                            <div className="h-1.5 bg-slate-100 rounded-full relative">
                                                <div className="absolute left-[20%] right-[30%] h-full bg-orange-500 rounded-full" />
                                                <div className="absolute left-[20%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-orange-500 rounded-full shadow-sm cursor-pointer" />
                                                <div className="absolute right-[30%] top-1/2 translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-orange-500 rounded-full shadow-sm cursor-pointer" />
                                            </div>
                                            <div className="flex justify-between mt-3 text-[11px] font-black text-slate-400">
                                                <span>최소</span>
                                                <span>최대</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex flex-wrap gap-2">
                                            {group.options?.map((opt) => {
                                                const active = isActive(opt);
                                                return (
                                                    <button
                                                        key={opt}
                                                        onClick={() => handleToggle(group.id, opt, group.type as any)}
                                                        className={`px-4 py-2 rounded-xl text-[12px] font-bold transition-all border flex items-center gap-2 ${active
                                                            ? `${color.bg} ${color.text} ${color.shadow} border-transparent`
                                                            : 'bg-slate-50 border-transparent text-slate-500 hover:border-slate-200 hover:bg-white'
                                                            }`}
                                                    >
                                                        {active && group.type === 'chips' && <Check size={12} />}
                                                        {opt}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
