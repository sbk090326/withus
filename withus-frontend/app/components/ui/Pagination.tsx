'use client';

import React from 'react';
import { motion } from 'motion/react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    className?: string;
}

/**
 * Premium Numbered Pagination Component
 */
export const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
    className = ""
}: PaginationProps) => {
    if (totalPages <= 1) return null;

    return (
        <div className={`flex justify-center ${className}`}>
            <nav className="flex items-center gap-1.5 p-2 bg-white border border-slate-100 rounded-[28px] shadow-sm">
                {/* Previous Button */}
                <button
                    onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all ${currentPage === 1
                        ? 'text-slate-200 cursor-not-allowed'
                        : 'text-slate-400 hover:bg-slate-50 hover:text-slate-900 active:scale-90'}`}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                {/* Page Numbers */}
                <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                        <button
                            key={pageNum}
                            onClick={() => onPageChange(pageNum)}
                            className={`w-11 h-11 rounded-2xl text-[13px] font-black tracking-tight transition-all relative group ${currentPage === pageNum
                                    ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20'
                                    : 'text-slate-400 hover:bg-slate-50 hover:text-slate-900'
                                }`}
                        >
                            {pageNum}
                            {currentPage === pageNum && (
                                <motion.div
                                    layoutId="activePage"
                                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full"
                                />
                            )}
                        </button>
                    ))}
                </div>

                {/* Next Button */}
                <button
                    onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all ${currentPage === totalPages
                        ? 'text-slate-200 cursor-not-allowed'
                        : 'text-slate-400 hover:bg-slate-50 hover:text-slate-900 active:scale-90'}`}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </nav>
        </div>
    );
};
