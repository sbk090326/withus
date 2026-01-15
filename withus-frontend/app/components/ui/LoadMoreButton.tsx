'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ChevronDown, Loader2 } from 'lucide-react';

interface LoadMoreButtonProps {
    onClick: () => void;
    isLoading?: boolean;
    label?: string;
    className?: string;
}

export const LoadMoreButton = ({
    onClick,
    isLoading = false,
    label = "더 보기",
    className = ""
}: LoadMoreButtonProps) => {
    return (
        <div className={`flex justify-center mt-16 ${className}`}>
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClick}
                disabled={isLoading}
                className="px-10 py-4 rounded-full border border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-orange-200 hover:bg-orange-50/30 transition-all flex items-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isLoading ? (
                    <>
                        <Loader2 size={18} className="text-orange-500 animate-spin" />
                        <span className="font-bold text-slate-500">불러오는 중...</span>
                    </>
                ) : (
                    <>
                        <span className="font-bold text-slate-500 group-hover:text-orange-600 transition-colors">
                            {label}
                        </span>
                        <div className="w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-orange-100 transition-colors">
                            <ChevronDown size={14} className="text-slate-400 group-hover:text-orange-600 transition-transform group-hover:translate-y-0.5" />
                        </div>
                    </>
                )}
            </motion.button>
        </div>
    );
};
