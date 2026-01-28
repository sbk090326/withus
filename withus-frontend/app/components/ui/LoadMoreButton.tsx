'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Plus } from 'lucide-react';

interface LoadMoreButtonProps {
    onClick: () => void;
    isLoading?: boolean;
    label?: string;
    visibleCount?: number;
    totalCount?: number;
    className?: string;
}

/**
 * Premium Load More Button Component
 */
export const LoadMoreButton = ({
    onClick,
    isLoading = false,
    label = "더 보기",
    visibleCount,
    totalCount,
    className = ""
}: LoadMoreButtonProps) => {
    return (
        <div className={`flex justify-center mt-12 ${className}`}>
            <button
                onClick={onClick}
                disabled={isLoading}
                className="group relative px-12 py-4 bg-white border border-slate-100 rounded-[24px] shadow-sm hover:shadow-xl hover:border-orange-100 transition-all active:scale-95 overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
            >
                <div className="relative z-10 flex items-center gap-3">
                    {isLoading ? (
                        <div className="w-5 h-5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
                    ) : (
                        <Plus size={18} className="text-orange-500 group-hover:rotate-90 transition-transform duration-500" />
                    )}
                    <span className="text-[13px] font-black text-slate-900 tracking-tight">
                        {isLoading ? `${label} 불러오는 중...` : label}
                    </span>
                    {(visibleCount !== undefined && totalCount !== undefined) && (
                        <span className="ml-2 px-2 py-0.5 rounded-lg bg-slate-50 text-[10px] font-bold text-slate-400">
                            {visibleCount} / {totalCount}
                        </span>
                    )}
                </div>
            </button>
        </div>
    );
};
