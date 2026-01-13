'use client';

import React from 'react';
import { motion } from 'motion/react';

export const CompanionSkeleton = () => {
    return (
        <div className="bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-sm p-8">
            {/* Profile Section Skeleton */}
            <div className="flex items-start gap-5 mb-6">
                <div className="w-16 h-16 rounded-full bg-slate-100 animate-pulse shadow-inner" />
                <div className="flex-1 space-y-3">
                    <div className="h-5 bg-slate-100 rounded-lg w-1/3 animate-pulse" />
                    <div className="flex gap-2">
                        <div className="h-4 bg-slate-50 rounded-md w-12 animate-pulse" />
                        <div className="h-4 bg-slate-50 rounded-md w-16 animate-pulse" />
                    </div>
                </div>
            </div>

            {/* Content Skeleton */}
            <div className="space-y-3 mb-8">
                <div className="h-7 bg-slate-100 rounded-xl w-full animate-pulse" />
                <div className="h-7 bg-slate-100 rounded-xl w-2/3 animate-pulse" />
            </div>

            <div className="space-y-4 mb-8">
                <div className="h-4 bg-slate-50 rounded-lg w-1/2 animate-pulse" />
                <div className="h-4 bg-slate-50 rounded-lg w-1/3 animate-pulse" />
            </div>

            {/* Footer Skeleton */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                <div className="h-8 bg-slate-50 rounded-full w-20 animate-pulse" />
                <div className="h-12 w-12 bg-slate-100 rounded-full animate-pulse" />
            </div>
        </div>
    );
};
